import { ConceptRequest, GeneratedConcept, AdFormat } from '../types';

export function generateAlgorithmicConcept(
  data: ConceptRequest,
  formatInfo: AdFormat | { name: string; category?: string; formula?: string; description?: string }
): GeneratedConcept {
  const is64s = data.duration === '64s';
  const totalPanels = is64s ? 32 : 16;
  const totalShots = is64s ? 8 : 4;

  const audience = data.targetAudience || 'Konsumen Indonesia modern yang menginginkan solusi praktis, bernilai tinggi, dan relatable';
  const briefText = data.brief ? ` (Brief Khusus: ${data.brief})` : '';
  const engine = data.engine || 'All Generator Video';
  const ratio = data.aspectRatio || '9:16';
  const formatName = formatInfo.name || 'Product Demo';
  const formula = formatInfo.formula || 'Hook -> Proof -> CTA';

  // Build panels
  const storyboardLines: string[] = [];
  storyboardLines.push(`MASTER STORYBOARD 4:3 — ${data.duration.toUpperCase()} (${totalPanels} PANELS • ${totalShots} SHOTS x 8s):`);
  storyboardLines.push(`Formula Kreatif: ${formula}`);
  storyboardLines.push(`Target Audiens: ${audience}${briefText}\n`);

  for (let s = 1; s <= totalShots; s++) {
    const startSec = (s - 1) * 8;
    const endSec = s * 8;
    let shotTheme = '';
    if (s === 1) shotTheme = 'THE AGITATED HOOK & RELATABLE PROBLEM';
    else if (s === 2) shotTheme = 'REVEAL & SENSORY FIRST IMPRESSION';
    else if (s === 3) shotTheme = 'LIVE DEMONSTRATION & PROOF OF BENEFIT';
    else if (s === 4 && totalShots === 4) shotTheme = 'IRRESISTIBLE OFFER & FINAL ACTION CTA';
    else if (s === 4) shotTheme = 'FEATURE DEEP-DIVE & VERSATILITY';
    else if (s === 5) shotTheme = 'COMPARISON & SPEED TEST';
    else if (s === 6) shotTheme = 'COMMUNITY SOCIAL PROOF & TESTIMONIAL';
    else if (s === 7) shotTheme = 'URGENCY & VALUE REINFORCEMENT';
    else shotTheme = 'IRRESISTIBLE OFFER & FINAL ACTION CTA';

    storyboardLines.push(`SHOT ${s} (${startSec}-${endSec}s) — ${shotTheme}`);

    for (let b = 1; b <= 4; b++) {
      const panelNum = (s - 1) * 4 + b;
      const panelNumStr = panelNum < 10 ? `0${panelNum}` : `${panelNum}`;
      const beatStart = startSec + (b - 1) * 2;
      const beatEnd = startSec + b * 2;

      let actionDesc = '';
      let voText = '';

      if (s === 1) {
        if (b === 1) {
          actionDesc = `Close-up ekspresi wajah [creator.png] yang tampak lelah menghadapi masalah sehari-hari. Pencahayaan natural moody, depth of field sinematik.`;
          voText = `"Capek nggak sih tiap hari harus ngadepin masalah yang sama terus?"`;
        } else if (b === 2) {
          actionDesc = `Kamera whip-pan cepat ke arah meja. [creator.png] menunjuk frustrasi ke metode lama yang tidak efisien.`;
          voText = `"Udah coba berbagai cara, tapi tetep aja buang-buang waktu dan biaya."`;
        } else if (b === 3) {
          actionDesc = `Transisi match-cut dinamis, kamera push-in halus ke arah [product.jpg] yang diletakkan elegan di atas meja marmer dengan rim light keemasan.`;
          voText = `"Sampai akhirnya nemu satu solusi yang bener-bener ngerubah semuanya."`;
        } else {
          actionDesc = `[creator.png] mengambil [product.jpg] dengan penuh rasa penasaran, tatapan mata tertuju tajam ke arah kamera.`;
          voText = `"Ini dia rahasia yang lagi rame dibicarakan belakangan ini!"`;
        }
      } else if (s === 2) {
        if (b === 1) {
          actionDesc = `Macro shot 4:3 menyorot detail fisik dan kemasan [product.jpg]. Tekstur halus material memantulkan cahaya studio lembut.`;
          voText = `"Dari pertama kali dipegang, kualitas dan build-nya bener-bener terasa beda kelas."`;
        } else if (b === 2) {
          actionDesc = `Close-up jari membuka segel kemasan [product.jpg] dengan presisi renyah, sound effect ASMR tajam.`;
          voText = `"Desain ergonomis, bahan solid, dan dirancang khusus buat kamu yang anti ribet."`;
        } else if (b === 3) {
          actionDesc = `[creator.png] memeriksa kelengkapan fitur dengan senyum kagum yang natural.`;
          voText = `"Nggak heran banyak review positif yang bilang ini produk wajib punya."`;
        } else {
          actionDesc = `Snap zoom transisi ke arah fungsi utama produk saat diaktifkan pertama kali.`;
          voText = `"Yuk langsung kita buktikan bareng-bareng performa nyatanya!"`;
        }
      } else if (s === totalShots) {
        if (b === 1) {
          actionDesc = `[creator.png] menatap percaya diri ke kamera sambil mengangkat [product.jpg] dengan bangga. Pencahayaan cerah uplifting.`;
          voText = `"Jangan tunggu sampai kesempatan promo ini habis dan kamu nyesel belakangan."`;
        } else if (b === 2) {
          actionDesc = `Grafis banner promo eksklusif, garansi resmi, dan benefit tambahan muncul secara dinamis di samping [product.jpg].`;
          voText = `"Khusus hari ini, ada penawaran spesial dan bonus langsung untuk kamu."`;
        } else if (b === 3) {
          actionDesc = `Tangan [creator.png] menunjuk ke arah tombol bio/link dengan gestur persuasif yang ramah.`;
          voText = `"Stok batch ini sangat terbatas karena tingginya permintaan minggu ini."`;
        } else {
          actionDesc = `Hero shot produk [product.jpg] dengan logo resmi, visual CTA 'Klik Link di Bio Sekarang' berkedip elegan. Fade to clean finish.`;
          voText = `"Amankan milik kamu sekarang juga. Klik link di bawah ini!"`;
        }
      } else {
        if (b === 1) {
          actionDesc = `Uji coba pemakaian langsung [product.jpg] oleh [creator.png]. Demonstrasi fungsi utama berjalan instan dan mulus.`;
          voText = `"Lihat betapa praktisnya saat digunakan, langsung kelihatan hasilnya tanpa menunggu lama."`;
        } else if (b === 2) {
          actionDesc = `Perbandingan split screen atau sebelum vs sesudah pemakaian [product.jpg] dengan kontras yang sangat jelas.`;
          voText = `"Jauh lebih cepat, lebih hemat energi, dan hasilnya konsisten setiap hari."`;
        } else if (b === 3) {
          actionDesc = `Kamera tracking orbital 90 derajat mengitari [creator.png] yang tersenyum puas menggunakan [product.jpg].`;
          voText = `"Sekali pakai langsung kerasa bedanya, bikin aktivitas sehari-hari jadi jauh lebih ringan."`;
        } else {
          actionDesc = `Montase cepat kepuasan penggunaan dalam berbagai situasi harian yang relatable.`;
          voText = `"Solusi cerdas yang bener-bener ngebantu gaya hidup modern kamu."`;
        }
      }

      storyboardLines.push(`• Panel ${panelNumStr} [${beatStart}-${beatEnd}s]: ${actionDesc} SFX: Ambience sound + subtle swoosh transition. VO: ${voText}`);
    }
    storyboardLines.push('');
  }

  // Master Video Prompt
  const videoPromptParts: string[] = [
    `MASTER VIDEO GENERATION PROMPT — ${data.duration.toUpperCase()} — ${engine.toUpperCase()}:`,
    '',
    `[CONTINUITY & IDENTITY LOCK]:`,
    `- Keep exact identity, facial structure, skin tone, hair, and modern casual wardrobe of [creator.png] strictly continuous throughout all ${totalShots} video shots.`,
    `- Ensure physical geometry, labeling, color palette, logo placement, and material finish of [product.jpg] remain identical and photorealistic with zero morphing across camera angles.`,
    '',
    `[TECHNICAL SPECIFICATIONS]:`,
    `- Aspect Ratio: ${ratio}`,
    `- Visual Grade: Cinematic 4K, 24fps motion cadence, sharp optical clarity, soft warm studio keylight with subtle complementary rim light, natural bokeh depth-of-field.`,
    `- Camera Movement: Controlled gimbal moves, eye-level tracking shots, dynamic push-in transitions, and orbital macro angles.`,
    '',
    `[SHOT PROGRESSION SEQUENCE]:`
  ];

  for (let s = 1; s <= totalShots; s++) {
    const startSec = (s - 1) * 8;
    const endSec = s * 8;
    if (s === 1) {
      videoPromptParts.push(`- SHOT 1 (${startSec}-${endSec}s): Eye-level close-up of [creator.png] exhibiting relatable daily frustration in modern interior setting. Handheld subtle camera motion. Fast whip-pan at ${startSec + 4}s revealing [product.jpg] centered on premium surface with glistening rim light. [creator.png] gently reaches out to pick up [product.jpg].`);
    } else if (s === 2) {
      videoPromptParts.push(`- SHOT 2 (${startSec}-${endSec}s): Macro optical shot of [product.jpg] highlighting fine surface texture and crisp typography. Hands of [creator.png] execute smooth tactile unboxing action. Camera slowly pulls out to reveal admiring smile on [creator.png].`);
    } else if (s === totalShots) {
      videoPromptParts.push(`- SHOT ${s} (${startSec}-${endSec}s): Hero composition featuring [creator.png] holding [product.jpg] towards camera with confidence and warm smile. Clean graphic breathing room for CTA overlay. Smooth slow push-in to product detail followed by confident direct gaze.`);
    } else {
      videoPromptParts.push(`- SHOT ${s} (${startSec}-${endSec}s): Dynamic action sequence showing [creator.png] actively demonstrating the utility of [product.jpg] in real time. Crystal-clear focus tracking, fluid movement, natural interactive lighting, visually emphasizing efficiency and superior build.`);
    }
  }

  return {
    id: `cpt-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: `${formatName} — ${data.duration} High-Converting Master Concept`,
    mode: data.mode,
    adFormat: formatName,
    engine,
    duration: data.duration,
    aspectRatio: ratio,
    summary: `Konsep iklan komersial berkonversi tinggi dengan formula ${formula}. Dirancang untuk ${audience} dengan perpaduan continuity lock [creator.png] dan [product.jpg], visual 4K sinematik, serta pacing ritmik 2 detik per beat storyboard.`,
    panelsCount: totalPanels,
    masterStoryboardPrompt: storyboardLines.join('\n'),
    storyboardPanels: [],
    masterVideoPrompt: videoPromptParts.join('\n'),
    socialPackage: {
      tiktok: `Nggak nyangka nemu solusi sepraktis ini! 🤯 Kirain cuma rame di fyp doang, ternyata pas dicoba langsung ngebuktiin sendiri kualitasnya. Buat kalian yang sering ngalamin problem serupa, wajib banget tonton sampai habis!\n\n🔥 Link promo khusus ada di bio, amankan sebelum kehabisan!`,
      instagram: `Game changer tahun ini! ✨ Dari desain kemasan sampai fungsinya, [product.jpg] bener-bener melebihi ekspektasi. Sentuh link di bio untuk klaim voucher diskon hari ini ya! 🛍️`,
      facebook: `Solusi praktis dan teruji bagi Anda yang mengutamakan kualitas nyata tanpa kompromi. Hemat waktu, awet, dan bergaransi resmi. Klik link di bawah untuk informasi promo dan pemesanan hari ini!`,
      threads: `Kalau ada produk yang langsung bikin rutinitas harian jadi jauh lebih mudah, ini salah satunya. Worth it banget untuk investasi jangka panjang. 👌`,
      x: `Setelah pemakaian intensif, ini review jujur saya tentang [product.jpg]. Ternyata klaim praktisnya bukan sekadar gimmick marketing. Simak thread singkatnya 👇`,
      youtube: `Review Jujur & Demo Lengkap: Kenapa Produk Ini Wajib Kamu Punya di 2026! 💥 Simak video singkat ini sampai selesai.`,
      pinterest: `Inspirasi gaya hidup modern & produk berkualitas tinggi 2026. Desain minimalis elegan. Simpan pin ini untuk referensi belanja Anda!`,
      hashtags: ['#rekomendasiproduk', '#racuntiktok', '#videomarketing', '#ugckreator', '#solusipraktis'],
      suggestedAudio: 'Trending Commercial Upbeat Lo-Fi Beat with subtle energetic rhythm & acoustic guitar'
    }
  };
}
