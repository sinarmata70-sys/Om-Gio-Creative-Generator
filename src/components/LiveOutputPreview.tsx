import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Video, 
  Layers, 
  Share2, 
  HelpCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { GeneratedConcept } from '../types';

interface LiveOutputPreviewProps {
  concept: GeneratedConcept | null;
  engine: string;
  duration: string;
  isGenerating: boolean;
}

export const LiveOutputPreview: React.FC<LiveOutputPreviewProps> = ({
  concept,
  engine,
  duration,
  isGenerating
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionId: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const openExternalChatbot = (service: 'chatgpt' | 'gemini' | 'dola', text: string) => {
    if (!text) return;
    const encoded = encodeURIComponent(text);
    let url = '';
    if (service === 'chatgpt') {
      url = `https://chat.openai.com/?q=${encoded}`;
    } else if (service === 'gemini') {
      url = `https://gemini.google.com/app?text=${encoded}`;
    } else if (service === 'dola') {
      url = `https://dola.ai/`;
    }
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyCaraPakai = () => {
    const text = `CARA MENGGUNAKAN MASTER VIDEO PROMPT + REFERENSI ASET:
1. Siapkan referensi: creator.png + product.jpg
2. Masukkan referensi ke sesi All Generator Video: upload semua creator asset yang dipakai + product.jpg.
3. Gunakan asset tag yang konsisten: creator.png + product.jpg.
4. Tempel MASTER VIDEO GENERATION PROMPT dari kotak 02. Prompt sudah membawa Scene Blueprint, urutan panel, continuity, identity lock dan instruksi semua video.
5. Generate langsung: tidak ada approval gate. 32s menghasilkan tepat 4 video terhubung; 64s menghasilkan tepat 8 video terhubung. Setiap video = 8 detik dan 4 beat x 2 detik.
6. Jangan menambahkan storyboard sebagai asset ketiga. Storyboard adalah output visual/reference; eksekusi video mengikuti Scene Blueprint yang tertanam di Master Video Prompt.`;
    handleCopy(text, 'cara');
  };

  const is64s = duration === '64s';

  return (
    <div id="section-output" className="w-full lg:w-[480px] xl:w-[540px] border-t lg:border-t-0 lg:border-l border-amber-500/20 bg-[#07070a]/95 overflow-y-auto p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 shrink-0 pb-28 lg:pb-8 touch-pan-y scroll-mt-2 shadow-xl shadow-black/80">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black flex items-center justify-center">
              02
            </span>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Live Output Preview</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-400/15 text-amber-300 border border-amber-500/30">
                PRO
              </span>
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm shadow-amber-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            READY
          </span>
        </div>

        {/* Live status tags */}
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div className="p-1.5 rounded-lg bg-[#0e0e13] border border-amber-500/20 text-center">
            <div className="text-zinc-400 text-[9px] uppercase tracking-wider font-semibold">VISION</div>
            <div className="text-amber-300 font-bold">AI Analyze</div>
          </div>
          <div className="p-1.5 rounded-lg bg-[#0e0e13] border border-amber-500/20 text-center">
            <div className="text-zinc-400 text-[9px] uppercase tracking-wider font-semibold">HOOK</div>
            <div className="text-amber-300 font-bold">Intelligent</div>
          </div>
          <div className="p-1.5 rounded-lg bg-[#0e0e13] border border-amber-500/20 text-center">
            <div className="text-zinc-400 text-[9px] uppercase tracking-wider font-semibold">ENGINE</div>
            <div className="text-amber-300 font-bold truncate">{engine}</div>
          </div>
        </div>

        <div className="text-[9px] text-zinc-400 font-mono tracking-tight leading-relaxed">
          CREATIVE DIRECTION Role Lock → Ad/Content DNA → Hook → Story → Demo/Payoff → CTA → Continuity
        </div>
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-center space-y-3 animate-pulse shadow-lg shadow-amber-500/10">
          <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div className="text-xs font-bold text-amber-200">
            Sedang Meracik Konsep Multimodal & Scene Blueprint...
          </div>
          <div className="text-[11px] text-zinc-400">
            AI Gemini membaca detail produk, ekspresi karakter, menyusun 4:3 master storyboard dan video prompt.
          </div>
        </div>
      )}

      {/* BOX 01: MASTER STORYBOARD PROMPT */}
      <div className="p-4 rounded-xl bg-[#0e0e14] border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-2.5 shadow-md shadow-black/50">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs font-bold text-amber-200 tracking-tight flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>01 • MASTER STORYBOARD PROMPT — 4:3 — {duration.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleCopy(concept?.masterStoryboardPrompt || '', 'box1')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-amber-200 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 border border-amber-500/25"
            >
              {copiedSection === 'box1' ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
              <span>{copiedSection === 'box1' ? 'Tersalin' : 'Copy'}</span>
            </button>
            <button
              onClick={() => openExternalChatbot('chatgpt', concept?.masterStoryboardPrompt || '')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-zinc-300 text-[10px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              ChatGPT
            </button>
            <button
              onClick={() => openExternalChatbot('gemini', concept?.masterStoryboardPrompt || '')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-zinc-300 text-[10px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Gemini
            </button>
            <button
              onClick={() => openExternalChatbot('dola', concept?.masterStoryboardPrompt || '')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-zinc-300 text-[10px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Dola
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-black/75 border border-neutral-800/90 rounded-lg p-3 min-h-[120px] max-h-[260px] overflow-y-auto font-mono text-[11px] text-amber-100/90 leading-relaxed whitespace-pre-wrap selection:bg-amber-400 selection:text-black">
          {concept?.masterStoryboardPrompt || (
            <span className="text-zinc-500 italic">
              Master Storyboard 4:3 akan muncul di sini...
            </span>
          )}
        </div>
        <div className="text-[10px] text-zinc-400">
          Klik AI untuk membuka chatbot dengan prompt Master Storyboard langsung terisi.
        </div>
      </div>

      {/* BOX 02: MASTER VIDEO GENERATION PROMPT */}
      <div className="p-4 rounded-xl bg-[#0e0e14] border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-2.5 shadow-md shadow-black/50">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs font-bold text-amber-200 tracking-tight flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>02 • MASTER VIDEO GENERATION PROMPT — {duration.toUpperCase()} — {engine.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleCopy(concept?.masterVideoPrompt || '', 'box2')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-amber-200 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 border border-amber-500/25"
            >
              {copiedSection === 'box2' ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
              <span>{copiedSection === 'box2' ? 'Tersalin' : 'Copy'}</span>
            </button>
            <button
              onClick={() => openExternalChatbot('chatgpt', concept?.masterVideoPrompt || '')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-zinc-300 text-[10px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              ChatGPT
            </button>
            <button
              onClick={() => openExternalChatbot('gemini', concept?.masterVideoPrompt || '')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-zinc-300 text-[10px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Gemini
            </button>
            <button
              onClick={() => openExternalChatbot('dola', concept?.masterVideoPrompt || '')}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-zinc-300 text-[10px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Dola
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-black/75 border border-neutral-800/90 rounded-lg p-3 min-h-[140px] max-h-[300px] overflow-y-auto font-mono text-[11px] text-amber-100/90 leading-relaxed whitespace-pre-wrap selection:bg-amber-400 selection:text-black">
          {concept?.masterVideoPrompt || (
            <span className="text-zinc-500 italic">
              Satu Master Video Generation Prompt lengkap untuk {engine} akan muncul di sini...
            </span>
          )}
        </div>
        <div className="text-[10px] text-zinc-400">
          Tempel prompt ini ke {engine} setelah reference asset tersedia.
        </div>
      </div>

      {/* BOX 03: SOCIAL MEDIA CONTENT PACKAGE */}
      <div className="p-4 rounded-xl bg-[#0e0e14] border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-2.5 shadow-md shadow-black/50">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs font-bold text-amber-200 tracking-tight flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>03 • SOCIAL MEDIA CONTENT PACKAGE</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => {
                if (!concept) return;
                const fullSocial = `TIKTOK:\n${concept.socialPackage.tiktok}\n\nINSTAGRAM REELS:\n${concept.socialPackage.instagram}\n\nHASHTAGS:\n${concept.socialPackage.hashtags.join(' ')}\n\nSUGGESTED AUDIO: ${concept.socialPackage.suggestedAudio}`;
                handleCopy(fullSocial, 'social');
              }}
              disabled={!concept}
              className="px-2 py-1 rounded bg-[#14141a] hover:bg-neutral-800 text-amber-200 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 border border-amber-500/25"
            >
              {copiedSection === 'social' ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
              <span>{copiedSection === 'social' ? 'Tersalin' : 'Copy'}</span>
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.tiktok || '', 'tiktok')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              TikTok
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.instagram || '', 'ig')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Instagram
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.facebook || '', 'fb')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Facebook
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.threads || '', 'threads')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Threads
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.x || '', 'x')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              X
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.youtube || '', 'yt')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              YouTube
            </button>
            <button
              onClick={() => handleCopy(concept?.socialPackage.pinterest || '', 'pin')}
              disabled={!concept}
              className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-300 text-[9px] transition-colors cursor-pointer disabled:opacity-40 border border-neutral-800"
            >
              Pinterest
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-black/75 border border-neutral-800/90 rounded-lg p-3 min-h-[110px] max-h-[220px] overflow-y-auto text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {concept ? (
            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">TIKTOK / REELS CAPTION:</span>
                {concept.socialPackage.tiktok || concept.socialPackage.instagram}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block">VIRAL HASHTAGS:</span>
                <span className="text-amber-200/90">{concept.socialPackage.hashtags?.join(' ')}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider block">SUGGESTED AUDIO:</span>
                <span className="text-zinc-400 italic">{concept.socialPackage.suggestedAudio}</span>
              </div>
            </div>
          ) : (
            <span className="text-zinc-500 italic">
              Social Media Content Package akan muncul di sini...
            </span>
          )}
        </div>
        <div className="text-[10px] text-zinc-400">
          Caption dibuat dari Creative Direction yang sama. Mode Konten menggunakan CTA Follow/Subscribe. Setiap platform memiliki tepat 5 hashtag.
        </div>
      </div>

      {/* CARA MENGGUNAKAN MASTER VIDEO PROMPT CARD */}
      <div className="p-4 rounded-xl bg-[#0a0a0e] border border-amber-500/20 space-y-3 shadow-md shadow-black/50">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>CARA MENGGUNAKAN MASTER VIDEO PROMPT + REFERENSI ASET</span>
          </div>
          <button
            onClick={copyCaraPakai}
            className="px-2 py-0.5 rounded bg-[#14141a] hover:bg-neutral-800 text-amber-200 text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-amber-500/25"
          >
            {copiedSection === 'cara' ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
            <span>Copy Cara</span>
          </button>
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Master Video Generation Prompt adalah satu-satunya output video dan siap ditempel ke Google Flow Agent / All Generator Video. Mode Iklan memakai creator.png + product.jpg, Mode Konten memakai creator_01.png, creator_02.png, dan asset creator lain sesuai Character / Actor Asset Map. 32s = 4 video/shot + 16 storyboard panels; 64s = 8 video/shot + 32 storyboard panels.
        </p>

        <ol className="text-[11px] text-zinc-300 space-y-1.5 list-decimal pl-4 leading-relaxed">
          <li><span className="font-semibold text-white">Siapkan referensi:</span> <code className="bg-black px-1.5 py-0.5 rounded text-amber-300 font-mono text-[10px] border border-amber-500/20">creator.png + product.jpg</code></li>
          <li><span className="font-semibold text-white">Masukkan referensi ke sesi All Generator Video:</span> upload semua creator asset yang dipakai + product.jpg.</li>
          <li><span className="font-semibold text-white">Gunakan asset tag yang konsisten:</span> <code className="bg-black px-1.5 py-0.5 rounded text-amber-300 font-mono text-[10px] border border-amber-500/20">creator.png + product.jpg</code>.</li>
          <li><span className="font-semibold text-white">Tempel MASTER VIDEO GENERATION PROMPT</span> dari kotak 02. Prompt sudah membawa Scene Blueprint, urutan panel, continuity, identity lock dan instruksi semua video.</li>
          <li><span className="font-semibold text-white">Generate langsung:</span> tidak ada approval gate. 32s menghasilkan tepat 4 video terhubung; 64s menghasilkan tepat 8 video terhubung. Setiap video = 8 detik dan 4 beat x 2 detik.</li>
          <li><span className="font-semibold text-white">Jangan menambahkan storyboard sebagai asset ketiga.</span> Storyboard adalah output visual/reference; eksekusi video mengikuti Scene Blueprint yang sudah tertanam di Master Video Prompt.</li>
        </ol>

        <div className="p-2.5 rounded-lg bg-black/80 border border-neutral-800 text-[10px] space-y-1">
          <div className="font-semibold text-zinc-300">
            Reference setup: <code className="text-amber-300">creator.png + product.jpg</code> → upload ke sesi All Generator Video yang sama → paste Master Video Generation Prompt → generate all videos.
          </div>
          <div className="text-zinc-400 font-mono text-[9px] pt-1 border-t border-neutral-800">
            V11 CORE: 1 Master Storyboard 4:3 → 1 Master Video Generation Prompt → 1 Social Media Content Package. Storyboard tetap 4:3; aspect ratio pilihan hanya diterapkan pada video.
          </div>
        </div>
      </div>
    </div>
  );
};
