export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  plan: 'free' | 'lifetime_pro';
  lynkid?: string;
  activatedAt: string;
  source: 'lynk' | 'qris' | 'bank_transfer' | 'manual_admin' | 'license_key' | 'url_token' | 'google_oauth' | 'lynk_webhook';
  status: 'active' | 'pending' | 'revoked';
  notes?: string;
}

export interface Transaction {
  id: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  paymentMethod: 'lynk' | 'qris' | 'bank_transfer' | 'coupon';
  paymentCode: string;
  refCode?: string;
  proofUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface LicenseKey {
  id: string;
  code: string;
  plan: 'lifetime_pro';
  status: 'active' | 'used' | 'revoked';
  usedByEmail?: string;
  createdAt: string;
  usedAt?: string;
}

export interface AdFormat {
  id: string;
  name: string;
  category: string;
  formula: string;
  description: string;
  tags: string[];
}

export interface ReferenceImage {
  id: string;
  name: string;
  type: 'product' | 'character';
  dataUrl: string; // base64 data
  mimeType: string;
  roleOrTag?: string; // e.g. "creator.png", "product.jpg", or "Host Edi"
}

export interface ConceptRequest {
  mode: 'ad' | 'content';
  productImages: { dataUrl: string; mimeType: string; name: string }[];
  characterImages: { dataUrl: string; mimeType: string; name: string; roleOrTag?: string }[];
  adFormat: string;
  aspectRatio: '9:16' | '16:9' | '1:1' | '4:5';
  engine: 'Omni1.1flash' | 'All Generator Video';
  duration: '32s' | '64s';
  targetAudience?: string;
  brief?: string;
  creativeTools: {
    hook: boolean;
    product: boolean;
    character: boolean;
    storyboard: boolean;
    videoPackage: boolean;
  };
}

export interface StoryboardPanel {
  panelNumber: number;
  timeRange: string;
  shotType: string;
  cameraMovement: string;
  visualDescription: string;
  lightingAndAtmosphere: string;
  audioSfx: string;
  voiceoverDialogue: string;
}

export interface GeneratedConcept {
  id: string;
  createdAt: string;
  title: string;
  mode: 'ad' | 'content';
  adFormat: string;
  engine: string;
  duration: string;
  aspectRatio: string;
  summary: string;
  panelsCount: number;
  masterStoryboardPrompt: string;
  storyboardPanels: StoryboardPanel[];
  masterVideoPrompt: string;
  socialPackage: {
    tiktok: string;
    instagram: string;
    facebook: string;
    threads: string;
    x: string;
    youtube: string;
    pinterest: string;
    hashtags: string[];
    suggestedAudio: string;
  };
}

export interface SystemSettings {
  adminEmail: string;
  lynkCheckoutUrl: string;
  qrisMerchantName: string;
  qrisNmid: string;
  priceIDR: number;
  discountPriceIDR: number;
  bankAccount: {
    bank: string;
    accountNumber: string;
    accountHolder: string;
  };
  autoApproveLynk: boolean;
}
