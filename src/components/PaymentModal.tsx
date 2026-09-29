import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  Ticket, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onPaymentSuccess: (user: User) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onPaymentSuccess
}) => {
  const [activeMethod, setActiveMethod] = useState<'lynk' | 'voucher'>('lynk');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      createOrder();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const createOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name,
          method: 'lynk'
        })
      });
      const data = await res.json();
      setOrderData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    setVerifying(true);
    setAlert(null);

    try {
      // Check user status directly from server
      const res = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name
        })
      });
      const data = await res.json();
      
      if (data.isPro && data.user) {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 }
        });
        setAlert({ 
          type: 'success', 
          message: 'Status Terkonfirmasi! Akun Anda telah aktif sebagai Lifetime PRO.' 
        });
        onPaymentSuccess(data.user);
        setTimeout(() => onClose(), 2000);
      } else {
        setAlert({
          type: 'error',
          message: 'Pembayaran belum terdeteksi di sistem Lynk.id. Jika baru saja membayar, tunggu 1-2 menit lalu klik periksa kembali.'
        });
      }
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message || 'Gagal memeriksa status pembayaran' });
    } finally {
      setVerifying(false);
    }
  };

  const handleRedeemVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    setVerifying(true);
    setAlert(null);

    try {
      const res = await fetch('/api/payment/redeem-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: voucherCode.trim(),
          email: currentUser.email
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kode lisensi tidak valid atau sudah digunakan.');

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setAlert({ type: 'success', message: 'Selamat! Lisensi Lifetime PRO Anda berhasil diaktifkan.' });
      if (data.user) {
        onPaymentSuccess(data.user);
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message });
    } finally {
      setVerifying(false);
    }
  };

  const lynkDestination = orderData?.lynkUrl || 'https://lynk.id/creative/pro-lifetime';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-black/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Checkout Lifetime PRO
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-yellow-400 text-black">
                  PROMO LYNK.ID
                </span>
              </div>
              <div className="text-xs text-zinc-400">
                Akses Penuh Seumur Hidup • Otomatis Aktif Melalui Lynk.id
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

        {/* Pricing Summary Card */}
        <div className="px-5 pt-4 pb-2">
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-black to-amber-950/20 border border-amber-500/30 flex items-center justify-between flex-wrap gap-3 shadow-lg shadow-black/40">
            <div>
              <div className="text-xs text-zinc-400">Paket Lisensi Resmi:</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Om Gio Creative Director — Lifetime Pro</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">
                Sekali bayar untuk selamanya • Tanpa biaya langganan bulanan
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-zinc-400 font-medium">Harga Promo & Diskon:</div>
              <div className="text-sm sm:text-base font-black text-amber-400 tracking-tight flex items-center justify-end gap-1 mt-0.5">
                <span>Sesuai Halaman Lynk.id</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase border border-amber-500/30">
                Promo & Kupon di Lynk.id
              </span>
            </div>
          </div>
        </div>

        {/* Method Toggle Buttons */}
        <div className="px-5 pt-2">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveMethod('lynk')}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeMethod === 'lynk'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'bg-black/60 border-amber-500/20 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Pembayaran via Lynk.id</span>
            </button>

            <button
              onClick={() => setActiveMethod('voucher')}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeMethod === 'voucher'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'bg-black/60 border-amber-500/20 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Klaim Kode Lisensi</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {alert && (
          <div
            className={`mx-5 mt-3 p-3 rounded-xl text-xs flex items-center justify-between ${
              alert.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-950/40 border border-red-500/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {alert.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{alert.message}</span>
            </div>
            <button onClick={() => setAlert(null)} className="text-zinc-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* LYNK.ID CHECKOUT */}
          {activeMethod === 'lynk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/25 space-y-3.5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="p-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <Zap className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-bold text-white">
                    Aktivasi Otomatis Real-Time Melalui Lynk.id
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
                  Klik tombol di bawah untuk menyelesaikan pembayaran di halaman resmi Lynk.id. Akun Gmail Anda (<strong className="text-amber-300 font-mono">{currentUser.email}</strong>) akan otomatis aktif sebagai <strong className="text-white">Lifetime PRO</strong> seketika setelah pembayaran berhasil.
                </p>

                {/* Primary Gold Action Button */}
                <div className="pt-2">
                  <a
                    href={lynkDestination}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs tracking-wider shadow-xl shadow-amber-500/25 active:scale-98 transition-all cursor-pointer border border-amber-300/40"
                  >
                    <span>BAYAR VIA LYNK.ID SEKARANG</span>
                    <ExternalLink className="w-4 h-4 text-black" />
                  </a>
                </div>

                {/* Lynk.id Features / Badges */}
                <div className="p-3 rounded-lg bg-[#050508] border border-amber-500/15 text-left text-xs space-y-2">
                  <div className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Metode Lengkap yang Didukung Lynk.id:</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-relaxed pl-3.5">
                    • <strong>QRIS Instan</strong>: Semua E-Wallet (GoPay, OVO, DANA, ShopeePay, LinkAja) & M-Banking<br />
                    • <strong>Virtual Account Otomatis</strong>: BCA, Mandiri, BRI, BNI, Permata<br />
                    • <strong>Kartu Kredit / Debit</strong> & PayLater
                  </div>
                </div>

                {/* Secondary Check Status Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleCheckStatus}
                    disabled={verifying}
                    className="w-full py-2 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-zinc-300 hover:text-amber-300 border border-amber-500/20 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{verifying ? 'Memeriksa Status Lynk.id...' : 'Saya Sudah Bayar di Lynk.id (Cek Aktivasi)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* KODE LISENSI KUPON */}
          {activeMethod === 'voucher' && (
            <form onSubmit={handleRedeemVoucher} className="space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/25 space-y-3">
                <div className="text-xs font-semibold text-zinc-200">
                  Aktivasi Menggunakan Kode Lisensi / Kupon Lynk.id
                </div>
                <p className="text-xs text-zinc-400">
                  Jika Anda membeli melalui bundling atau mendapatkan kode lisensi langsung dari Lynk.id, masukkan kode di bawah ini untuk aktivasi instan:
                </p>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400">Kode Lisensi:</label>
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: PRO-LYNK-VIP-2026"
                    required
                    className="w-full bg-[#050508] border border-amber-500/25 rounded-lg p-2.5 text-xs text-white uppercase font-mono tracking-wider placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={verifying || !voucherCode.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>{verifying ? 'Memvalidasi Kode...' : 'Klaim & Aktifkan Lisensi'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-3 border-t border-amber-500/15 bg-black/90 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Garansi Akses Lifetime Penuh • Pembayaran Resmi & Terproteksi via Lynk.id</span>
        </div>
      </div>
    </div>
  );
};
