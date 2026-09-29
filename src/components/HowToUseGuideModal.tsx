import React from 'react';
import { X, BookOpen, CheckCircle2, Film, Layers, Copy, Sparkles } from 'lucide-react';

interface HowToUseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToUseGuideModal: React.FC<HowToUseGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-black/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Panduan Workflow Om Gio Creative Director (V11)
              </h2>
              <div className="text-xs text-zinc-400">
                Cara memproduksi video iklan komersial dari Master Prompt ke AI Video Generator
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
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-zinc-300 leading-relaxed touch-pan-y">
          <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Arsitektur Workflow V11: Zero Approval Gate</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Sistem Om Gio Creative Director dirancang agar menghasilkan 1 Master Prompt video yang bisa langsung ditempel (1-click paste) ke generator video seperti Veo3lite, Kling, HeyGen, Sora, atau Seedance tanpa perlu mengetik ulang shot demi shot.
            </p>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white text-xs">Langkah Eksekusi 6 Detik:</div>

            <div className="p-3 rounded-lg bg-[#050508] border border-amber-500/20 space-y-1">
              <div className="font-semibold text-amber-300">1. Siapkan Aset Referensi</div>
              <div className="text-[11px] text-zinc-400">
                Beri nama file aset Anda secara konsisten: <code className="text-amber-300 font-mono">creator.png</code> (untuk wajah aktor/kreator) dan <code className="text-yellow-400 font-mono">product.jpg</code> (untuk kemasan/produk fisik).
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#050508] border border-amber-500/20 space-y-1">
              <div className="font-semibold text-amber-300">2. Masukkan ke Generator Video</div>
              <div className="text-[11px] text-zinc-400">
                Buka AI Video Generator pilihan Anda (misalnya Veo3, Kling, HeyGen). Unggah kedua file referensi tersebut ke dalam satu sesi yang sama.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#050508] border border-amber-500/20 space-y-1">
              <div className="font-semibold text-amber-300">3. Tempel Master Video Prompt</div>
              <div className="text-[11px] text-zinc-400">
                Salin teks dari kotak <span className="text-white font-semibold">02 • MASTER VIDEO GENERATION PROMPT</span>. Prompt ini sudah mencakup instruksi camera movement, continuous lighting, tag continuity, dan transisi beat 2 detik.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#050508] border border-amber-500/20 space-y-1">
              <div className="font-semibold text-amber-300">4. Generate Video Lengkap Sekali Jalan</div>
              <div className="text-[11px] text-zinc-400">
                Untuk durasi 32s akan dihasilkan tepat 4 klip terhubung (8s x 4). Untuk durasi 64s akan dihasilkan tepat 8 klip terhubung (8s x 8).
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#050508] border border-amber-500/20 space-y-1">
              <div className="font-semibold text-amber-300">5. Posting Bersama Paket Sosial Media</div>
              <div className="text-[11px] text-zinc-400">
                Gunakan naskah caption, hook 3 detik pertama, dan 5 rekomendasi hashtag viral dari kotak <span className="text-white font-semibold">03 • SOCIAL MEDIA CONTENT PACKAGE</span> untuk TikTok, Reels, dan Shorts.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-500/15 bg-black/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-extrabold text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            Mengerti & Mulai Berkarya
          </button>
        </div>
      </div>
    </div>
  );
};
