import React, { useState, useMemo } from 'react';
import { X, Search, Check, Tag, Sparkles } from 'lucide-react';
import { AD_FORMATS, AD_CATEGORIES } from '../data/adFormats';
import { AdFormat } from '../types';

interface AdFormatSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFormatId: string;
  onSelectFormat: (formatId: string) => void;
}

export const AdFormatSelectorModal: React.FC<AdFormatSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedFormatId,
  onSelectFormat
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFormats = useMemo(() => {
    return AD_FORMATS.filter((f) => {
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase()) ||
        f.formula.toLowerCase().includes(search.toLowerCase()) ||
        f.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCategory = selectedCategory === 'All' || f.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-black/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Katalog 137 Format Iklan & Konten Video DNA
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {AD_FORMATS.length} FORMULA
                </span>
              </div>
              <div className="text-xs text-zinc-400">
                Pilih format struktur konten yang terbukti mendongkrak retensi dan konversi penjualan
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 border-b border-amber-500/15 bg-black/40 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400/80 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari format iklan, formula (contoh: UGC, Before & After, ASMR, Skeptic)..."
              className="w-full bg-[#0e0e14] border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs font-semibold ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold shadow-sm shadow-amber-500/20'
                  : 'bg-black text-zinc-400 hover:text-amber-200 border border-neutral-800'
              }`}
            >
              Semua ({AD_FORMATS.length})
            </button>
            {AD_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-xs font-semibold ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold shadow-sm shadow-amber-500/20'
                    : 'bg-black text-zinc-400 hover:text-amber-200 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Format List Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 touch-pan-y">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFormats.map((fmt) => {
              const isSelected = selectedFormatId === fmt.id;
              return (
                <div
                  key={fmt.id}
                  onClick={() => {
                    onSelectFormat(fmt.id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/15'
                      : 'bg-black/50 border-neutral-800 hover:border-amber-500/40 hover:bg-[#121218]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-white leading-snug">{fmt.name}</span>
                      {isSelected ? (
                        <span className="p-1 rounded-full bg-amber-400 text-black shrink-0 font-black">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-amber-300 font-semibold shrink-0 border border-neutral-800">
                          {fmt.category}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-amber-300/90 font-mono leading-tight">
                      {fmt.formula}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-normal line-clamp-2">
                    {fmt.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {fmt.tags.map((t) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-900 text-zinc-400 border border-neutral-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-500/15 bg-black/80 flex justify-between items-center text-xs text-zinc-400">
          <span>Menampilkan {filteredFormats.length} dari {AD_FORMATS.length} format komersial</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-zinc-200 font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
