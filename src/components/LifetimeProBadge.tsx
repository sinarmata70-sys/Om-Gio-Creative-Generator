import React from 'react';
import { Crown, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface LifetimeProBadgeProps {
  variant?: 'button' | 'emblem' | 'compact' | 'sidebar';
  onClick?: () => void;
  className?: string;
  isPro?: boolean;
}

/**
 * Custom vector logo emblem for Lifetime Pro Member
 */
export const LifetimeProLogoSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)] ${className}`}
  >
    <defs>
      {/* Outer Golden Gradient */}
      <linearGradient id="proGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="25%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#FEF08A" />
        <stop offset="75%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>

      {/* Inner Crest Gradient */}
      <linearGradient id="proCrestBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E1B4B" />
        <stop offset="50%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>

      {/* Gold Foil Crown Gradient */}
      <linearGradient id="proCrownGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="30%" stopColor="#FBBF24" />
        <stop offset="70%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>

      {/* Diamond Sparkle Gradient */}
      <linearGradient id="proDiamondCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A5F3FC" />
        <stop offset="50%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>

    {/* Hexagonal Shield Crest Base */}
    <path
      d="M20 2L36 7.5V19.5C36 29 29.2 36.8 20 39.5C10.8 36.8 4 29 4 19.5V7.5L20 2Z"
      fill="url(#proCrestBg)"
      stroke="url(#proGoldBorder)"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />

    {/* Subtle Inner Highlight Line */}
    <path
      d="M20 5L33.5 9.7V19.5C33.5 27.5 27.7 34.2 20 36.6C12.3 34.2 6.5 27.5 6.5 19.5V9.7L20 5Z"
      stroke="#FDE68A"
      strokeOpacity="0.25"
      strokeWidth="0.8"
    />

    {/* Golden Royal Crown */}
    <path
      d="M12 25L10 14L15.5 18.5L20 11.5L24.5 18.5L30 14L28 25H12Z"
      fill="url(#proCrownGold)"
      stroke="#78350F"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />

    {/* Crown Base Band */}
    <rect
      x="12"
      y="24"
      width="16"
      height="3"
      rx="1.2"
      fill="url(#proGoldBorder)"
      stroke="#78350F"
      strokeWidth="0.5"
    />

    {/* Center Diamond Gem */}
    <path
      d="M20 19L22.5 22.5L20 26L17.5 22.5L20 19Z"
      fill="url(#proDiamondCyan)"
      stroke="#E0F2FE"
      strokeWidth="0.5"
    />

    {/* Left & Right Crown Pearls */}
    <circle cx="10" cy="13.5" r="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.4" />
    <circle cx="20" cy="11" r="1.5" fill="#FEF08A" stroke="#78350F" strokeWidth="0.4" />
    <circle cx="30" cy="13.5" r="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.4" />

    {/* Corner Star Sparkles */}
    <path
      d="M20 29L20.8 31.2L23 32L20.8 32.8L20 35L19.2 32.8L17 32L19.2 31.2L20 29Z"
      fill="#FDE68A"
    />
  </svg>
);

export const LifetimeProBadge: React.FC<LifetimeProBadgeProps> = ({
  variant = 'button',
  onClick,
  className = '',
  isPro = true
}) => {
  // VARIANT 1: HEADER BUTTON (LIFETIME PRO MEMBER LOGO BUTTON)
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-slate-950/90 border border-amber-400/60 hover:border-amber-300 p-1 sm:p-1.5 pr-2.5 sm:pr-3.5 flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_22px_rgba(245,158,11,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${className}`}
        title="Status Lisensi: LIFETIME PRO MEMBER (Aktif Permanen)"
      >
        {/* Shimmer light beam effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent pointer-events-none" />

        {/* Logo Emblem Icon */}
        <div className="relative flex items-center justify-center p-0.5 rounded-lg bg-gradient-to-b from-amber-500/20 to-transparent">
          <LifetimeProLogoSvg size={22} className="group-hover:rotate-3 transition-transform" />
          {/* Subtle glowing halo */}
          <span className="absolute inset-0 rounded-lg bg-amber-400/20 blur-xs -z-10 group-hover:bg-amber-400/40 transition-colors" />
        </div>

        {/* Text Container */}
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              LIFETIME PRO
            </span>
            <span className="text-[8px] sm:text-[9px] font-extrabold px-1 py-0.5 rounded bg-amber-400/25 text-amber-200 border border-amber-300/40 uppercase tracking-widest hidden xs:inline-block">
              MEMBER
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] sm:text-[9px] font-semibold text-emerald-300 tracking-tight">
              Akses Permanen Terverifikasi
            </span>
          </div>
        </div>

        {/* Verified Gold Check Icon on right */}
        <div className="ml-0.5 hidden sm:flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300">
          <CheckCircle2 className="w-3 h-3 text-amber-300" />
        </div>
      </button>
    );
  }

  // VARIANT 2: EMBLEM (FOR MODALS & PRO HERO HEADERS)
  if (variant === 'emblem') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-b from-amber-950/70 via-slate-900/90 to-slate-950 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] relative overflow-hidden ${className}`}
      >
        {/* Top Gold Arc Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-amber-400/20 blur-xl pointer-events-none" />

        {/* Big Emblem Logo */}
        <div className="relative">
          <LifetimeProLogoSvg size={54} />
          <div className="absolute -inset-2 bg-amber-500/20 rounded-full blur-md -z-10 animate-pulse" />
        </div>

        {/* Emblem Text */}
        <div className="text-center space-y-0.5">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase bg-gradient-to-r from-yellow-100 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              LIFETIME PRO MEMBER
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-[10px] font-bold text-amber-300/90 uppercase tracking-widest">
            ★ LISENSI RESMI SEUMUR HIDUP ★
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 3: SIDEBAR PROFILE BUTTON
  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 hover:border-amber-400 p-2.5 flex items-center justify-between shadow-lg shadow-amber-950/30 transition-all cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <LifetimeProLogoSvg size={28} />
          <div className="text-left">
            <div className="text-xs font-black text-amber-200 tracking-wide flex items-center gap-1">
              <span>LIFETIME PRO MEMBER</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Lisensi Lynk.id Aktif</span>
            </div>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-[9px] font-extrabold text-amber-300 uppercase tracking-wider">
          VIP
        </div>
      </button>
    );
  }

  // VARIANT 4: COMPACT BADGE
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-950/90 to-yellow-950/90 border border-amber-400/50 text-amber-300 text-xs font-bold shadow-md cursor-pointer hover:border-amber-300 transition-colors ${className}`}
    >
      <LifetimeProLogoSvg size={16} />
      <span className="bg-gradient-to-r from-yellow-200 to-amber-300 bg-clip-text text-transparent font-extrabold">
        LIFETIME PRO MEMBER
      </span>
    </div>
  );
};
