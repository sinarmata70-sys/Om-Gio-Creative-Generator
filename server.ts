import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { db } from './src/server/db';
import { ConceptRequest, GeneratedConcept } from './src/types';
import { getAdFormatById } from './src/data/adFormats';
import { generateAlgorithmicConcept } from './src/server/conceptEngine';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parsers with large limit for image data URLs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize GoogleGenAI SDK as per gemini-api skill specifications
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// --- API Routes ---

// Health & System Info
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString()
  });
});

// Check or Get User Status
app.get('/api/user/status', (req: Request, res: Response) => {
  const email = (req.query.email as string) || 'yondoli157@gmail.com';
  let user = db.getUserByEmail(email);

  if (!user) {
    user = db.addPendingUser(email);
  }

  res.json({ user });
});

// Login / Switch User
app.post('/api/user/login', (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email diperlukan' });
  }

  let user = db.getUserByEmail(email);
  if (!user) {
    user = db.addPendingUser(email, name);
  }

  res.json({ success: true, user });
});

// Automatic Lynk.id URL Token & Direct Redirect Activation
// Example URL: ?lynk_access=active&email=pembeli@gmail.com
app.post('/api/auth/activate-lynk-token', (req: Request, res: Response) => {
  const { email, customer_email, buyer_email, token, order_id, name } = req.body;
  const rawEmail = email || customer_email || buyer_email || 'pembeli@gmail.com';
  const cleanEmail = rawEmail.trim().toLowerCase();
  const buyerName = name || cleanEmail.split('@')[0];
  const orderRef = order_id || token || `LYNK-${Math.floor(100000 + Math.random() * 900000)}`;

  const activatedUser = db.activateUserPro(
    cleanEmail,
    buyerName,
    'url_token',
    orderRef
  );

  // Record transaction
  db.createTransaction({
    customerEmail: cleanEmail,
    customerName: activatedUser.name,
    amount: db.getSettings().priceIDR,
    currency: 'IDR',
    status: 'success',
    paymentMethod: 'lynk',
    paymentCode: activatedUser.lynkid || orderRef,
    refCode: orderRef
  });

  res.json({
    success: true,
    message: 'Hak akses Lifetime PRO berhasil diaktifkan secara otomatis dari Lynk.id!',
    user: activatedUser
  });
});

// Self-Service Claim: Pembeli Lynk.id memasukkan Gmail / Google Account
app.post('/api/auth/claim-lynk-purchase', (req: Request, res: Response) => {
  const { email, orderId, name } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Alamat Gmail / Email pembeli diperlukan.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const existingUser = db.getUserByEmail(cleanEmail);

  // If already Lifetime PRO
  if (existingUser && existingUser.plan === 'lifetime_pro') {
    return res.json({
      success: true,
      message: 'Akun Anda sudah terverifikasi dan aktif sebagai Lifetime PRO!',
      user: existingUser,
      isNewActivation: false
    });
  }

  // Check if there is an existing successful transaction matching this email
  const transactions = db.getAllTransactions();
  const matchingTrx = transactions.find(
    (t) => t.customerEmail.toLowerCase() === cleanEmail && t.status === 'success'
  );

  const settings = db.getSettings();
  const shouldAutoApprove = Boolean(settings.autoApproveLynk || matchingTrx || orderId);

  if (shouldAutoApprove) {
    const finalOrderId = orderId || matchingTrx?.paymentCode || `LYNK-${Math.floor(100000 + Math.random() * 900000)}`;
    const activatedUser = db.activateUserPro(
      cleanEmail,
      name || cleanEmail.split('@')[0],
      'lynk',
      finalOrderId
    );

    if (!matchingTrx) {
      db.createTransaction({
        customerEmail: cleanEmail,
        customerName: activatedUser.name,
        amount: settings.priceIDR,
        currency: 'IDR',
        status: 'success',
        paymentMethod: 'lynk',
        paymentCode: finalOrderId,
        refCode: 'CLAIM-SELF-SERVICE'
      });
    }

    return res.json({
      success: true,
      message: 'Selamat! Akun Google / Gmail Anda berhasil diaktifkan otomatis ke Lifetime PRO!',
      user: activatedUser,
      isNewActivation: true
    });
  }

  // If auto-approve is false and no matching transaction was found, create pending user
  const pendingUser = db.addPendingUser(cleanEmail, name);
  res.json({
    success: false,
    message: 'Pembayaran belum terdeteksi. Silakan pastikan Anda telah menyelesaikan pembayaran di Lynk.id atau hubungi admin.',
    user: pendingUser,
    isPending: true
  });
});

// Google Account Quick Sign-in / Verification
app.post('/api/auth/google-login', (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email Google diperlukan.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  let user = db.getUserByEmail(cleanEmail);

  if (!user) {
    // If auto approve Lynk is enabled, new Google accounts get Lifetime PRO
    const settings = db.getSettings();
    if (settings.autoApproveLynk) {
      user = db.activateUserPro(cleanEmail, name, 'google_oauth', `GOOG-${Date.now().toString().slice(-6)}`);
    } else {
      user = db.addPendingUser(cleanEmail, name);
    }
  }

  res.json({
    success: true,
    user,
    isPro: user.plan === 'lifetime_pro'
  });
});

// Redeem Coupon / Manual License Key
app.post('/api/payment/redeem-coupon', (req: Request, res: Response) => {
  const { code, email } = req.body;
  if (!code || !email) {
    return res.status(400).json({ error: 'Kode kupon dan email diperlukan' });
  }

  const result = db.claimLicenseKey(code, email);
  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json(result);
});

// Create Payment Order (QRIS / Bank Transfer / Lynk.id)
app.post('/api/payment/create-order', (req: Request, res: Response) => {
  const { email, name, method } = req.body;
  const settings = db.getSettings();
  const cleanEmail = email ? email.trim().toLowerCase() : 'pembeli@gmail.com';

  // Add small random unique digits for bank transfer or QRIS reconciliation (e.g. 149.321)
  const uniqueCode = Math.floor(100 + Math.random() * 899);
  const totalAmount = settings.priceIDR + uniqueCode;

  const trx = db.createTransaction({
    customerEmail: cleanEmail,
    customerName: name || cleanEmail.split('@')[0],
    amount: totalAmount,
    currency: 'IDR',
    status: 'pending',
    paymentMethod: method || 'qris',
    paymentCode: `ORDER-${Date.now().toString().slice(-6)}`,
    refCode: `UNIQUE-${uniqueCode}`
  });

  res.json({
    success: true,
    transaction: trx,
    lynkUrl: `${settings.lynkCheckoutUrl}?customer_email=${encodeURIComponent(cleanEmail)}`,
    qrisString: `00020101021226680016ID.CO.QRIS.WWW01189360091800000000000215${settings.qrisNmid}0303UMI51440014ID.LINKAJA.WWW0215202609291234567520458125303360540${totalAmount}5802ID5919${settings.qrisMerchantName}6007JAKARTA61051294062070703A01630489A1`,
    qrisMerchantName: settings.qrisMerchantName,
    qrisNmid: settings.qrisNmid,
    bankAccount: settings.bankAccount
  });
});

// Verify / Complete Payment (Simulate Instant QRIS / Transfer Approval)
app.post('/api/payment/verify', (req: Request, res: Response) => {
  const { transactionId } = req.body;
  if (!transactionId) {
    return res.status(400).json({ error: 'Transaction ID is required' });
  }

  const updatedTrx = db.completeTransaction(transactionId);
  if (!updatedTrx) {
    return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
  }

  const user = db.getUserByEmail(updatedTrx.customerEmail);

  res.json({
    success: true,
    message: 'Pembayaran berhasil diverifikasi! Akun Lifetime PRO kini aktif.',
    transaction: updatedTrx,
    user
  });
});

// Lynk.id Official Webhook Receiver (Supports POST /api/webhook/lynkid & /api/payment/lynk-webhook)
const handleLynkWebhook = (req: Request, res: Response) => {
  const body = req.body || {};
  // Handle various payload structures from Lynk.id or payment gateways
  const customerEmail = (
    body.customer_email || 
    body.email || 
    body.buyer_email || 
    body.payer_email || 
    body.user_email || 
    (body.customer && body.customer.email)
  );

  const customerName = (
    body.customer_name || 
    body.name || 
    body.buyer_name || 
    (body.customer && body.customer.name) || 
    'Pembeli Lynk.id'
  );

  const orderId = (
    body.order_id || 
    body.invoice_id || 
    body.transaction_id || 
    body.id || 
    `LYNK-${Date.now()}`
  );

  const amount = Number(body.amount || body.gross_amount || body.total_price) || db.getSettings().priceIDR;
  const paymentStatus = (body.status || body.payment_status || body.event || 'success').toString().toLowerCase();

  // If status is not failed/cancelled
  const isApproved = !paymentStatus.includes('fail') && !paymentStatus.includes('cancel') && !paymentStatus.includes('expire');

  if (customerEmail && isApproved) {
    const cleanEmail = customerEmail.trim().toLowerCase();
    const user = db.activateUserPro(cleanEmail, customerName, 'lynk_webhook', orderId);
    
    db.createTransaction({
      customerEmail: cleanEmail,
      customerName,
      amount,
      currency: 'IDR',
      status: 'success',
      paymentMethod: 'lynk',
      paymentCode: orderId,
      refCode: `WEBHOOK-${Date.now().toString().slice(-4)}`
    });

    console.log(`[Lynk.id Webhook] Successfully activated Lifetime PRO for ${cleanEmail} (Order: ${orderId})`);

    return res.status(200).json({
      success: true,
      message: `Akses Lifetime PRO berhasil diaktifkan secara otomatis untuk ${cleanEmail}`,
      orderId,
      user
    });
  }

  res.status(200).json({ 
    received: true, 
    message: customerEmail ? 'Webhook diterima, status non-aktif' : 'Tidak ada email pembeli terlampir' 
  });
};

app.post('/api/webhook/lynkid', handleLynkWebhook);
app.post('/api/payment/lynk-webhook', handleLynkWebhook);

// GET endpoint to test/ping webhook from browser or Lynk.id dashboard
app.get('/api/webhook/lynkid', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'Al-im Creative Director Lynk.id Webhook',
    message: 'Endpoint siap menerima POST webhook otomatis dari Lynk.id!',
    webhookUrl: '/api/webhook/lynkid',
    supportedEvents: ['order.paid', 'payment.success', 'settlement']
  });
});

// Admin Authorization Middleware & Security Barrier
const ADMIN_EMAILS = [
  'sinarmata70@gmail.com',
  'lensx619@gmail.com'
];

function isAuthorizedAdmin(req: Request): boolean {
  const reqEmail = (
    req.headers['x-admin-email'] ||
    req.headers['x-user-email'] ||
    req.query.adminEmail ||
    req.body?.adminEmail ||
    req.query.email
  ) as string | undefined;

  if (!reqEmail) return false;
  const clean = reqEmail.trim().toLowerCase();
  
  if (ADMIN_EMAILS.includes(clean)) return true;

  const user = db.getUserByEmail(clean);
  return user?.role === 'admin';
}

const requireAdmin = (req: Request, res: Response, next: () => void) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({
      error: 'Akses Ditolak: Hanya Admin (Owner) yang memiliki izin mengakses pengaturan API Key dan data admin.'
    });
  }
  next();
};

// Admin Data Endpoint (Protected)
app.get('/api/admin/data', requireAdmin, (req: Request, res: Response) => {
  const users = db.getAllUsers();
  const transactions = db.getAllTransactions();
  const settings = db.getSettings();
  const stats = db.getStats();

  res.json({
    users,
    transactions,
    settings,
    stats
  });
});

// Admin Whitelist Add Single (Protected)
app.post('/api/admin/whitelist/add', requireAdmin, (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Format email tidak valid' });
  }

  const user = db.activateUserPro(email, name, 'manual_admin');
  res.json({ success: true, user });
});

// Admin Whitelist Bulk Add (Protected)
app.post('/api/admin/whitelist/bulk', requireAdmin, (req: Request, res: Response) => {
  const { rawText } = req.body;
  if (!rawText || typeof rawText !== 'string') {
    return res.status(400).json({ error: 'Teks paste bulk email diperlukan' });
  }

  // Extract all emails and possible names from text
  const lines = rawText.split('\n');
  const items: { email: string; name?: string }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Match email in line
    const emailMatch = trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      const email = emailMatch[0];
      // Remaining part might be name
      const namePart = trimmed.replace(email, '').replace(/[,;\t\-]/g, ' ').trim();
      items.push({
        email,
        name: namePart || undefined
      });
    }
  }

  if (items.length === 0) {
    return res.status(400).json({ error: 'Tidak ditemukan format email valid dalam teks yang ditempel.' });
  }

  const result = db.bulkAddWhitelist(items);
  res.json({
    success: true,
    message: `Berhasil menambahkan ${result.added} email baru dan memperbarui ${result.updated} email ke Lifetime PRO.`,
    count: items.length
  });
});

// Admin Delete / Revoke User (Protected)
app.delete('/api/admin/whitelist/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteUser(id);
  res.json({ success: deleted });
});

// Admin Generate License Keys (Protected)
app.post('/api/admin/license/generate', requireAdmin, (req: Request, res: Response) => {
  const count = Number(req.body.count) || 5;
  const prefix = req.body.prefix || 'PRO';
  const keys = db.generateLicenseKeys(count, prefix);
  res.json({ success: true, keys });
});

// Admin Update Settings (Protected)
app.post('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, settings: updated });
});

// History of Concepts
app.get('/api/history', (req: Request, res: Response) => {
  res.json({ history: db.getConceptHistory() });
});

// --- CORE AI GENERATION ENGINE ---
app.post('/api/generate-concept', async (req: Request, res: Response) => {
  try {
    const data: ConceptRequest = req.body;
    const formatInfo = getAdFormatById(data.adFormat) || {
      name: data.adFormat,
      category: 'Direct Response',
      formula: 'Hook -> Proof -> CTA',
      description: 'Format iklan komersial tingkat konversi tinggi'
    };

    const is64s = data.duration === '64s';
    const totalPanels = is64s ? 32 : 16;
    const totalShots = is64s ? 8 : 4;

    const parts: any[] = [];

    // Multimodal Product Images
    if (data.productImages && data.productImages.length > 0) {
      for (const img of data.productImages) {
        if (img.dataUrl && img.dataUrl.includes(',')) {
          const [header, base64] = img.dataUrl.split(',');
          const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
          parts.push({
            inlineData: {
              data: base64,
              mimeType
            }
          });
        }
      }
    }

    // Multimodal Character Images
    if (data.characterImages && data.characterImages.length > 0) {
      for (const img of data.characterImages) {
        if (img.dataUrl && img.dataUrl.includes(',')) {
          const [header, base64] = img.dataUrl.split(',');
          const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
          parts.push({
            inlineData: {
              data: base64,
              mimeType
            }
          });
        }
      }
    }

    const systemInstruction = `Anda adalah Al-im Creative Director (V11 • ROLE LOCK • CREATIVE DIRECTION), sebuah sistem AI tingkat lanjut kelas dunia untuk menyusun konsep iklan komersial, storyboard visual 4:3, master prompt generator video (Veo3lite, Kling, HeyGen, Seedance, Sora), dan paket distribusi media sosial.

PRINSIP WAJIB:
1. AI VISION & ROLE LOCK:
   - Jika terdapat gambar produk, analisislah detail fisik, warna, label, keunggulan visual, dan kemasan secara nyata tanpa mengarang klaim palsu. Gunakan tag '[product.jpg]' untuk mereferensikan produk ini dalam prompt video.
   - Jika terdapat gambar creator/karakter, kuncilah wajah, postur, ekspresi, dan busana. Gunakan tag '[creator.png]' untuk mereferensikan aktor/kreator ini dalam prompt video.
2. STORYBOARD 4:3:
   - Tepat memecah durasi: ${data.duration} (${totalShots} video shots x 8 detik, dengan 4 transition beat x 2 detik per shot = tepat ${totalPanels} panel storyboard berurutan).
   - Setiap panel harus menjelaskan: No Panel, Durasi Beat (0-2s, 2-4s, dst), Shot Type & Camera Movement, Visual & Action, Lighting & Color Atmosphere, Sound SFX, dan Naskah Voiceover/Dialog (dalam Bahasa Indonesia yang alami, persuasif, dan ritmik).
3. MASTER VIDEO GENERATION PROMPT:
   - Ini adalah satu-satunya master prompt yang siap ditempel ke generator video (Veo3, Kling, HeyGen, Sora) sekali klik.
   - Prompt harus mencakup: Aspect Ratio (${data.aspectRatio}), Camera Direction, Lighting Grade, Shot Flow berurutan (Shot 1 s/d Shot ${totalShots}), Continuity Lock antara '[creator.png]' dan '[product.jpg]', Dynamic Transitions, dan Audio/Dialogue timing.
4. PAKET SOSIAL MEDIA:
   - Caption bernilai tinggi untuk TikTok, Instagram Reels, Facebook, Threads, X (Twitter), YouTube Shorts, Pinterest.
   - Disertai 3 variasi Hook kalimat pertama yang memikat, Call To Action (CTA) tajam, dan 5 rekomendasi hashtag viral tertarget.`;

    const userPrompt = `Lakukan analisis mendalam dan hasilkan konsep kreatif lengkap dengan spesifikasi berikut:
- Mode: ${data.mode === 'ad' ? 'Mode Iklan (Product Reference + 137 format Iklan • Hook -> Proof -> CTA)' : 'Mode Konten (Character Assets + Story -> Payoff)'}
- Jenis Iklan / Format: ${formatInfo.name} (${formatInfo.formula})
- Durasi: ${data.duration} (${totalPanels} Panel Storyboard, ${totalShots} Shots x 8s)
- Aspect Ratio Video: ${data.aspectRatio}
- Target Generator Video: ${data.engine}
- Target Audience: ${data.targetAudience || 'Konsumen Indonesia modern yang menginginkan solusi praktis, bernilai tinggi, dan relatable'}
- Brief / Pesan Tambahan: ${data.brief || 'Fokus pada problem yang paling relatable dan tetap terasa premium, visual sinematik tajam'}
- Creative Tools Aktif: ${Object.entries(data.creativeTools).filter(([_, v]) => v).map(([k]) => k).join(', ')}

Format keluaran HARUS berupa JSON valid dengan struktur:
{
  "title": "Judul Konsep Iklan / Konten",
  "summary": "Ringkasan konsep kreatif, target emosi audiens, dan sudut pandang visual",
  "masterStoryboardPrompt": "Teks naskah lengkap Master Storyboard 4:3 dengan ${totalPanels} panel rinci (Beat 2s)",
  "masterVideoPrompt": "Satu teks Master Video Generation Prompt lengkap untuk ${data.engine} yang siap dicopy",
  "socialPackage": {
    "tiktok": "Naskah caption & hook TikTok",
    "instagram": "Naskah caption & hook Instagram Reels",
    "facebook": "Naskah copywriting Facebook Ad",
    "threads": "Teks postingan Threads",
    "x": "Teks thread / tweet X",
    "youtube": "Judul & deskripsi YouTube Shorts",
    "pinterest": "Pin description Pinterest",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
    "suggestedAudio": "Rekomendasi jenis musik latar / trending sound"
  }
}`;

    parts.push({ text: userPrompt });

    // Multi-layer resilient AI execution:
    // 1. Try gemini-3.1-flash-lite (fastest, lowest token footprint, highest RPM quota)
    // 2. Fallback to gemini-3.8-flash if model error occurs
    // 3. If rate-limited / cooldown (429 resource_exhausted or 503), gracefully fall back to algorithmic blueprint engine
    let response: any = null;
    let parsed: any = null;

    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: { parts },
        config: {
          systemInstruction,
          temperature: 0.7,
          responseMimeType: 'application/json'
        }
      });
    } catch (liteErr: any) {
      console.warn('gemini-3.1-flash-lite high load/error, trying gemini-3.8-flash:', liteErr?.message);
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: { parts },
          config: {
            systemInstruction,
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        });
      } catch (flashErr: any) {
        console.warn('Gemini API rate limit/quota reached, generating concept via Creative Blueprint Engine:', flashErr?.message);
        const fallbackConcept = generateAlgorithmicConcept(data, formatInfo);
        db.saveConcept(fallbackConcept);
        return res.json({
          success: true,
          concept: fallbackConcept,
          source: 'blueprint_engine'
        });
      }
    }

    if (response) {
      const rawOutput = response.text || '{}';
      try {
        parsed = JSON.parse(rawOutput);
      } catch (e) {
        console.warn('JSON parsing error, falling back to regex extraction:', e);
        const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
          } catch (jsonErr) {}
        }
      }
    }

    // If parsing failed or output was empty, fallback cleanly without error
    if (!parsed || !parsed.masterStoryboardPrompt) {
      const fallbackConcept = generateAlgorithmicConcept(data, formatInfo);
      db.saveConcept(fallbackConcept);
      return res.json({
        success: true,
        concept: fallbackConcept,
        source: 'blueprint_engine'
      });
    }

    const generatedConcept: GeneratedConcept = {
      id: `cpt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: parsed.title || `${formatInfo.name} - ${data.duration}`,
      mode: data.mode,
      adFormat: formatInfo.name,
      engine: data.engine,
      duration: data.duration,
      aspectRatio: data.aspectRatio,
      summary: parsed.summary || 'Konsep iklan komersial visual storytelling',
      panelsCount: totalPanels,
      masterStoryboardPrompt: parsed.masterStoryboardPrompt,
      storyboardPanels: [],
      masterVideoPrompt: parsed.masterVideoPrompt || 'Master Video Prompt generated',
      socialPackage: parsed.socialPackage || {
        tiktok: '',
        instagram: '',
        facebook: '',
        threads: '',
        x: '',
        youtube: '',
        pinterest: '',
        hashtags: ['#iklanviral', '#videomarketing', '#aicreativedirector', '#ugc', '#contentcreator'],
        suggestedAudio: 'Cinematic Modern Lo-Fi Beat with subtle bass drop'
      }
    };

    // Save to persistent database
    db.saveConcept(generatedConcept);

    res.json({
      success: true,
      concept: generatedConcept,
      source: 'gemini_ai'
    });
  } catch (error: any) {
    console.error('Critical error in generate-concept, activating fail-safe fallback:', error);
    try {
      const data: ConceptRequest = req.body;
      const formatInfo = getAdFormatById(data.adFormat) || {
        name: data.adFormat || 'Commercial Ad',
        category: 'Direct Response',
        formula: 'Hook -> Proof -> CTA',
        description: 'Format iklan komersial tingkat konversi tinggi'
      };
      const fallbackConcept = generateAlgorithmicConcept(data, formatInfo);
      db.saveConcept(fallbackConcept);
      return res.json({
        success: true,
        concept: fallbackConcept,
        source: 'blueprint_engine'
      });
    } catch (finalErr: any) {
      res.status(500).json({
        error: error?.message || 'Gagal menghasilkan konsep iklan'
      });
    }
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Al-im Creative Director] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
