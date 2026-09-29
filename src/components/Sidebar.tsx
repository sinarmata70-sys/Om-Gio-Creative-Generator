import React from 'react';
import { 
  Home, 
  Image, 
  Sparkles, 
  Wrench, 
  Video, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  History,
  BookOpen
} from 'lucide-react';
import { User } from '../types';
import { LifetimeProBadge } from './LifetimeProBadge';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  user: User;
  onOpenProModal: () => void;
  onOpenHowToUse: () => void;
  onOpenHistory: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeTab,
  onSelectTab,
  user,
  onOpenProModal,
  onOpenHowToUse,
  onOpenHistory,
  mobileOpen = false,
  onCloseMobile
}) => {
  const isPro = user.plan === 'lifetime_pro' && user.status === 'active';

  const navItems = [
    { id: 'overview', label: 'Overview', sub: 'Project workspace', icon: Home },
    { id: 'references', label: 'References', sub: 'Product + Character', icon: Image },
    { id: 'creative-direction', label: 'Creative Direction', sub: 'Mode + strategy', icon: Sparkles },
    { id: 'creative-tools', label: 'Creative Tools', sub: 'Hook • Product • Character', icon: Wrench },
    { id: 'production', label: 'Production', sub: 'Duration • Engine • Ratio', icon: Video },
    { id: 'output', label: 'Output', sub: 'Storyboard • Video • Social', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 lg:z-20 border-r border-amber-500/15 bg-[#08080b]/95 backdrop-blur-xl flex flex-col justify-between shrink-0 transition-all duration-300 shadow-xl shadow-black/80 ${
          mobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:w-16' : 'lg:w-64'}`}
      >
        {/* Top Branding & Workspace Nav */}
        <div className="p-3">
          {/* Brand */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center text-black font-black text-sm shrink-0 shadow-lg shadow-amber-500/25 border border-amber-300/40">
                OG
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="overflow-hidden">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 leading-none">
                    OM GIO
                  </div>
                  <div className="text-sm font-black text-white tracking-tight leading-snug">
                    CREATIVE DIRECTOR
                  </div>
                </div>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-neutral-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Workspace Section Header */}
          {(!collapsed || mobileOpen) && (
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400/70 px-2 mb-2">
              WORKSPACE
            </div>
          )}

          {/* Navigation list */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent text-amber-300 font-bold border-l-2 border-amber-400 border-y border-r border-amber-500/30 shadow-sm shadow-amber-500/10'
                      : 'text-zinc-400 hover:text-amber-200 hover:bg-neutral-900/60'
                  }`}
                  title={collapsed && !mobileOpen ? `${item.label} (${item.sub})` : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-amber-400' : 'text-zinc-400 group-hover:text-amber-300'}`} />
                  {(!collapsed || mobileOpen) && (
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold leading-tight truncate">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-zinc-400 leading-none truncate mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Utilities */}
          <div className="mt-4 pt-3 border-t border-amber-500/15 space-y-1">
            <button
              onClick={() => {
                onOpenHowToUse();
                onCloseMobile?.();
              }}
              className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-left text-zinc-400 hover:text-amber-300 hover:bg-neutral-900/60 transition-colors cursor-pointer"
              title="Cara Menggunakan Master Prompt"
            >
              <BookOpen className="w-4 h-4 shrink-0 text-amber-400/80" />
              {(!collapsed || mobileOpen) && (
                <span className="text-xs">Panduan Video Prompt</span>
              )}
            </button>
            <button
              onClick={() => {
                onOpenHistory();
                onCloseMobile?.();
              }}
              className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-left text-zinc-400 hover:text-amber-300 hover:bg-neutral-900/60 transition-colors cursor-pointer"
              title="Riwayat Konsep Tersimpan"
            >
              <History className="w-4 h-4 shrink-0 text-amber-400/80" />
              {(!collapsed || mobileOpen) && (
                <span className="text-xs">Riwayat Konsep</span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Status & User Profile */}
        <div className="p-3 border-t border-amber-500/15 space-y-3">
          {/* Creative Engine Status Indicator */}
          {(!collapsed || mobileOpen) ? (
            <div className="px-2 py-1.5 rounded-md bg-[#0d0d12] border border-amber-500/20 text-[11px]">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
                Creative Engine Ready
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                V11.1 • Premium Architecture
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="Creative Engine Ready - V11.1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
            </div>
          )}

          {/* Lifetime Pro Member Badge in Sidebar */}
          {isPro && (!collapsed || mobileOpen) && (
            <LifetimeProBadge
              variant="sidebar"
              onClick={() => {
                onOpenProModal();
                onCloseMobile?.();
              }}
            />
          )}

          {/* User Workspace Profile Card */}
          <button
            onClick={() => {
              onOpenProModal();
              onCloseMobile?.();
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-lg bg-[#0e0e13] hover:bg-[#15151c] border border-amber-500/20 text-left transition-colors cursor-pointer group shadow-sm shadow-black/40"
            title="Klik untuk melihat status lisensi Lynk.id"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="overflow-hidden flex-1">
                <div className="text-xs font-bold text-zinc-200 truncate group-hover:text-amber-300 transition-colors">
                  {user.name}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {isPro ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-500/40">
                      PRO AKTIF
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      MENUNGGU AKTIVASI
                    </span>
                  )}
                </div>
                <div className="text-[9px] text-zinc-400 truncate mt-0.5">
                  Creative workspace • akun terhubung
                </div>
              </div>
            )}
          </button>

          {/* Collapse Toggle Button (Hidden on Mobile) */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-full py-1.5 px-2 items-center justify-center gap-2 rounded-md bg-neutral-900/60 hover:bg-neutral-800 text-zinc-400 hover:text-amber-200 text-xs transition-colors cursor-pointer border border-neutral-800/80"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
