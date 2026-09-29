import fs from 'fs';
import path from 'path';
import { User, Transaction, LicenseKey, SystemSettings, GeneratedConcept } from '../types';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export const ADMIN_EMAILS = [
  'sinarmata70@gmail.com',
  'lensx619@gmail.com'
];

export interface DatabaseSchema {
  users: User[];
  transactions: Transaction[];
  licenseKeys: LicenseKey[];
  conceptHistory: GeneratedConcept[];
  settings: SystemSettings;
  stats: {
    totalGenerations: number;
    lastUpdated: string;
  };
}

const DEFAULT_SETTINGS: SystemSettings = {
  adminEmail: 'lensx619@gmail.com',
  lynkCheckoutUrl: 'https://lynk.id/creative/pro-lifetime',
  qrisMerchantName: 'OM GIO CREATIVE PRO',
  qrisNmid: 'ID1020083921029',
  priceIDR: 149000,
  discountPriceIDR: 299000,
  bankAccount: {
    bank: 'BCA (Bank Central Asia)',
    accountNumber: '8830-192-3021',
    accountHolder: 'OM GIO CREATIVE MEDIA'
  },
  autoApproveLynk: true
};

const INITIAL_DB: DatabaseSchema = {
  users: [
    {
      id: 'usr-admin-1',
      email: 'lensx619@gmail.com',
      name: 'Admin Utama (Lens X)',
      role: 'admin',
      plan: 'lifetime_pro',
      lynkid: 'LYNK-ADMIN-01',
      activatedAt: '2026-09-01T10:00:00.000Z',
      source: 'manual_admin',
      status: 'active',
      notes: 'Super Admin Creator'
    },
    {
      id: 'usr-admin-2',
      email: 'sinarmata70@gmail.com',
      name: 'Sinarmata (App Owner)',
      role: 'admin',
      plan: 'lifetime_pro',
      lynkid: 'LYNK-OWNER-02',
      activatedAt: '2026-09-20T08:30:00.000Z',
      source: 'manual_admin',
      status: 'active',
      notes: 'AI Studio Workspace Owner'
    },
    {
      id: 'usr-budi-kreatif',
      email: 'pembeli.kreatif@gmail.com',
      name: 'Budi Kreatif',
      role: 'user',
      plan: 'lifetime_pro',
      lynkid: 'LYNK-882194',
      activatedAt: '2026-09-28T14:22:10.000Z',
      source: 'lynk',
      status: 'active',
      notes: 'Order Lynk.id #882194'
    },
    {
      id: 'usr-siti-rahma',
      email: 'siti.ugc@gmail.com',
      name: 'Siti Rahma',
      role: 'user',
      plan: 'lifetime_pro',
      lynkid: 'LYNK-994102',
      activatedAt: '2026-09-28T16:05:44.000Z',
      source: 'lynk',
      status: 'active',
      notes: 'Order Lynk.id #994102'
    },
    {
      id: 'usr-edi-widi',
      email: 'yondoli157@gmail.com',
      name: 'Edi Widiyantoro',
      role: 'user',
      plan: 'free',
      lynkid: 'LYNK-PENDING-157',
      activatedAt: '2026-09-29T08:00:00.000Z',
      source: 'lynk',
      status: 'pending',
      notes: 'Akun baru menunggu aktivasi lisensi'
    }
  ],
  transactions: [
    {
      id: 'TRX-LYNK-882194',
      customerEmail: 'pembeli.kreatif@gmail.com',
      customerName: 'Budi Kreatif',
      amount: 149000,
      currency: 'IDR',
      status: 'success',
      paymentMethod: 'lynk',
      paymentCode: 'LYNK-882194',
      createdAt: '2026-09-28T14:20:00.000Z',
      completedAt: '2026-09-28T14:22:10.000Z'
    },
    {
      id: 'TRX-LYNK-994102',
      customerEmail: 'siti.ugc@gmail.com',
      customerName: 'Siti Rahma',
      amount: 149000,
      currency: 'IDR',
      status: 'success',
      paymentMethod: 'lynk',
      paymentCode: 'LYNK-994102',
      createdAt: '2026-09-28T16:00:00.000Z',
      completedAt: '2026-09-28T16:05:44.000Z'
    }
  ],
  licenseKeys: [
    {
      id: 'lic-1',
      code: 'PRO-LYNK-VIP-2026',
      plan: 'lifetime_pro',
      status: 'active',
      createdAt: '2026-09-20T00:00:00.000Z'
    },
    {
      id: 'lic-2',
      code: 'ALIM-DIRECTOR-LIFETIME',
      plan: 'lifetime_pro',
      status: 'active',
      createdAt: '2026-09-20T00:00:00.000Z'
    },
    {
      id: 'lic-3',
      code: 'V11-MASTER-ACCESS-77',
      plan: 'lifetime_pro',
      status: 'active',
      createdAt: '2026-09-20T00:00:00.000Z'
    },
    {
      id: 'lic-4',
      code: 'LYNK-CREATIVE-9921',
      plan: 'lifetime_pro',
      status: 'active',
      createdAt: '2026-09-20T00:00:00.000Z'
    }
  ],
  conceptHistory: [],
  settings: DEFAULT_SETTINGS,
  stats: {
    totalGenerations: 24,
    lastUpdated: new Date().toISOString()
  }
};

class DatabaseManager {
  private db: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.db = this.loadDatabase();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (err) {
        console.error('Failed to create data directory:', err);
      }
    }
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Merge with initial db structure in case fields were added
        return {
          ...INITIAL_DB,
          ...parsed,
          settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
          users: parsed.users?.length ? parsed.users : INITIAL_DB.users,
          licenseKeys: parsed.licenseKeys?.length ? parsed.licenseKeys : INITIAL_DB.licenseKeys,
        };
      }
    } catch (e) {
      console.warn('Could not read existing database. Initializing default:', e);
    }
    this.saveDatabase(INITIAL_DB);
    return INITIAL_DB;
  }

  private saveDatabase(dataToSave?: DatabaseSchema) {
    try {
      this.ensureDataDir();
      const data = dataToSave || this.db;
      data.stats.lastUpdated = new Date().toISOString();
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (e) {
      console.error('Failed to save database atomically:', e);
    }
  }

  // --- Users & Whitelist Methods ---

  public getAllUsers(): User[] {
    return this.db.users;
  }

  public getUserByEmail(email: string): User | undefined {
    if (!email) return undefined;
    const cleanEmail = email.trim().toLowerCase();
    return this.db.users.find(u => u.email.toLowerCase() === cleanEmail);
  }

  public activateUserPro(email: string, name?: string, source: User['source'] = 'lynk', lynkid?: string): User {
    const cleanEmail = email.trim().toLowerCase();
    const existingIndex = this.db.users.findIndex(u => u.email.toLowerCase() === cleanEmail);
    const now = new Date().toISOString();
    const generatedLynkId = lynkid || `LYNK-${Math.floor(100000 + Math.random() * 900000)}`;

    const isAdminEmail = ADMIN_EMAILS.includes(cleanEmail) || cleanEmail === this.db.settings.adminEmail.toLowerCase();

    if (existingIndex >= 0) {
      const existing = this.db.users[existingIndex];
      const updated: User = {
        ...existing,
        name: name || existing.name,
        role: isAdminEmail ? 'admin' : 'user',
        plan: 'lifetime_pro',
        status: 'active',
        source: source || existing.source,
        lynkid: existing.lynkid || generatedLynkId,
        activatedAt: now,
      };
      this.db.users[existingIndex] = updated;
      this.saveDatabase();
      return updated;
    } else {
      const newUser: User = {
        id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        email: cleanEmail,
        name: name || cleanEmail.split('@')[0],
        role: isAdminEmail ? 'admin' : 'user',
        plan: 'lifetime_pro',
        status: 'active',
        source,
        lynkid: generatedLynkId,
        activatedAt: now,
      };
      this.db.users.push(newUser);
      this.saveDatabase();
      return newUser;
    }
  }

  public addPendingUser(email: string, name?: string): User {
    const cleanEmail = email.trim().toLowerCase();
    const existing = this.getUserByEmail(cleanEmail);
    if (existing) return existing;

    const newUser: User = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0],
      role: 'user',
      plan: 'free',
      status: 'pending',
      source: 'lynk',
      activatedAt: new Date().toISOString()
    };
    this.db.users.push(newUser);
    this.saveDatabase();
    return newUser;
  }

  public bulkAddWhitelist(items: { email: string; name?: string }[]): { added: number; updated: number } {
    let added = 0;
    let updated = 0;
    const now = new Date().toISOString();

    for (const item of items) {
      if (!item.email || !item.email.includes('@')) continue;
      const cleanEmail = item.email.trim().toLowerCase();
      const existingIndex = this.db.users.findIndex(u => u.email.toLowerCase() === cleanEmail);

      if (existingIndex >= 0) {
        this.db.users[existingIndex].plan = 'lifetime_pro';
        this.db.users[existingIndex].status = 'active';
        if (item.name) this.db.users[existingIndex].name = item.name;
        updated++;
      } else {
        this.db.users.push({
          id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          email: cleanEmail,
          name: item.name || cleanEmail.split('@')[0],
          role: 'user',
          plan: 'lifetime_pro',
          status: 'active',
          source: 'manual_admin',
          lynkid: `LYNK-${Math.floor(100000 + Math.random() * 900000)}`,
          activatedAt: now
        });
        added++;
      }
    }
    this.saveDatabase();
    return { added, updated };
  }

  public deleteUser(userIdOrEmail: string): boolean {
    const initialLen = this.db.users.length;
    this.db.users = this.db.users.filter(u => u.id !== userIdOrEmail && u.email.toLowerCase() !== userIdOrEmail.toLowerCase());
    if (this.db.users.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- License Key Redemption ---

  public claimLicenseKey(code: string, userEmail: string): { success: boolean; message: string; user?: User } {
    const cleanCode = code.trim().toUpperCase();
    const cleanEmail = userEmail.trim().toLowerCase();

    const keyIndex = this.db.licenseKeys.findIndex(k => k.code.toUpperCase() === cleanCode && k.status === 'active');
    if (keyIndex < 0) {
      return { success: false, message: 'Kode lisensi tidak valid atau sudah pernah digunakan.' };
    }

    // Mark key as used
    const now = new Date().toISOString();
    this.db.licenseKeys[keyIndex].status = 'used';
    this.db.licenseKeys[keyIndex].usedByEmail = cleanEmail;
    this.db.licenseKeys[keyIndex].usedAt = now;

    // Activate user
    const activatedUser = this.activateUserPro(cleanEmail, undefined, 'license_key', `LIC-${cleanCode.substring(0, 8)}`);

    // Record transaction
    this.createTransaction({
      customerEmail: cleanEmail,
      customerName: activatedUser.name,
      amount: 0,
      currency: 'IDR',
      status: 'success',
      paymentMethod: 'coupon',
      paymentCode: cleanCode,
      refCode: `REDEEM-${cleanCode}`
    });

    this.saveDatabase();
    return {
      success: true,
      message: 'Selamat! Lisensi Lifetime PRO berhasil diaktifkan.',
      user: activatedUser
    };
  }

  public generateLicenseKeys(count: number, prefix: string = 'PRO'): LicenseKey[] {
    const created: LicenseKey[] = [];
    const now = new Date().toISOString();

    for (let i = 0; i < count; i++) {
      const randomCode = `${prefix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newKey: LicenseKey = {
        id: `lic-${Date.now()}-${i}`,
        code: randomCode,
        plan: 'lifetime_pro',
        status: 'active',
        createdAt: now
      };
      this.db.licenseKeys.push(newKey);
      created.push(newKey);
    }
    this.saveDatabase();
    return created;
  }

  // --- Transactions & Payments ---

  public createTransaction(data: Omit<Transaction, 'id' | 'createdAt'>): Transaction {
    const newTrx: Transaction = {
      ...data,
      id: `TRX-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      completedAt: data.status === 'success' ? new Date().toISOString() : undefined
    };
    this.db.transactions.unshift(newTrx);
    this.saveDatabase();
    return newTrx;
  }

  public completeTransaction(transactionId: string): Transaction | undefined {
    const trx = this.db.transactions.find(t => t.id === transactionId);
    if (!trx) return undefined;

    trx.status = 'success';
    trx.completedAt = new Date().toISOString();

    // Activate the user
    this.activateUserPro(
      trx.customerEmail,
      trx.customerName,
      trx.paymentMethod as User['source'],
      `PAY-${trx.id.substring(4)}`
    );

    this.saveDatabase();
    return trx;
  }

  public getAllTransactions(): Transaction[] {
    return this.db.transactions;
  }

  // --- Settings & Stats ---

  public getSettings(): SystemSettings {
    return this.db.settings;
  }

  public updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    this.db.settings = {
      ...this.db.settings,
      ...updates
    };
    this.saveDatabase();
    return this.db.settings;
  }

  public saveConcept(concept: GeneratedConcept) {
    this.db.conceptHistory.unshift(concept);
    if (this.db.conceptHistory.length > 50) {
      this.db.conceptHistory = this.db.conceptHistory.slice(0, 50);
    }
    this.db.stats.totalGenerations++;
    this.saveDatabase();
  }

  public getConceptHistory(): GeneratedConcept[] {
    return this.db.conceptHistory;
  }

  public getStats() {
    const totalUsers = this.db.users.length;
    const proUsers = this.db.users.filter(u => u.plan === 'lifetime_pro' && u.status === 'active').length;
    const totalRevenue = this.db.transactions
      .filter(t => t.status === 'success')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    const activeKeys = this.db.licenseKeys.filter(k => k.status === 'active').length;

    return {
      totalUsers,
      proUsers,
      totalRevenue,
      activeKeys,
      totalGenerations: this.db.stats.totalGenerations,
      lastUpdated: this.db.stats.lastUpdated
    };
  }
}

export const db = new DatabaseManager();
