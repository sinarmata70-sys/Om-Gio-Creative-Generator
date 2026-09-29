import React, { useRef, useEffect } from 'react';
import { 
  Upload, 
  User as UserIcon, 
  Sparkles, 
  Check, 
  Layers, 
  Copy, 
  Download, 
  RotateCcw,
  X,
  FileCheck2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { ConceptRequest, ReferenceImage } from '../types';
import { AD_FORMATS, getAdFormatById } from '../data/adFormats';

interface ConceptBuilderProps {
  formData: ConceptRequest;
  setFormData: React.Dispatch<React.SetStateAction<ConceptRequest>>;
  productImages: ReferenceImage[];
  setProductImages: React.Dispatch<React.SetStateAction<ReferenceImage[]>>;
  characterImages: ReferenceImage[];
  setCharacterImages: React.Dispatch<React.SetStateAction<ReferenceImage[]>>;
  onGenerate: () => void;
  isGenerating: boolean;
  onOpenFormatModal: () => void;
  onReset: () => void;
  onCopyAll: () => void;
  onDownloadTxt: () => void;
  hasOutput: boolean;
  onSectionInView?: (sectionId: string) => void;
}

export const ConceptBuilder: React.FC<ConceptBuilderProps> = ({
  formData,
  setFormData,
  productImages,
  setProductImages,
  characterImages,
  setCharacterImages,
  onGenerate,
  isGenerating,
  onOpenFormatModal,
  onReset,
  onCopyAll,
  onDownloadTxt,
  hasOutput,
  onSectionInView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);
  const characterInputRef = useRef<HTMLInputElement>(null);

  // Scroll spy to update active section in sidebar when user scrolls
  useEffect(() => {
    if (!onSectionInView) return;
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: any = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sections = [
          { id: 'overview', el: document.getElementById('section-overview') },
          { id: 'references', el: document.getElementById('section-references') },
          { id: 'creative-direction', el: document.getElementById('section-creative-direction') },
          { id: 'creative-tools', el: document.getElementById('section-creative-tools') },
          { id: 'production', el: document.getElementById('section-production') }
        ];

        const containerScrollTop = container.scrollTop;
        for (let i = sections.length - 1; i >= 0; i--) {
          const s = sections[i];
          if (s.el) {
            const elTop = s.el.offsetTop - container.offsetTop;
            if (containerScrollTop >= elTop - 120) {
              onSectionInView(s.id);
              break;
            }
          }
        }
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onSectionInView]);

  const selectedFormat = getAdFormatById(formData.adFormat);

  // File upload handlers
  const handleProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setProductImages((prev) => [
          ...prev,
          {
            id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
            name: file.name,
            type: 'product',
            dataUrl,
            mimeType: file.type || 'image/jpeg',
            roleOrTag: 'product.jpg'
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setCharacterImages((prev) => [
          ...prev,
          {
            id: `char-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
            name: file.name,
            type: 'character',
            dataUrl,
            mimeType: file.type || 'image/jpeg',
            roleOrTag: prev.length === 0 ? 'creator.png' : `actor_${prev.length + 1}.png`
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeProductImage = (id: string) => {
    setProductImages((prev) => prev.filter((img) => img.id !== id));
  };

  const removeCharacterImage = (id: string) => {
    setCharacterImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleCreativeTool = (tool: keyof typeof formData.creativeTools) => {
    setFormData((prev) => ({
      ...prev,
      creativeTools: {
        ...prev.creativeTools,
        [tool]: !prev.creativeTools[tool]
      }
    }));
  };

  const is64s = formData.duration === '64s';

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 space-y-5 pb-32 lg:pb-28 touch-pan-y scroll-smooth">
      {/* 01 Overview Section */}
      <div id="section-overview" className="scroll-mt-4 space-y-3">
        <div className="space-y-1">
          <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-400">
            AI CONCEPT INTELLIGENCE • WORKSPACE
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Om Gio Creative Director</span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40">
              V11 PRO
            </span>
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-400">
            AI untuk Membuat Konsep Iklan & Konten Video dari reference, ide, storytelling, storyboard, hingga video-generation prompt.
          </p>
        </div>

        {/* Build your concept banner */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black flex items-center justify-center shrink-0">
              01
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Build your concept
            </h3>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 hidden sm:inline">
              Reference → AI Vision → Creative Direction → Scene Blueprint
            </span>
          </div>

          {/* AI Insight Pill */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#0e0e13] border border-amber-500/20 flex items-start gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-zinc-300 shadow-sm shadow-black/50">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="leading-relaxed">
              AI membaca semua foto produk sebagai satu set referensi, membandingkan detail yang terlihat, lalu memilih konsep iklan yang paling kuat tanpa mengarang klaim.
            </p>
          </div>
        </div>
      </div>

      {/* 02 References Section */}
      <div id="section-references" className="scroll-mt-4 space-y-3 p-3.5 sm:p-4 rounded-2xl bg-[#0a0a0e]/70 border border-amber-500/15 transition-all duration-300 shadow-lg shadow-black/40">
        <div className="flex items-center justify-between border-b border-amber-500/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/35 text-xs font-black flex items-center justify-center">
              REF
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                References (Product + Character)
              </h4>
              <p className="text-[10px] text-zinc-400">
                Unggah foto produk dan karakter/creator untuk dikunci oleh AI Vision
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 hidden sm:inline-block shadow-sm shadow-amber-500/10">
            Vision Locked
          </span>
        </div>

        {/* Dual Upload Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Card 1: Product Photo Uploader */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#0e0e14] border border-neutral-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-2 sm:space-y-3">
            <div>
              <div 
                onClick={() => productInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-800 hover:border-amber-500/60 rounded-xl p-3 sm:p-5 text-center cursor-pointer bg-black/40 hover:bg-[#121218] transition-all group active:scale-[0.99]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full bg-neutral-900 group-hover:bg-amber-500/20 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 mb-1.5 sm:mb-2 transition-colors border border-neutral-800 group-hover:border-amber-500/40">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-zinc-200 group-hover:text-amber-200">
                  Klik untuk memilih file atau seret foto produk ke sini
                </div>
                <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 sm:mt-1">
                  JPG • PNG • WEBP — beberapa reference diperbolehkan
                </div>
              </div>
              <input
                ref={productInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleProductUpload}
                className="hidden"
              />
            </div>

            {/* Thumbnail previews */}
            {productImages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
                {productImages.map((img) => (
                  <div key={img.id} className="relative group/thumb w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-amber-500/30 bg-black">
                    <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] text-center text-amber-300 truncate px-0.5 font-medium">
                      product.jpg
                    </span>
                    <button
                      onClick={() => removeProductImage(img.id)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600/90 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[9px] sm:text-[10px] text-zinc-400 leading-normal">
              Bisa menggunakan berbagai jenis file reference. AI akan membaca file yang didukung dan menggunakannya sebagai sumber konteks produk.
            </div>
          </div>

          {/* Card 2: Creator / Character Uploader */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#0e0e14] border border-neutral-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-2 sm:space-y-3">
            <div>
              <div 
                onClick={() => characterInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-800 hover:border-amber-500/60 rounded-xl p-3 sm:p-5 text-center cursor-pointer bg-black/40 hover:bg-[#121218] transition-all group active:scale-[0.99]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full bg-neutral-900 group-hover:bg-amber-500/20 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 mb-1.5 sm:mb-2 transition-colors border border-neutral-800 group-hover:border-amber-500/40">
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-zinc-200 group-hover:text-amber-200">
                  Klik untuk memilih creator / character reference
                </div>
                <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 sm:mt-1">
                  Wajah + outfit dikunci — bisa lebih dari 1 karakter
                </div>
              </div>
              <input
                ref={characterInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleCharacterUpload}
                className="hidden"
              />
            </div>

            {/* Thumbnail previews */}
            {characterImages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
                {characterImages.map((img) => (
                  <div key={img.id} className="relative group/thumb w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-amber-500/30 bg-black">
                    <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] text-center text-amber-300 truncate px-0.5 font-medium">
                      {img.roleOrTag || 'creator.png'}
                    </span>
                    <button
                      onClick={() => removeCharacterImage(img.id)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600/90 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[9px] sm:text-[10px] text-zinc-400 leading-normal">
              Setiap gambar memiliki nama pemeran/karakter dan peran sendiri. AI Vision menganalisis setiap reference secara terpisah lalu memakai nama/peran tersebut sebagai identitas dialog dan asset mapping.
            </div>
          </div>
        </div>
      </div>

      {/* 03 Creative Direction Section */}
      <div id="section-creative-direction" className="scroll-mt-4 space-y-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0a0a0e]/70 border border-amber-500/15 transition-all duration-300 shadow-lg shadow-black/40">
        <div className="flex items-center justify-between border-b border-amber-500/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/35 text-xs font-black flex items-center justify-center">
              DIR
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Creative Direction (Mode + Strategy)
              </h4>
              <p className="text-[10px] text-zinc-400">
                Pilih mode iklan/konten, formula 137 format iklan, target audiens, dan pesan brief
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenFormatModal}
            className="text-[10px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1 rounded-lg border border-amber-500/35 transition-colors flex items-center gap-1 cursor-pointer shadow-sm shadow-amber-500/10"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Katalog 137 DNA</span>
          </button>
        </div>

        {/* MODE IKLAN / KONTEN TOGGLES */}
        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-400/80">
            MODE IKLAN / KONTEN *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, mode: 'ad' }))}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.mode === 'ad'
                  ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border-amber-400 text-white shadow-md shadow-amber-500/15'
                  : 'bg-[#0d0d12] border-neutral-800 text-zinc-400 hover:text-zinc-200 hover:border-neutral-700'
              }`}
            >
              <div className="text-[11px] sm:text-xs font-bold flex items-center justify-between">
                <span className={formData.mode === 'ad' ? 'text-amber-300' : ''}>Mode Iklan</span>
                {formData.mode === 'ad' && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 sm:mt-1">
                Product Reference + 137 format Iklan • Hook → Proof → CTA.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, mode: 'content' }))}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.mode === 'content'
                  ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border-amber-400 text-white shadow-md shadow-amber-500/15'
                  : 'bg-[#0d0d12] border-neutral-800 text-zinc-400 hover:text-zinc-200 hover:border-neutral-700'
              }`}
            >
              <div className="text-[11px] sm:text-xs font-bold flex items-center justify-between">
                <span className={formData.mode === 'content' ? 'text-amber-300' : ''}>Mode Konten</span>
                {formData.mode === 'content' && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 sm:mt-1">
                Character Assets + Nama/Pemeran + Topik • Hook → Story → Payoff.
              </div>
            </button>
          </div>
        </div>

        {/* Jenis Iklan 137 format */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-400/80">
              Jenis Iklan * (137 format)
            </label>
            <button
              type="button"
              onClick={onOpenFormatModal}
              className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline flex items-center gap-1"
            >
              <span>Buka Pilihan Format</span>
            </button>
          </div>
          <div className="relative">
            <select
              value={formData.adFormat}
              onChange={(e) => setFormData((p) => ({ ...p, adFormat: e.target.value }))}
              className="w-full bg-[#0e0e14] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white appearance-none focus:outline-none focus:border-amber-500 cursor-pointer pr-8"
            >
              {AD_FORMATS.map((fmt) => (
                <option key={fmt.id} value={fmt.id} className="bg-neutral-950 text-white">
                  [{fmt.category}] {fmt.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-400/80 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
          {selectedFormat && (
            <div className="text-[9px] sm:text-[10px] text-zinc-400 truncate">
              Formula: {selectedFormat.formula}
            </div>
          )}
        </div>

        {/* Target Audience & Brief Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Target Audience (opsional)
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData((p) => ({ ...p, targetAudience: e.target.value }))}
              placeholder="AI infer otomatis jika kosong"
              className="w-full bg-[#0e0e14] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Brief / Pesan Tambahan (opsional)
            </label>
            <input
              type="text"
              value={formData.brief}
              onChange={(e) => setFormData((p) => ({ ...p, brief: e.target.value }))}
              placeholder="Contoh: fokus problem relatable, feel premium"
              className="w-full bg-[#0e0e14] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 04 Creative Tools Section */}
      <div id="section-creative-tools" className="scroll-mt-4 space-y-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0a0a0e]/70 border border-amber-500/15 transition-all duration-300 shadow-lg shadow-black/40">
        <div className="flex items-center justify-between border-b border-amber-500/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/35 text-xs font-black flex items-center justify-center">
              TOOL
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Creative Tools (Hook • Product • Character)
              </h4>
              <p className="text-[10px] text-zinc-400">
                Aktivasi shortcut pilar konseptual ke engine utama V11
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
            V11 Active
          </span>
        </div>

        {/* SMART CONCEPT FLOW */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-amber-400 uppercase tracking-wider text-[10px] sm:text-[11px]">
              SMART CONCEPT FLOW
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400">
              {is64s ? '64s • 8 videos • 32 panels' : '32s • 4 videos • 16 panels'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[10px]">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#0e0e13] border border-neutral-800">
              <div className="text-amber-400 font-black text-[10px] sm:text-xs">01</div>
              <div className="text-zinc-300 font-bold uppercase tracking-wider text-[8px] sm:text-[9px]">AI VISION</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#0e0e13] border border-neutral-800">
              <div className="text-amber-300 font-black text-[10px] sm:text-xs">02</div>
              <div className="text-zinc-300 font-bold uppercase tracking-wider text-[8px] sm:text-[9px]">DIRECTION</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#0e0e13] border border-neutral-800">
              <div className="text-yellow-400 font-black text-[10px] sm:text-xs">03</div>
              <div className="text-zinc-300 font-bold uppercase tracking-wider text-[8px] sm:text-[9px]">BLUEPRINT</div>
            </div>
          </div>

          <div className="text-[8px] sm:text-[9px] text-center text-zinc-400 font-mono tracking-tight truncate">
            AI VISION → TREND INTELLIGENCE → CREATIVE DIRECTION → SCENE BLUEPRINT
          </div>
        </div>

        {/* CREATIVE TOOLS TOGGLES */}
        <div className="space-y-1.5">
          <div className="text-[10px] sm:text-[11px] font-extrabold text-amber-400/80 uppercase tracking-wider">
            PILAR ELEMEN WORKFLOW
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => toggleCreativeTool('hook')}
              className={`p-1.5 sm:p-2 rounded-lg border text-left transition-all cursor-pointer ${
                formData.creativeTools.hook
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm shadow-amber-500/10'
                  : 'bg-black/40 border-neutral-800 text-zinc-400'
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] border ${formData.creativeTools.hook ? 'bg-amber-500 border-amber-400 text-black font-black' : 'border-neutral-700'}`}>
                  {formData.creativeTools.hook && '✓'}
                </span>
                <span className={formData.creativeTools.hook ? 'text-amber-300' : ''}>Hook</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 truncate">siapkan hook</div>
            </button>

            <button
              type="button"
              onClick={() => toggleCreativeTool('product')}
              className={`p-1.5 sm:p-2 rounded-lg border text-left transition-all cursor-pointer ${
                formData.creativeTools.product
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm shadow-amber-500/10'
                  : 'bg-black/40 border-neutral-800 text-zinc-400'
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] border ${formData.creativeTools.product ? 'bg-amber-500 border-amber-400 text-black font-black' : 'border-neutral-700'}`}>
                  {formData.creativeTools.product && '✓'}
                </span>
                <span className={formData.creativeTools.product ? 'text-amber-300' : ''}>Product</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 truncate">profil produk</div>
            </button>

            <button
              type="button"
              onClick={() => toggleCreativeTool('character')}
              className={`p-1.5 sm:p-2 rounded-lg border text-left transition-all cursor-pointer ${
                formData.creativeTools.character
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm shadow-amber-500/10'
                  : 'bg-black/40 border-neutral-800 text-zinc-400'
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] border ${formData.creativeTools.character ? 'bg-amber-500 border-amber-400 text-black font-black' : 'border-neutral-700'}`}>
                  {formData.creativeTools.character && '✓'}
                </span>
                <span className={formData.creativeTools.character ? 'text-amber-300' : ''}>Character</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 truncate">lock karakter</div>
            </button>

            <button
              type="button"
              onClick={() => toggleCreativeTool('storyboard')}
              className={`p-1.5 sm:p-2 rounded-lg border text-left transition-all cursor-pointer ${
                formData.creativeTools.storyboard
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm shadow-amber-500/10'
                  : 'bg-black/40 border-neutral-800 text-zinc-400'
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] border ${formData.creativeTools.storyboard ? 'bg-amber-500 border-amber-400 text-black font-black' : 'border-neutral-700'}`}>
                  {formData.creativeTools.storyboard && '✓'}
                </span>
                <span className={formData.creativeTools.storyboard ? 'text-amber-300' : ''}>Storyboard</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 truncate">master 4:3</div>
            </button>

            <button
              type="button"
              onClick={() => toggleCreativeTool('videoPackage')}
              className={`p-1.5 sm:p-2 rounded-lg border text-left transition-all cursor-pointer ${
                formData.creativeTools.videoPackage
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm shadow-amber-500/10'
                  : 'bg-black/40 border-neutral-800 text-zinc-400'
              }`}
            >
              <div className="text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                <span className={`w-3 h-3 rounded flex items-center justify-center text-[8px] border ${formData.creativeTools.videoPackage ? 'bg-amber-500 border-amber-400 text-black font-black' : 'border-neutral-700'}`}>
                  {formData.creativeTools.videoPackage && '✓'}
                </span>
                <span className={formData.creativeTools.videoPackage ? 'text-amber-300' : ''}>Video Package</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 truncate">UGC production</div>
            </button>
          </div>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-sm shadow-amber-400" />
          <span className="truncate">Product & character identity locked • Claims grounded</span>
        </div>
      </div>

      {/* 05 Production Section */}
      <div id="section-production" className="scroll-mt-4 space-y-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0a0a0e]/70 border border-amber-500/15 transition-all duration-300 shadow-lg shadow-black/40">
        <div className="flex items-center justify-between border-b border-amber-500/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/35 text-xs font-black flex items-center justify-center">
              PROD
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Production (Duration • Engine • Ratio)
              </h4>
              <p className="text-[10px] text-zinc-400">
                Pilih durasi video, engine generator AI video, dan aspect ratio penayangan
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            {formData.duration} • {formData.aspectRatio}
          </span>
        </div>

        {/* Durasi Produksi */}
        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-400/80">
            Durasi Produksi *
          </label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, duration: '32s' }))}
              className={`py-2 px-2 sm:px-3 rounded-lg border text-center font-bold text-[11px] sm:text-xs transition-all cursor-pointer ${
                formData.duration === '32s'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/15'
                  : 'bg-[#0d0d12] border-neutral-800 text-zinc-400 hover:text-zinc-200 hover:border-neutral-700'
              }`}
            >
              32s • 4 video • 16 panel
            </button>
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, duration: '64s' }))}
              className={`py-2 px-2 sm:px-3 rounded-lg border text-center font-bold text-[11px] sm:text-xs transition-all cursor-pointer ${
                formData.duration === '64s'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/15 border-amber-400 text-amber-200 shadow-md shadow-amber-500/15'
                  : 'bg-[#0d0d12] border-neutral-800 text-zinc-400 hover:text-zinc-200 hover:border-neutral-700'
              }`}
            >
              64s • 8 video • 32 panel
            </button>
          </div>
          <div className="text-[9px] sm:text-[10px] text-zinc-400">
            Setiap video utama berdurasi 8 detik dan berisi 4 transition beat x 2 detik (32s = 16 panel, 64s = 32 panel).
          </div>
        </div>

        {/* Engine Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-400/80">
            Generate dengan *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, engine: 'Omni1.1flash' }))}
              className={`p-2 sm:p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                formData.engine === 'Omni1.1flash'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-sm shadow-amber-500/10'
                  : 'bg-[#0d0d12] border-neutral-800 text-zinc-400 hover:text-zinc-300 hover:border-neutral-700'
              }`}
            >
              <div className="text-[11px] sm:text-xs font-bold text-amber-300">Omni1.1flash</div>
              <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 leading-snug">
                AI menyusun prompt khusus untuk format dan karakter prompt Omni1.1flash.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, engine: 'All Generator Video' }))}
              className={`p-2 sm:p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                formData.engine === 'All Generator Video'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-sm shadow-amber-500/10'
                  : 'bg-[#0d0d12] border-neutral-800 text-zinc-400 hover:text-zinc-300 hover:border-neutral-700'
              }`}
            >
              <div className="text-[11px] sm:text-xs font-bold text-amber-300">All Generator Video</div>
              <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 leading-snug">
                Veo3lite, Kling, HeyGen, Seedance, dan generator video lainnya.
              </div>
            </button>
          </div>
          <div className="text-[9px] sm:text-[10px] text-zinc-400">
            Pilih mesin target agar struktur prompt disesuaikan dengan generator yang dipilih.
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-400/80">
            Aspect Ratio *
          </label>
          <div className="relative">
            <select
              value={formData.aspectRatio}
              onChange={(e) => setFormData((p) => ({ ...p, aspectRatio: e.target.value as any }))}
              className="w-full bg-[#0e0e14] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white appearance-none focus:outline-none focus:border-amber-500 cursor-pointer pr-8"
            >
              <option value="9:16">9:16 Vertical (TikTok, Reels, Shorts)</option>
              <option value="16:9">16:9 Landscape (YouTube, Website, TV)</option>
              <option value="1:1">1:1 Square (Instagram Feed, Carousels)</option>
              <option value="4:5">4:5 Portrait (Instagram & FB Feed)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-amber-400/80 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating or Sticky Action Bar */}
      <div className="sticky bottom-2 sm:bottom-4 z-20 pt-1">
        <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-[#09090d]/95 backdrop-blur-xl border border-amber-500/35 shadow-2xl shadow-black/90 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-black font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer disabled:opacity-60 border border-amber-300/40"
          >
            <Sparkles className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'MENYUSUN KONSEP AI...' : '+ GENERATE PACKAGE PROMPT'}</span>
          </button>

          {hasOutput && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={onCopyAll}
                className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-200 text-[11px] sm:text-xs font-semibold border border-amber-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                title="Salin Semua Output"
              >
                <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Copy</span>
              </button>
              <button
                type="button"
                onClick={onDownloadTxt}
                className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-200 text-[11px] sm:text-xs font-semibold border border-amber-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                title="Download Naskah TXT"
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                <span className="hidden sm:inline">TXT</span>
              </button>
              <button
                type="button"
                onClick={onReset}
                className="px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-zinc-400 hover:text-red-400 text-[11px] sm:text-xs font-semibold border border-amber-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset Form"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
