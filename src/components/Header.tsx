import React from 'react';
import { User } from '../types';
import { Sparkles, Shield, UserCircle, LogOut, CheckCircle2, AlertCircle, Key, CreditCard, Menu } from 'lucide-react';
import { LifetimeProBadge } from './LifetimeProBadge';

interface HeaderProps {
  user: User;
  onOpenProModal: () => void;
  onOpenAdminModal: () => void;
  onOpenPaymentModal: () => void;
  onSwitchUser: () => void;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenProModal,
  onOpenAdminModal,
  onOpenPaymentModal,
  onSwitchUser,
  onToggleMobileMenu
}) => {
  const isPro = user.plan === 'lifetime_pro' && user.status === 'active';
  // Admin button is strictly visible ONLY to authorized admin owner accounts (hidden from all buyers)
  const ADMIN_EMAILS = ['sinarmata70@gmail.com', 'lensx619@gmail.com'];
  const isAdmin = (user.role === 'admin' || ADMIN_EMAILS.includes(user.email.toLowerCase())) && ADMIN_EMAILS.includes(user.email.toLowerCase());

  return (
    <header className="border-b border-amber-500/20 bg-[#08080a]/95 backdrop-blur-xl sticky top-0 z-30 px-3 sm:px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-lg shadow-black/80">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-neutral-900 transition-colors cursor-pointer"
          title="Buka Menu"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 text-black font-black text-xs sm:text-sm shrink-0 border border-amber-300/40">
            OG
          </div>
          <div>
            <h1 className="text-xs sm:text-sm lg:text-base font-bold text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold tracking-tight">Om Gio</span>
              <span className="text-amber-300/90 font-medium hidden sm:inline">Creative Director</span>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-500/35 hidden md:inline-flex shadow-sm shadow-amber-500/10">
                V11
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Admin Badge/Button */}
        {isAdmin && (
          <button
            onClick={onOpenAdminModal}
            className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25 transition-all cursor-pointer shadow-sm shadow-amber-500/10"
            title="Buka Pengaturan Admin & Whitelist Pembeli"
          >
            <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        )}

        {/* Lifetime Pro Member Logo Button */}
        {isPro ? (
          <LifetimeProBadge
            variant="button"
            onClick={onOpenProModal}
          />
        ) : (
          <button
            onClick={onOpenPaymentModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer animate-pulse border border-amber-300/40"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span className="tracking-wide">AKTIFKAN PRO</span>
          </button>
        )}

        {/* User Card */}
        <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-amber-500/20">
          <button
            onClick={onOpenProModal}
            className="flex items-center gap-1.5 text-left hover:bg-neutral-900/80 p-1 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-500/20 flex items-center justify-center text-[10px] sm:text-xs font-bold text-amber-300 border border-amber-500/40">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-semibold text-zinc-200 leading-tight group-hover:text-amber-300 transition-colors">
                {user.name}
              </div>
              <div className="text-[10px] text-zinc-400 leading-none">
                {user.email}
              </div>
            </div>
            {isPro ? (
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-500/40 hidden sm:inline-block">
                AKTIF
              </span>
            ) : (
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 hidden sm:inline-block">
                AKTIVASI
              </span>
            )}
          </button>

          {/* Switch User / Logout button */}
          <button
            onClick={onSwitchUser}
            className="p-1 sm:p-1.5 text-zinc-400 hover:text-amber-300 hover:bg-neutral-900 rounded-md transition-colors cursor-pointer"
            title="Ganti Akun / Masukkan Email"
          >
            <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
