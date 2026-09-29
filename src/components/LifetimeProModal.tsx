import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Crown, 
  ExternalLink, 
  Key, 
  Sparkles, 
  AlertCircle,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { User } from '../types';
import { LifetimeProBadge } from './LifetimeProBadge';

interface LifetimeProModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onOpenPaymentModal: () => void;
  onSwitchUser: () => void;
  onRedeemSuccess: (updatedUser: User) => void;
}

export const LifetimeProModal: React.FC<LifetimeProModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenPaymentModal,
  onSwitchUser,
  onRedeemSuccess
}) => {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const isPro = user.plan === 'lifetime_pro' && user.status === 'active';

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setRedeemLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/payment/redeem-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode.trim(),
          email: user.email
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengklaim kode kupon');
      }

      setSuccessMessage(data.message || 'Lisensi Lifetime PRO berhasil diaktifkan!');
      if (data.user) {
        onRedeemSuccess(data.user);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat validasi kode');
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    try {
      const res = await fetch(`/api/user/status?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.user) {
        onRedeemSuccess(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto touch-pan-y rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black p-5 sm:p-7 text-center space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lifetime Pro Member Emblem Logo */}
        <div className="flex justify-center pt-2">
          <LifetimeProBadge variant="emblem" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-white tracking-tight">
            {isPro ? 'Status: Lifetime PRO Terverifikasi' : 'Status: Menunggu Aktivasi Akun'}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
            {isPro
              ? 'Selamat! Akun Anda memiliki akses penuh seumur hidup ke seluruh 137 format iklan komersial, AI Multimodal Vision, master storyboard 4:3, dan generator video prompt.'
              : 'Aktifkan lisensi resmi untuk membuka akses tak terbatas ke seluruh 137 format iklan komersial, AI Multimodal Vision, master storyboard 4:3, dan generator video prompt.'}
          </p>
        </div>

        {/* User Status Details Box */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Akun Terdaftar:</span>
            <span className="font-semibold text-zinc-200 font-mono">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Metode Aktivasi:</span>
            <span className="font-semibold text-amber-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{isPro ? `Lisensi Resmi Lynk.id / ${user.source}` : 'Belum Terverifikasi'}</span>
            </span>
          </div>
          {user.lynkid && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">ID Lisensi Lynk:</span>
              <span className="font-mono text-[11px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                {user.lynkid}
              </span>
            </div>
          )}
        </div>

        {/* Pro Features Checklist */}
        <div className="text-left space-y-2 text-xs">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Akses Penuh 137 Format Iklan & Konten Video Viral</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>AI Multimodal Vision (Analisis Foto Produk & Pemeran)</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Master Storyboard 4:3 (16 Panel 32s / 32 Panel 64s)</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Master Video Prompt untuk Veo 3, Kling, HeyGen, Sora</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Social Content Distribution Blueprint (TikTok, IG, FB)</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Dedicated Server AI Engine (Langsung Siap Pakai)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {isPro ? (
            <button
              onClick={handleRefreshStatus}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>PERBARUI STATUS LISENSI LYNK.ID</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenPaymentModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-black" />
              <span>BELI AKSES LIFETIME PRO VIA LYNK.ID</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onSwitchUser();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-amber-500/20 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Ganti Akun Google / Masukkan Gmail Baru</span>
          </button>
        </div>

        {/* Redeem Coupon Link & Section */}
        <div className="pt-1">
          {!showCouponInput ? (
            <button
              type="button"
              onClick={() => setShowCouponInput(true)}
              className="text-xs text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto"
            >
              <span>► Punya kode kupon / lisensi manual dari Lynk.id?</span>
            </button>
          ) : (
            <form onSubmit={handleRedeem} className="p-3 rounded-xl bg-black/70 border border-amber-500/20 space-y-2 text-left">
              <label className="text-[11px] font-semibold text-zinc-300 block">
                Masukkan Kode Lisensi / Kupon Lynk.id:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: PRO-LYNK-VIP-2026"
                  className="flex-1 bg-[#09090d] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="submit"
                  disabled={redeemLoading || !couponCode.trim()}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {redeemLoading ? 'Memeriksa...' : 'Klaim'}
                </button>
              </div>

              {errorMessage && (
                <div className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="text-[11px] text-amber-300 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          Tutup Jendela
        </button>
      </div>
    </div>
  );
};
