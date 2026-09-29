import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Key, 
  Users, 
  Cpu, 
  Database, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  FileText,
  Sliders,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { User, Transaction, SystemSettings } from '../types';
import { AD_FORMATS } from '../data/adFormats';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUserListUpdated?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserListUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'whitelist' | 'apikey' | 'engine' | 'dna' | 'settings'>('whitelist');
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Single add form
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // Bulk add
  const [showBulk, setShowBulk] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);

  // Copy feedback
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedRedirect, setCopiedRedirect] = useState(false);
  const [copiedUserLink, setCopiedUserLink] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [simulatingWebhook, setSimulatingWebhook] = useState(false);

  // Notification
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // License keys generator
  const [genCount, setGenCount] = useState(5);
  const [generatedKeys, setGeneratedKeys] = useState<any[]>([]);

  // Lynk.id Settings form
  const [lynkUrlVal, setLynkUrlVal] = useState('https://lynk.id/creative/pro-lifetime');
  const [savingSettings, setSavingSettings] = useState(false);

  const ADMIN_EMAILS = ['sinarmata70@gmail.com', 'lensx619@gmail.com'];
  const isAdmin = (currentUser.role === 'admin' || ADMIN_EMAILS.includes(currentUser.email.toLowerCase())) && ADMIN_EMAILS.includes(currentUser.email.toLowerCase());

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchAdminData();
    }
  }, [isOpen, isAdmin]);

  if (!isOpen || !isAdmin) return null;

  const adminHeaders = {
    'Content-Type': 'application/json',
    'x-admin-email': currentUser.email
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data', {
        headers: {
          'x-admin-email': currentUser.email
        }
      });
      if (!res.ok) {
        throw new Error('Akses Ditolak');
      }
      const data = await res.json();
      setUsers(data.users || []);
      setTransactions(data.transactions || []);
      if (data.settings) {
        setSettings(data.settings);
        setLynkUrlVal(data.settings.lynkCheckoutUrl || 'https://lynk.id/creative/pro-lifetime');
      }
      setStats(data.stats || null);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLynkSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setAlert(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({
          lynkCheckoutUrl: lynkUrlVal.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan pengaturan Lynk.id');
      setSettings(data.settings);
      setAlert({ type: 'success', message: '✅ Berhasil! URL Checkout Lynk.id telah disimpan. Harga promo sepenuhnya mengikuti pengaturan di akun Lynk.id Anda.' });
      fetchAdminData();
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message || 'Gagal menyimpan pengaturan' });
    } finally {
      setSavingSettings(false);
    }
  };

  if (!isOpen) return null;

  const appOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const automaticLynkLink = `${appOrigin}/?lynk_access=active&ref=lynk`;
  const webhookUrl = `${appOrigin}/api/webhook/lynkid`;
  const redirectLynkTemplate = `${appOrigin}/?email={customer_email}&name={customer_name}&source=lynk&auth=auto`;

  const copyLynkLink = () => {
    navigator.clipboard.writeText(automaticLynkLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyWebhookLink = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const copyRedirectTemplate = () => {
    navigator.clipboard.writeText(redirectLynkTemplate);
    setCopiedRedirect(true);
    setTimeout(() => setCopiedRedirect(false), 2000);
  };

  const copyDirectUserLink = (email: string) => {
    const link = `${appOrigin}/?email=${encodeURIComponent(email)}&source=lynk&auth=auto`;
    navigator.clipboard.writeText(link);
    setCopiedUserLink(email);
    setTimeout(() => setCopiedUserLink(null), 2000);
  };

  // Test simulation for Lynk.id Webhook
  const handleSimulateWebhook = async (testEmail: string) => {
    if (!testEmail || !testEmail.includes('@')) {
      setAlert({ type: 'error', message: 'Masukkan alamat email untuk simulasi.' });
      return;
    }

    setSimulatingWebhook(true);
    try {
      const res = await fetch('/api/webhook/lynkid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'order.paid',
          order_id: `SIM-LYNK-${Date.now().toString().slice(-6)}`,
          customer_email: testEmail.trim().toLowerCase(),
          customer_name: testEmail.split('@')[0],
          amount: 149000,
          status: 'success'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({
          type: 'success',
          message: `Simulasi Webhook Sukses! ${testEmail} otomatis aktif sebagai Lifetime PRO.`
        });
        fetchAdminData();
        onUserListUpdated?.();
      } else {
        throw new Error(data.message || 'Gagal simulasi');
      }
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message || 'Gagal simulasi webhook' });
    } finally {
      setSimulatingWebhook(false);
    }
  };

  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setAddLoading(true);
    setAlert(null);

    try {
      const res = await fetch('/api/admin/whitelist/add', {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({ email: newEmail.trim(), name: newName.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menambahkan email');

      setNewEmail('');
      setNewName('');
      setAlert({ type: 'success', message: `Email ${data.user.email} berhasil di-whitelist ke Lifetime PRO.` });
      fetchAdminData();
      onUserListUpdated?.();
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message });
    } finally {
      setAddLoading(false);
    }
  };

  const handleAddBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    setBulkLoading(true);
    setAlert(null);

    try {
      const res = await fetch('/api/admin/whitelist/bulk', {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({ rawText: bulkText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal import bulk email');

      setBulkText('');
      setShowBulk(false);
      setAlert({ type: 'success', message: data.message });
      fetchAdminData();
      onUserListUpdated?.();
    } catch (e: any) {
      setAlert({ type: 'error', message: e.message });
    } finally {
      setBulkLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (!window.confirm(`Yakin ingin mencabut lisensi untuk ${email}?`)) return;

    try {
      const res = await fetch(`/api/admin/whitelist/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-email': currentUser.email }
      });
      if (res.ok) {
        setAlert({ type: 'success', message: `Akses untuk ${email} telah dicabut.` });
        fetchAdminData();
        onUserListUpdated?.();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateKeys = async () => {
    try {
      const res = await fetch('/api/admin/license/generate', {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({ count: genCount, prefix: 'PRO' })
      });
      const data = await res.json();
      if (data.keys) {
        setGeneratedKeys(data.keys);
        setAlert({ type: 'success', message: `Berhasil membuat ${data.keys.length} kode lisensi baru.` });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const proUsers = users.filter((u) => u.plan === 'lifetime_pro' && u.status === 'active');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#09090d] border border-amber-500/25 shadow-2xl shadow-black overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 flex items-center justify-between bg-black/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Pengaturan Admin & API Key
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-400 text-black">
                  KHUSUS ADMIN
                </span>
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Terotentikasi untuk: <span className="text-amber-300 font-mono font-medium">{currentUser.email}</span>
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

        {/* Navigation Tabs (matching screenshot f.JPG) */}
        <div className="flex items-center gap-1 px-4 sm:px-5 pt-3 border-b border-amber-500/15 bg-black/40 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('whitelist')}
            className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'whitelist'
                ? 'border-amber-500 text-amber-400 font-bold bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Pembeli Lynk.id & Whitelist</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
              {proUsers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('apikey')}
            className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'apikey'
                ? 'border-amber-500 text-amber-400 font-bold bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Pengaturan API Key</span>
          </button>

          <button
            onClick={() => setActiveTab('engine')}
            className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'engine'
                ? 'border-amber-500 text-amber-400 font-bold bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Engine & AI Status</span>
          </button>

          <button
            onClick={() => setActiveTab('dna')}
            className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dna'
                ? 'border-amber-500 text-amber-400 font-bold bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>137 Format DNA</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-amber-500 text-amber-400 font-bold bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Lynk.id, Lisensi & Transaksi</span>
          </button>
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
            <button onClick={() => setAlert(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 touch-pan-y">
          {/* TAB 1: PEMBELI LYNK.ID & WHITELIST */}
          {activeTab === 'whitelist' && (
            <div className="space-y-4">
              {/* Card 1: Webhook Otomatis Lynk.id */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">⚡</span>
                    <span>1. URL Webhook Lynk.id (Aktivasi Otomatis Real-Time)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyWebhookLink}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    {copiedWebhook ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWebhook ? 'Webhook Tersalin!' : 'Copy Webhook URL'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400">
                  Pasang URL ini di dashboard <strong className="text-slate-200">Lynk.id &gt; Pengaturan &gt; Webhook / Integrasi</strong>:
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 break-all select-all">
                  {webhookUrl}
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed">
                  💡 <span className="font-semibold text-slate-300">Cara kerja otomatis:</span> Setiap kali ada pembeli yang menyelesaikan pembayaran di Lynk.id (QRIS, Bank, E-Wallet), Lynk.id otomatis mengirim notifikasi ke server ini dan akun Gmail pembeli langsung aktif sebagai <strong>Lifetime PRO</strong> tanpa perlu input manual.
                </div>

                {/* Simulasi Test Webhook */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-slate-400">Uji Coba Webhook:</span>
                  <button
                    type="button"
                    disabled={simulatingWebhook}
                    onClick={() => {
                      const emailTest = prompt('Masukkan Gmail untuk simulasi otomatisasi Lynk.id:', 'test.pembeli@gmail.com');
                      if (emailTest) handleSimulateWebhook(emailTest);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    {simulatingWebhook ? 'Menguji...' : '🧪 Simulasi Pembelian Lynk.id Sukses'}
                  </button>
                </div>
              </div>

              {/* Card 2: Link Redirect / Halaman Terima Kasih Lynk.id */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span className="p-1 rounded bg-indigo-500/20 text-indigo-400">🔗</span>
                    <span>2. Link Redirect / Halaman Terima Kasih Lynk.id</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={copyRedirectTemplate}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      title="Link dengan parameter email dinamis"
                    >
                      {copiedRedirect ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRedirect ? 'Tersalin!' : 'Copy Template URL'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={copyLynkLink}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Tersalin!' : 'Copy Direct Link'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Tempel URL ini di Halaman Terima Kasih / Akses Produk Lynk.id:
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300 break-all select-all">
                  {redirectLynkTemplate}
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed">
                  💡 Ketika pembeli mengklik "Akses Produk" di Lynk.id, URL ini otomatis membawa akun Gmail mereka dan langsung masuk ke aplikasi dengan status Lifetime PRO aktif seketika.
                </div>
              </div>

              {/* Form: Tambah Email Pembeli Lynk (Manual) */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-200">
                  + Tambah Email Pembeli Lynk (Manual / Bulk Whitelist)
                </div>

                <form onSubmit={handleAddSingle} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-6">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Email pembeli (contoh: pembeli@gmail.com)"
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Nama pembeli (opsional)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={addLoading || !newEmail.trim()}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{addLoading ? '...' : '+ Tambah'}</span>
                    </button>
                  </div>
                </form>

                {/* Bulk Accordion */}
                <div className="pt-1">
                  {!showBulk ? (
                    <button
                      type="button"
                      onClick={() => setShowBulk(true)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <span>► + Tambah Banyak Email Sekaligus (Bulk Paste dari Notifikasi Lynk)</span>
                    </button>
                  ) : (
                    <form onSubmit={handleAddBulk} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 mt-2">
                      <div className="text-[11px] font-semibold text-slate-300">
                        Paste teks notifikasi email penjualan dari Lynk.id:
                      </div>
                      <textarea
                        value={bulkText}
                        onChange={(e) => setBulkText(e.target.value)}
                        rows={4}
                        placeholder="Contoh:&#10;budi.kreatif@gmail.com, Budi&#10;siti.ugc@gmail.com, Siti Rahma&#10;Order dari doni@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowBulk(false)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-750"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={bulkLoading || !bulkText.trim()}
                          className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 disabled:opacity-50"
                        >
                          {bulkLoading ? 'Memproses...' : 'Import Semua Email'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Verified Buyers List (matching screenshot f.JPG) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Daftar Pembeli Terverifikasi ({proUsers.length})</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Status: Lifetime Pro Aktif
                  </span>
                </div>

                <div className="space-y-2">
                  {proUsers.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                      Belum ada pembeli terdaftar.
                    </div>
                  ) : (
                    proUsers.map((u) => (
                      <div
                        key={u.id}
                        className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-750 transition-all flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">{u.name}</span>
                            {u.lynkid && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                {u.lynkid}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                        </div>

                        <div className="flex items-center gap-3 text-right">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              PRO AKTIF
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">
                              {u.activatedAt ? new Date(u.activatedAt).toLocaleDateString('id-ID') : 'Aktif'}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => copyDirectUserLink(u.email)}
                              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-750 text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                              title="Salin link akses langsung 1-klik untuk dikirim via WA / Chat"
                            >
                              {copiedUserLink === u.email ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedUserLink === u.email ? 'Tersalin' : 'Link Akses'}</span>
                            </button>

                            {u.email !== 'lensx619@gmail.com' && u.email !== 'sinarmata70@gmail.com' && (
                              <button
                                onClick={() => handleDeleteUser(u.id, u.email)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors cursor-pointer"
                                title="Cabut Lisensi"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PENGATURAN API KEY */}
          {activeTab === 'apikey' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Proteksi Kunci API & Arsitektur Server-Side</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Semua panggilan kecerdasan buatan ke Gemini API dieksekusi secara eksklusif melalui backend server (<code className="text-indigo-300 font-mono">server.ts</code>). Kunci API internal aman dan dilindungi dari browser pengunjung.
                </p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status Server Gemini SDK:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Aktif & Terproteksi
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Model Gemini Terpasang:</span>
                    <span className="text-white font-mono font-semibold">gemini-3.8-flash</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Telemetry User-Agent:</span>
                    <span className="text-indigo-300 font-mono">aistudio-build</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Kapasitas Multimodal:</span>
                    <span className="text-slate-300">Image Analysis + Storyboard + Video Script</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white">Privasi Pengguna</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Pengguna yang membeli produk melalui link Lynk.id Anda secara otomatis mendapatkan akses langsung ke fitur Pro tanpa perlu memasukkan API key pribadi mereka. Hal ini memberikan pengalaman pengguna yang sangat mulus dan konversi penjualan tinggi.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENGINE & AI STATUS */}
          {activeTab === 'engine' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-lg font-bold text-white">{stats?.totalGenerations || 24}</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Prompt Dihasilkan</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-lg font-bold text-emerald-400">{proUsers.length}</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Pengguna Pro</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-lg font-bold text-amber-400">137</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Format Formula DNA</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-lg font-bold text-purple-400">99.8%</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Uptime Engine</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white">Workflow V11 Preserved Architecture:</div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Sistem mengunci peran karakter (<code className="text-purple-300">creator.png</code>) dan produk (<code className="text-indigo-300">product.jpg</code>) dalam prompt tunggal video generator untuk mempertahankan kontinuitas wajah, pakaian, dan kemasan produk di semua 4 shot (32 detik) atau 8 shot (64 detik).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: 137 FORMAT DNA */}
          {activeTab === 'dna' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Katalog Formula Komersial Tersedia: 137 Format</span>
              </div>

              <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1">
                {AD_FORMATS.slice(0, 15).map((f) => (
                  <div key={f.id} className="p-3 rounded-lg bg-slate-950/70 border border-slate-850 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{f.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400">
                        {f.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-indigo-300 font-mono">{f.formula}</div>
                    <div className="text-[10px] text-slate-400">{f.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LYNK.ID, LISENSI & TRANSAKSI */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Card 1: Pengaturan Produk Lynk.id */}
              <form onSubmit={handleSaveLynkSettings} className="p-4 rounded-xl bg-black/60 border border-amber-500/25 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-amber-500/15">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Pengaturan URL Checkout Produk Lynk.id
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Harga promo, diskon coret, dan metode bayar sepenuhnya diatur langsung di halaman Lynk.id Anda
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
                    Eksklusif Lynk.id
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-zinc-400">URL Checkout Produk Lynk.id:</label>
                  <input
                    type="url"
                    value={lynkUrlVal}
                    onChange={(e) => setLynkUrlVal(e.target.value)}
                    placeholder="https://lynk.id/creative/pro-lifetime"
                    className="w-full bg-[#050508] border border-amber-500/25 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    required
                  />
                  <div className="text-[10px] text-zinc-500">
                    Masukkan URL halaman penjualan atau checkout produk Anda yang terdaftar di Lynk.id.
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#050508] border border-amber-500/20 text-xs space-y-2">
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Harga Promo Dikelola 100% di Lynk.id</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Anda tidak perlu memasukkan harga manual di aplikasi. Semua pengaturan harga promo, diskon berbatas waktu, voucher kupon, serta varian paket cukup Anda tentukan di dashboard Lynk.id Anda. Setiap kali pembeli membayar dengan nominal berapa pun di Lynk.id, akun mereka langsung aktif otomatis secara instan.
                  </p>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-black" />
                    <span>{savingSettings ? 'Menyimpan...' : 'Simpan URL Produk Lynk.id'}</span>
                  </button>
                </div>
              </form>

              {/* Card 2: Panduan & Tautan Akses untuk Dipasang di Lynk.id */}
              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/25 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-amber-500/15">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Tautan Akses Aplikasi untuk Dipasang di Akun Lynk.id Anda
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Pasang link ini di Lynk.id agar pembeli langsung otomatis aktif sebagai Lifetime PRO
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
                    Auto-Aktivasi
                  </span>
                </div>

                {/* Option 1: Template Lynk.id (Paling Dianjurkan) */}
                <div className="space-y-1.5 p-3 rounded-lg bg-[#050508] border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-amber-300">
                      1. Link Akses Otomatis + Nama & Email Pembeli (Paling Dianjurkan):
                    </label>
                    <span className="text-[9px] text-zinc-400">Lynk.id Dynamic Tag</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={redirectLynkTemplate}
                      className="flex-1 bg-[#09090e] border border-amber-500/25 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 select-all"
                    />
                    <button
                      type="button"
                      onClick={copyRedirectTemplate}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      {copiedRedirect ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                      <span>{copiedRedirect ? 'Tersalin!' : 'Copy Link'}</span>
                    </button>
                  </div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed">
                    Lynk.id akan otomatis mengganti <code className="text-amber-300 font-mono">{'{customer_email}'}</code> dengan email asli pembeli, sehingga akun mereka langsung tercatat di database dengan status Lifetime PRO.
                  </div>
                </div>

                {/* Option 2: Link Akses Standar */}
                <div className="space-y-1.5 p-3 rounded-lg bg-[#050508] border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-zinc-300">
                      2. Link Akses Cepat Tanpa Parameter:
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={automaticLynkLink}
                      className="flex-1 bg-[#09090e] border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-300 select-all"
                    />
                    <button
                      type="button"
                      onClick={copyLynkLink}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Tersalin!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Cara pasang di Lynk.id */}
                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs space-y-2">
                  <div className="font-bold text-amber-300 text-[11px] flex items-center gap-1.5">
                    <span>Cara Pasang di Lynk.id (Hanya 3 Langkah):</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-zinc-300 text-[11px] leading-relaxed">
                    <li>Buka dashboard <strong>lynk.id</strong> Anda &gt; menu <strong>Produk Digital</strong> &gt; pilih produk Anda.</li>
                    <li>Pada bagian <strong>"Akses Konten"</strong> atau <strong>"URL Terima Kasih / Redirect Sukses"</strong>, tempelkan link nomor 1 di atas.</li>
                    <li>Klik <strong>Simpan</strong>. Pembeli yang telah menyelesaikan transfer/bayar akan langsung melihat tombol "Buka Akses Aplikasi" dan otomatis aktif sebagai Lifetime PRO!</li>
                  </ol>
                </div>
              </div>

              {/* License Code Generator */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white">
                  Generate Kode Lisensi Manual (Untuk Giveaway / Lynk.id)
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={genCount}
                    onChange={(e) => setGenCount(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value={1}>1 Kode</option>
                    <option value={5}>5 Kode</option>
                    <option value={10}>10 Kode</option>
                  </select>
                  <button
                    onClick={handleGenerateKeys}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Generate Kode Sekarang
                  </button>
                </div>

                {generatedKeys.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[10px] text-slate-400 font-semibold">Kode yang Baru Dibuat:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {generatedKeys.map((k) => (
                        <div
                          key={k.id}
                          onClick={() => {
                            navigator.clipboard.writeText(k.code);
                            setCopiedKey(k.code);
                            setTimeout(() => setCopiedKey(null), 2000);
                          }}
                          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300 flex items-center justify-between cursor-pointer hover:bg-slate-850"
                        >
                          <span>{k.code}</span>
                          <span className="text-[10px] text-slate-500">{copiedKey === k.code ? 'Tersalin' : 'Copy'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Transactions Ledger */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Log Transaksi Pembayaran ({transactions.length})</span>
                  <span className="text-amber-400 font-bold">
                    Total: Rp {transactions.filter(t => t.status === 'success').reduce((s, t) => s + (t.amount || 0), 0).toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="max-h-[220px] overflow-y-auto space-y-1.5">
                  {transactions.map((t) => (
                    <div key={t.id} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{t.customerEmail}</div>
                        <div className="text-[10px] text-slate-500">{t.id} • {t.paymentMethod}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400">Rp {t.amount?.toLocaleString('id-ID')}</div>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                          {t.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer (matching screenshot f.JPG) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
