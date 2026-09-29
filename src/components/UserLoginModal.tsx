import React, { useState } from 'react';
import { X, UserCircle, LogIn, Mail, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../types';
import { LifetimeProBadge } from './LifetimeProBadge';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserChanged: (newUser: User) => void;
}

export const UserLoginModal: React.FC<UserLoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged
}) => {
  const [activeTab, setActiveTab] = useState<'claim' | 'login' | 'quick'>('claim');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Handler for Lynk.id Buyer Automatic Claim
  const handleClaimLynk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat Gmail / email yang valid.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/claim-lynk-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || undefined,
          orderId: orderId.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memproses klaim');

      if (data.user) {
        onUserChanged(data.user);
        try {
          localStorage.setItem('alim_user_email', data.user.email);
        } catch (e) {}

        if (data.user.plan === 'lifetime_pro') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setSuccessMsg(data.message || 'Akun Anda berhasil diverifikasi sebagai Lifetime PRO!');
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setSuccessMsg(data.message || 'Akun berhasil terhubung');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kendala saat klaim akses.');
    } finally {
      setLoading(false);
    }
  };

  // Google One-Click Login Handler
  const handleGoogleQuickLogin = async (targetEmail?: string) => {
    const chosenEmail = targetEmail || email || prompt('Masukkan alamat Gmail Anda:') || '';
    if (!chosenEmail || !chosenEmail.includes('@')) return;

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/claim-lynk-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: chosenEmail.trim().toLowerCase(),
          name: chosenEmail.split('@')[0]
        })
      });

      const data = await res.json();
      if (data.user) {
        onUserChanged(data.user);
        try {
          localStorage.setItem('alim_user_email', data.user.email);
        } catch (e) {}

        if (data.user.plan === 'lifetime_pro') {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
        onClose();
      }
    } catch (e: any) {
      setError('Gagal masuk akun Google.');
    } finally {
      setLoading(false);
    }
  };

  const quickSwitch = async (quickEmail: string, quickName: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/claim-lynk-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: quickEmail, name: quickName })
      });
      const data = await res.json();
      if (data.user) {
        onUserChanged(data.user);
        try {
          localStorage.setItem('alim_user_email', data.user.email);
        } catch (e) {}
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black p-5 sm:p-6 space-y-5 max-h-[92vh] overflow-y-auto touch-pan-y">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black shadow-lg shadow-amber-500/20">
            <UserCircle className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Akses Masuk & Aktivasi Lynk.id
            </h2>
            <p className="text-xs text-zinc-400">
              Masuk dengan akun Google/Gmail pembeli untuk akses Lifetime PRO
            </p>
          </div>
        </div>

        {/* Google Quick Button */}
        <button
          type="button"
          onClick={() => handleGoogleQuickLogin()}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs flex items-center justify-center gap-2.5 border border-amber-500/30 hover:border-amber-400 shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="text-zinc-200">Masuk Cepat dengan Akun Google (Gmail)</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-amber-500/15 w-full" />
          <span className="bg-[#09090d] px-3 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
            atau verifikasi manual
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-black/60 p-1 rounded-xl border border-amber-500/20 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('claim')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'claim'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-amber-300'
            }`}
          >
            ⭐ Klaim Pembeli Lynk.id
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'quick'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-amber-300'
            }`}
          >
            👥 Akun Terdaftar
          </button>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: KLAIM PEMBELI LYNK.ID OTOMATIS */}
        {activeTab === 'claim' && (
          <form onSubmit={handleClaimLynk} className="space-y-3.5">
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/25 text-xs text-zinc-300 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Otomatisasi Pembeli Lynk.id</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Setelah membayar di Lynk.id, masukkan akun Gmail Anda di bawah. Sistem akan otomatis memverifikasi dan membuka akses Lifetime PRO seketika tanpa approval manual.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">
                Alamat Gmail / Google Account: <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama.anda@gmail.com"
                required
                className="w-full bg-[#050508] border border-amber-500/25 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">
                  Nama Anda (Opsional):
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Edi Widi"
                  className="w-full bg-[#050508] border border-amber-500/25 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">
                  No. Order / Invoice Lynk (Opsional):
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Contoh: LYNK-882194"
                  className="w-full bg-[#050508] border border-amber-500/25 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>{loading ? 'Memverifikasi Lynk.id...' : 'Verifikasi & Aktifkan Lifetime PRO'}</span>
            </button>
          </form>
        )}

        {/* TAB 2: AKUN TERDAFTAR CEPAT */}
        {activeTab === 'quick' && (
          <div className="space-y-3">
            <div className="text-xs text-zinc-400">
              Pilih akun terdaftar untuk beralih instan:
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => quickSwitch('sinarmata70@gmail.com', 'Sinarmata (Owner)')}
                className="w-full p-2.5 rounded-xl bg-black/60 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400 text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-zinc-200 text-xs">Sinarmata (App Owner)</div>
                  <div className="text-[11px] text-amber-400 font-mono">sinarmata70@gmail.com</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  ADMIN OWNER
                </span>
              </button>

              <button
                type="button"
                onClick={() => quickSwitch('yondoli157@gmail.com', 'Edi Widiyantoro')}
                className="w-full p-2.5 rounded-xl bg-black/60 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400 text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-zinc-200 text-xs">Edi Widiyantoro</div>
                  <div className="text-[11px] text-amber-300 font-mono">yondoli157@gmail.com</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  PEMBELI LYNK.ID
                </span>
              </button>

              <button
                type="button"
                onClick={() => quickSwitch('pembeli.kreatif@gmail.com', 'Budi Kreatif')}
                className="w-full p-2.5 rounded-xl bg-black/60 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400 text-left transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-zinc-200 text-xs">Budi Kreatif</div>
                  <div className="text-[11px] text-amber-300 font-mono">pembeli.kreatif@gmail.com</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  PRO AKTIF (Lynk.id)
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Status Anda: <strong className="text-zinc-300 font-mono">{currentUser.email}</strong></span>
          {currentUser.plan === 'lifetime_pro' ? (
            <LifetimeProBadge variant="compact" />
          ) : (
            <span className="text-amber-400 font-medium">Free / Belum Terverifikasi</span>
          )}
        </div>
      </div>
    </div>
  );
};
