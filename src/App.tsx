import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  SlidersHorizontal, 
  Video, 
  Sparkles, 
  Crown, 
  Menu 
} from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ConceptBuilder } from './components/ConceptBuilder';
import { LiveOutputPreview } from './components/LiveOutputPreview';
import { LifetimeProModal } from './components/LifetimeProModal';
import { AdminModal } from './components/AdminModal';
import { PaymentModal } from './components/PaymentModal';
import { AdFormatSelectorModal } from './components/AdFormatSelectorModal';
import { UserLoginModal } from './components/UserLoginModal';
import { HowToUseGuideModal } from './components/HowToUseGuideModal';
import { HistoryModal } from './components/HistoryModal';
import { ClickFeedback } from './components/ClickFeedback';
import { User, ConceptRequest, ReferenceImage, GeneratedConcept } from './types';

export default function App() {
  // Current user state (defaults to Edi Widiyantoro from screenshots)
  const [user, setUser] = useState<User>({
    id: 'usr-edi-widi',
    email: 'yondoli157@gmail.com',
    name: 'Edi Widiyantoro',
    role: 'user',
    plan: 'free',
    status: 'pending',
    source: 'lynk',
    activatedAt: new Date().toISOString()
  });

  // Authorized Admin check: ONLY sinarmata70@gmail.com and lensx619@gmail.com
  const ADMIN_EMAILS = ['sinarmata70@gmail.com', 'lensx619@gmail.com'];
  const isAdmin = (user.role === 'admin' || ADMIN_EMAILS.includes(user.email.toLowerCase())) && ADMIN_EMAILS.includes(user.email.toLowerCase());

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileViewTab, setMobileViewTab] = useState<'builder' | 'output'>('builder');
  const [activeTab, setActiveTab] = useState('overview');

  // Handle sidebar navigation clicking with direct smooth scrolling to target section
  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'output') {
      setMobileViewTab('output');
      setTimeout(() => {
        const el = document.getElementById('section-output');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-2', 'ring-purple-500/80', 'ring-offset-2', 'ring-offset-slate-950');
          setTimeout(() => el.classList.remove('ring-2', 'ring-purple-500/80', 'ring-offset-2', 'ring-offset-slate-950'), 1500);
        }
      }, 60);
    } else {
      setMobileViewTab('builder');
      setTimeout(() => {
        const targetId = tabId === 'overview' ? 'section-overview' : `section-${tabId}`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-2', 'ring-indigo-500/80', 'ring-offset-2', 'ring-offset-slate-950');
          setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-500/80', 'ring-offset-2', 'ring-offset-slate-950'), 1500);
        }
      }, 60);
    }
  };

  // Form state
  const [formData, setFormData] = useState<ConceptRequest>({
    mode: 'ad',
    productImages: [],
    characterImages: [],
    adFormat: 'product-demo',
    aspectRatio: '9:16',
    engine: 'All Generator Video',
    duration: '64s',
    targetAudience: '',
    brief: '',
    creativeTools: {
      hook: true,
      product: true,
      character: true,
      storyboard: true,
      videoPackage: true
    }
  });

  const [productImages, setProductImages] = useState<ReferenceImage[]>([]);
  const [characterImages, setCharacterImages] = useState<ReferenceImage[]>([]);

  // Generated output state
  const [generatedConcept, setGeneratedConcept] = useState<GeneratedConcept | null>({
    id: 'initial-sample',
    createdAt: new Date().toISOString(),
    title: 'Product Demo — 64s Master Blueprint',
    mode: 'ad',
    adFormat: 'Product Demo',
    engine: 'All Generator Video',
    duration: '64s',
    aspectRatio: '9:16',
    summary: 'Konsep Product Demo berkecepatan tinggi dengan 8 shot berkesinambungan mengunci karakter [creator.png] dan produk [product.jpg].',
    panelsCount: 32,
    storyboardPanels: [],
    masterStoryboardPrompt: `MASTER STORYBOARD 4:3 — 64 SECONDS (32 PANELS • 8 SHOTS x 8s):

SHOT 1 (0-8s) — THE AGITATED HOOK
• Panel 01 [0-2s]: [creator.png] memegang produk lama yang rusak, ekspresi frustrasi frustrasi close-up, pencahayaan moody warm. VO: "Udah ganti berkali-kali tapi tetep aja bikin rugi?"
• Panel 02 [2-4s]: Transisi whip pan cepat, [creator.png] menunjuk ke arah meja dengan tatapan heran.
• Panel 03 [4-6s]: Kamera push-in ekstrem ke [product.jpg] yang diletakkan elegan di atas marmer hitam dengan backlighting lembut.
• Panel 04 [6-8s]: [creator.png] mengambil [product.jpg], tatapan mata langsung tertuju tajam ke kamera (eye-level).

SHOT 2 (8-16s) — FIRST TOUCH & SENSORY UNBOXING
• Panel 05 [8-10s]: Macro shot 4:3 tekstur kemasan [product.jpg], pantulan cahaya sinematik. VO: "Pertama kali pegang, feel premiumnya langsung kerasa beda."
• Panel 06 [10-12s]: Close-up jari membuka segel presisi dengan suara click renyah (ASMR sound effect).
• Panel 07 [12-14s]: [creator.png] tersenyum kagum sambil memeriksa detail material tanpa cela.
• Panel 08 [14-16s]: Transisi snap zoom ke arah fitur utama produk.

SHOT 3 (16-24s) — LIVE DEMO & PROOF
• Panel 09 [16-18s]: Uji coba langsung [product.jpg] dalam penggunaan nyata, kecepatan respons instan. VO: "Gak butuh waktu lama, hasilnya langsung kelihatan dalam hitungan detik."
• Panel 10 [18-20s]: Split screen vertikal membandingkan produk konvensional vs [product.jpg].
• Panel 11 [20-22s]: Visual hasil bersih berkilau, pantulan cahaya lens flare lembut.
• Panel 12 [22-24s]: [creator.png] menggelengkan kepala takjub melihat efisiensi yang didapat.

SHOT 4 (24-32s) — FEATURE DEEP-DIVE
• Panel 13 [24-26s]: 3D rotation angle [product.jpg], menyoroti komponen ergonomis berstandar industri.
• Panel 14 [26-28s]: [creator.png] mendemonstrasikan kepraktisan saat dibawa bepergian. VO: "Ringkas, kokoh, dan siap dipakai kapan aja tanpa ribet."
• Panel 15 [28-30s]: Kamera orbit 90 derajat memperlihatkan detail sudut produk.
• Panel 16 [30-32s]: Transisi match cut dinamis ke ekspresi wajah puas.

SHOT 5 s/d SHOT 8 (32-64s) — SOCIAL PROOF, PAYOFF & COMPELLING CTA
• Panel 17-24 [32-48s]: Rangkaian montase kilat kepuasan pemakaian harian berulang, testimoni visual, dan uji ketahanan. VO: "Bukan cuma klaim manis, ribuan orang udah ngerasain sendiri bedanya."
• Panel 25-32 [48-64s]: [creator.png] mengangkat [product.jpg] dengan percaya diri ke arah kamera, grafis diskon eksklusif dan garansi muncul. VO: "Amankan punya kamu sekarang sebelum kehabisan batch produksi ini. Klik link di bawah!"`,
    masterVideoPrompt: `MASTER VIDEO GENERATION PROMPT — 64 SECONDS — ALL GENERATOR VIDEO:

[CONTINUITY LOCK]: Maintain consistent identity of [creator.png] (same facial features, hair styling, relaxed urban minimalist outfit) and [product.jpg] (exact bottle geometry, sleek matte typography, pristine label color palette) across all 8 continuous shots.

[TECHNICAL SPECIFICATIONS]:
Aspect Ratio: 9:16 Vertical | Cinema 4K Color Grade | Soft Studio Keylight + Subtle Cyan Rim Lighting | Clean Bokeh Depth of Field | 24fps Motion Blur.

[SHOT PROGRESSION FLOW]:
- SHOT 1 (0-8s): Eye-level close-up of [creator.png] in modern warm kitchen background expressing relatable frustration, quick handheld camera movement, swift whip-pan transition at 0:04 revealing [product.jpg] centered on black slate counter with premium backlighting reflection. [creator.png] picks up [product.jpg] with gentle precision.
- SHOT 2 (8-16s): Extreme macro lens tracking shot across the embossed typography of [product.jpg]. Crisp unboxing motion, tactile surface interaction. [creator.png] examines the build quality with genuine nod of approval.
- SHOT 3 (16-24s): Dynamic action demonstration. Camera tracks [creator.png] using [product.jpg] in real time. Instant visible transformation effect, seamless high-speed motion with crystal clear focus.
- SHOT 4 (24-32s): 360-degree orbital camera rotation around [product.jpg], showing ergonomic curves and durable finish under changing ambient lighting.
- SHOT 5 (32-40s): Rapid kinetic sequence of [creator.png] seamlessly integrating [product.jpg] into active daily routine. Upbeat cinematic cadence.
- SHOT 6 (40-48s): Side-by-side comparison test visually demonstrating superior durability and efficiency without any hesitation.
- SHOT 7 (48-56s): Direct-to-camera conversation framing. [creator.png] delivers honest, charismatic reaction, warm confidence in gaze.
- SHOT 8 (56-64s): Final hero product placement with [creator.png] smiling warmly in soft-focus background. Clean, punchy end-card framing with breathing space for CTA link overlay.`,
    socialPackage: {
      tiktok: `Jujur kaget banget pas pertama kali nyoba produk ini! 🤯 Kirain cuma viral di sosmed doang, ternyata hasilnya bener-bener nyata dan jauh lebih awet dibanding merk sebelah. Buat kalian yang bosen buang-buang uang buat barang yang gampang rusak, tonton sampai habis! 🚀✨\n\nLink promo ada di bio ya, jangan nunggu kehabisan lagi!`,
      instagram: `Upgrade terbaik tahun ini! ✨ Konsistensi dan kualitas [product.jpg] bener-bener di luar ekspektasi. Sentuh link di profil untuk klaim voucher promo khusus hari ini! 🛍️`,
      facebook: `Solusi praktis dan teruji untuk Anda yang mengutamakan kualitas tanpa kompromi. Garansi resmi dan pengiriman cepat ke seluruh Indonesia. Pesan sekarang!`,
      threads: `Kalau ada produk yang sekali pakai langsung bikin hidup lebih tenang, ini salah satunya. Worth every single penny. 👌`,
      x: `Setelah 30 hari pemakaian intensif, ini review jujur saya tentang [product.jpg]. Thread singkat di bawah 👇 #RekomendasiProduk`,
      youtube: `Review Jujur & Demo Langsung: Kenapa Produk Ini Wajib Kamu Punya di 2026! 💥`,
      pinterest: `Aesthetic Product Photography & Clean Minimalism Inspiration 2026. Save pin ini untuk inspirasi belanja Anda!`,
      hashtags: ['#rekomendasiproduk', '#racuntiktok', '#unboxingviral', '#reviewjujur', '#produkunggulan'],
      suggestedAudio: 'Trending Commercial Pop Beat with crisp bass drop & acoustic guitar accents'
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Modals state
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [lynkSuccessNotice, setLynkSuccessNotice] = useState<string | null>(null);

  // Check URL query parameters on mount (e.g. ?lynk_access=active, ?email=..., ?source=lynk)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = (
      params.get('email') || 
      params.get('customer_email') || 
      params.get('buyer_email') ||
      params.get('user_email')
    );
    const nameParam = params.get('name') || params.get('customer_name') || '';
    const orderIdParam = params.get('order_id') || params.get('invoice_id') || params.get('trx') || params.get('id') || '';
    const sourceParam = params.get('source') || params.get('ref') || '';
    const lynkAccess = params.get('lynk_access') || params.get('auth') || params.get('status');

    // Check if coming from Lynk.id or has email activation param
    const isLynkRedirect = Boolean(
      emailParam && (
        lynkAccess === 'active' || 
        lynkAccess === 'auto' || 
        lynkAccess === 'success' || 
        lynkAccess === 'paid' || 
        sourceParam === 'lynk' || 
        sourceParam === 'lynkid' || 
        Boolean(orderIdParam)
      )
    );

    if (isLynkRedirect && emailParam) {
      fetch('/api/auth/activate-lynk-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: emailParam,
          name: nameParam,
          order_id: orderIdParam,
          token: params.get('token') || orderIdParam
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            try {
              localStorage.setItem('alim_user_email', data.user.email);
            } catch (e) {}
            setLynkSuccessNotice(`Selamat datang, ${data.user.name || data.user.email}! Pembayaran Lynk.id Anda telah terverifikasi. Akun Anda aktif sebagai LIFETIME PRO seumur hidup.`);
            confetti({ particleCount: 130, spread: 85, origin: { y: 0.4 } });
            // Clean URL query params without refreshing page
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        })
        .catch(console.error);
    } else {
      // Check stored user email from previous session or fallback to default
      const savedEmail = (() => {
        try {
          return localStorage.getItem('alim_user_email');
        } catch (e) {
          return null;
        }
      })() || user.email;

      fetch(`/api/user/status?email=${encodeURIComponent(savedEmail)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .catch(console.error);
    }
  }, []);

  // AI Generation Handler
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const payload: ConceptRequest = {
        ...formData,
        productImages: productImages.map((p) => ({
          dataUrl: p.dataUrl,
          mimeType: p.mimeType,
          name: p.name
        })),
        characterImages: characterImages.map((c) => ({
          dataUrl: c.dataUrl,
          mimeType: c.mimeType,
          name: c.name,
          roleOrTag: c.roleOrTag
        }))
      };

      const res = await fetch('/api/generate-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menghasilkan konsep');
      }

      if (data.concept) {
        setGeneratedConcept(data.concept);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
        // Automatically switch to output preview on mobile
        setMobileViewTab('output');
      }
    } catch (err: any) {
      alert(`Pemberitahuan: ${err.message || 'Terjadi gangguan saat generate'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset semua input formulir?')) {
      setProductImages([]);
      setCharacterImages([]);
      setFormData((prev) => ({
        ...prev,
        targetAudience: '',
        brief: ''
      }));
    }
  };

  const handleCopyAll = () => {
    if (!generatedConcept) return;
    const full = `=== MASTER STORYBOARD 4:3 ===\n${generatedConcept.masterStoryboardPrompt}\n\n=== MASTER VIDEO PROMPT ===\n${generatedConcept.masterVideoPrompt}\n\n=== SOCIAL MEDIA PACKAGE ===\nTikTok/Reels: ${generatedConcept.socialPackage.tiktok}\nHashtags: ${generatedConcept.socialPackage.hashtags.join(' ')}`;
    navigator.clipboard.writeText(full);
    alert('Seluruh paket konsep berhasil disalin ke clipboard!');
  };

  const handleDownloadTxt = () => {
    if (!generatedConcept) return;
    const content = `Om Gio Creative Director — AI Package Prompt\nJudul: ${generatedConcept.title}\nFormat: ${generatedConcept.adFormat}\nDurasi: ${generatedConcept.duration}\nEngine: ${generatedConcept.engine}\nTanggal: ${new Date().toLocaleString('id-ID')}\n\n========================================\n01. MASTER STORYBOARD PROMPT 4:3\n========================================\n${generatedConcept.masterStoryboardPrompt}\n\n========================================\n02. MASTER VIDEO GENERATION PROMPT\n========================================\n${generatedConcept.masterVideoPrompt}\n\n========================================\n03. SOCIAL MEDIA CONTENT PACKAGE\n========================================\nTIKTOK / REELS:\n${generatedConcept.socialPackage.tiktok}\n\nINSTAGRAM:\n${generatedConcept.socialPackage.instagram}\n\nHASHTAGS:\n${generatedConcept.socialPackage.hashtags.join(' ')}\n\nSUGGESTED AUDIO:\n${generatedConcept.socialPackage.suggestedAudio}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Om_Gio_Creative_Prompt_${generatedConcept.duration}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Tactile Click & Cursor Ripple Feedback */}
      <ClickFeedback />

      {/* Top App Header */}
      <Header
        user={user}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenAdminModal={() => isAdmin && setIsAdminModalOpen(true)}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onSwitchUser={() => setIsLoginModalOpen(true)}
        onToggleMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* Automatic Lynk.id Activation Banner */}
      {lynkSuccessNotice && (
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-black font-bold px-3 sm:px-4 py-2 text-xs flex items-center justify-between shadow-lg sticky top-[45px] sm:top-[49px] z-30 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <span className="text-base animate-bounce">👑</span>
            <span>{lynkSuccessNotice}</span>
          </div>
          <button
            onClick={() => setLynkSuccessNotice(null)}
            className="text-black/80 hover:text-black text-[11px] bg-black/15 hover:bg-black/25 px-2 py-0.5 rounded-full cursor-pointer ml-2 transition-colors shrink-0"
          >
            Tutup ✕
          </button>
        </div>
      )}

      {/* Mobile Top Segmented View Switcher */}
      <div className="lg:hidden px-3 py-2 bg-[#09090c]/95 border-b border-amber-500/20 flex items-center gap-2 sticky top-[45px] sm:top-[49px] z-20 backdrop-blur-md">
        <button
          onClick={() => setMobileViewTab('builder')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileViewTab === 'builder'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md shadow-amber-500/30'
              : 'bg-[#121217] text-zinc-400 hover:text-amber-200 border border-neutral-800'
          }`}
        >
          <span>📝 01 Buat Konsep</span>
        </button>
        <button
          onClick={() => setMobileViewTab('output')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
            mobileViewTab === 'output'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/30'
              : 'bg-[#121217] text-zinc-400 hover:text-amber-200 border border-neutral-800'
          }`}
        >
          <span>🎬 02 Hasil Output</span>
          {generatedConcept && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
          )}
        </button>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar (Desktop + Mobile Drawer) */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          user={user}
          onOpenProModal={() => setIsProModalOpen(true)}
          onOpenHowToUse={() => setIsHowToUseOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Center & Right Columns */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#07070a]">
          {/* Center Column: Concept Builder */}
          <div className={`flex-1 overflow-hidden flex flex-col ${mobileViewTab === 'builder' ? 'flex' : 'hidden lg:flex'}`}>
            <ConceptBuilder
              formData={formData}
              setFormData={setFormData}
              productImages={productImages}
              setProductImages={setProductImages}
              characterImages={characterImages}
              setCharacterImages={setCharacterImages}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              onOpenFormatModal={() => setIsFormatModalOpen(true)}
              onReset={handleReset}
              onCopyAll={handleCopyAll}
              onDownloadTxt={handleDownloadTxt}
              hasOutput={Boolean(generatedConcept)}
              onSectionInView={setActiveTab}
            />
          </div>

          {/* Right Column: Live Output Preview */}
          <div className={`overflow-hidden flex flex-col ${mobileViewTab === 'output' ? 'flex flex-1' : 'hidden lg:flex'}`}>
            <LiveOutputPreview
              concept={generatedConcept}
              engine={formData.engine}
              duration={formData.duration}
              isGenerating={isGenerating}
            />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#08080a]/95 backdrop-blur-md border-t border-amber-500/20 px-2 py-1.5 flex items-center justify-around text-[10px] text-zinc-400 shadow-2xl">
        <button
          onClick={() => setMobileViewTab('builder')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            mobileViewTab === 'builder' ? 'text-amber-300 font-bold' : 'hover:text-amber-100'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Konsep</span>
        </button>

        <button
          onClick={() => setMobileViewTab('output')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors cursor-pointer relative ${
            mobileViewTab === 'output' ? 'text-amber-300 font-bold' : 'hover:text-amber-100'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Output</span>
          {generatedConcept && (
            <span className="absolute top-1 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
          )}
        </button>

        <button
          onClick={() => setIsFormatModalOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>137 DNA</span>
        </button>

        <button
          onClick={() => (user.plan === 'lifetime_pro' ? setIsProModalOpen(true) : setIsPaymentModalOpen(true))}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Crown className="w-4 h-4 text-amber-400" />
          <span>{user.plan === 'lifetime_pro' ? 'Status PRO' : 'Upgrade'}</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Modals */}
      <LifetimeProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        user={user}
        onOpenPaymentModal={() => {
          setIsProModalOpen(false);
          setIsPaymentModalOpen(true);
        }}
        onSwitchUser={() => {
          setIsProModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onRedeemSuccess={(updated) => setUser(updated)}
      />

      {/* Admin Panel Modal (Strictly Owner/Admin Only) */}
      {isAdmin && (
        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          currentUser={user}
          onUserListUpdated={() => {
            fetch(`/api/user/status?email=${encodeURIComponent(user.email)}`)
              .then((r) => r.json())
              .then((d) => d.user && setUser(d.user));
          }}
        />
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        currentUser={user}
        onPaymentSuccess={(updated) => setUser(updated)}
      />

      <AdFormatSelectorModal
        isOpen={isFormatModalOpen}
        onClose={() => setIsFormatModalOpen(false)}
        selectedFormatId={formData.adFormat}
        onSelectFormat={(id) => setFormData((p) => ({ ...p, adFormat: id }))}
      />

      <UserLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={user}
        onUserChanged={(u) => setUser(u)}
      />

      <HowToUseGuideModal
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectConcept={(c) => setGeneratedConcept(c)}
      />
    </div>
  );
}
