import React, { useState, useEffect } from 'react';
import { X, History, Sparkles, Clock, Copy, Check, Trash2 } from 'lucide-react';
import { GeneratedConcept } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (concept: GeneratedConcept) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, onSelectConcept }) => {
  const [history, setHistory] = useState<GeneratedConcept[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data.history || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-black/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Riwayat Konsep & Naskah Tersimpan
              </h2>
              <div className="text-xs text-zinc-400">
                Akses kembali konsep storyboard dan video prompt yang pernah Anda hasilkan
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 touch-pan-y">
          {loading ? (
            <div className="p-10 text-center text-xs text-zinc-400">Memuat riwayat...</div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center text-xs text-zinc-500 space-y-2">
              <History className="w-8 h-8 mx-auto text-zinc-600" />
              <div>Belum ada konsep tersimpan. Klik "+ GENERATE PACKAGE PROMPT" untuk memulai.</div>
            </div>
          ) : (
            history.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  onSelectConcept(c);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 hover:border-amber-400 transition-all cursor-pointer space-y-2 group hover:bg-neutral-900/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
                    {c.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700">
                      {c.duration}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                      {c.adFormat}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {c.summary}
                </p>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-amber-500/10">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400/70" />
                    <span>{new Date(c.createdAt).toLocaleString('id-ID')}</span>
                  </div>
                  <span className="text-amber-400 font-semibold group-hover:underline">Buka Konsep →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
