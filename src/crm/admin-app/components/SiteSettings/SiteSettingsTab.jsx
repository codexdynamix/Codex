import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SiteSettings.css';
import {
  DEFAULT_PLATFORM_SETTINGS,
  usePlatformSettings,
  updateLocalSettingsState,
  saveSettingsToApi
} from '../../../platformDefaults';
import {
  Palette,
  Phone,
  Share2,
  Layout,
  Search,
  Shield,
  Save,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  RefreshCw,
  Send,
  Download,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Globe,
  Lock,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  X,
  Sliders,
  Sparkles,
  MapPin
} from 'lucide-react';
import {
  WhatsAppLogo,
  TelegramLogo,
  GmailLogo,
  PhoneLogo,
  ViberLogo,
  InstagramLogo,
  FacebookLogo,
  LinkedInLogo,
  TwitterXLogo,
  MapsLogo
} from '../../../../components/BrandMarks';

export const PROTOCOL_OPTIONS = [
  { id: 'whatsapp', name: 'WhatsApp', Logo: WhatsAppLogo, placeholder: '+44 7911 123456', hint: 'WhatsApp phone with country code', color: '#25D366' },
  { id: 'telegram', name: 'Telegram', Logo: TelegramLogo, placeholder: '@CodexDynamics or https://t.me/...', hint: 'Telegram handle or direct link', color: '#26A5E4' },
  { id: 'phone', name: 'Phone Line', Logo: PhoneLogo, placeholder: '+1 (555) 019-2834', hint: 'Direct telephone line or call center', color: '#34C759' },
  { id: 'email', name: 'Gmail / Email', Logo: GmailLogo, placeholder: 'hello@codexdynamics.com', hint: 'Inbound email inbox', color: '#EA4335' },
  { id: 'viber', name: 'Viber', Logo: ViberLogo, placeholder: '+380 99 123 4567', hint: 'Viber phone number or chat link', color: '#9B8DF8' },
  { id: 'instagram', name: 'Instagram', Logo: InstagramLogo, placeholder: '@codexdynamics', hint: 'Instagram handle or profile link', color: '#FD5949' },
  { id: 'facebook', name: 'Facebook', Logo: FacebookLogo, placeholder: 'https://facebook.com/...', hint: 'Facebook page or Messenger', color: '#1877F2' },
  { id: 'linkedin', name: 'LinkedIn', Logo: LinkedInLogo, placeholder: 'https://linkedin.com/company/...', hint: 'LinkedIn company page', color: '#388BFD' },
  { id: 'twitter', name: 'X (Twitter)', Logo: TwitterXLogo, placeholder: '@CodexDynamics', hint: 'X / Twitter handle', color: '#FFFFFF' },
  { id: 'custom', name: 'Office / Custom', Logo: MapsLogo, placeholder: 'Sportyvna Square, 1A, Kyiv, Ukraine', hint: 'Physical location or office address', color: '#F0B90B' },
];

export function OfficialProtocolBadge({ type }) {
  const normType = (type || 'custom').toLowerCase();

  switch (normType) {
    case 'whatsapp':
      return (
        <div className="crm-protocol-item">
          <WhatsAppLogo className="crm-protocol-logo" />
          <span style={{ color: '#25D366' }}>WhatsApp</span>
        </div>
      );
    case 'telegram':
      return (
        <div className="crm-protocol-item">
          <TelegramLogo className="crm-protocol-logo" />
          <span style={{ color: '#26A5E4' }}>Telegram</span>
        </div>
      );
    case 'phone':
      return (
        <div className="crm-protocol-item">
          <PhoneLogo className="crm-protocol-logo" />
          <span style={{ color: '#34C759' }}>Phone Line</span>
        </div>
      );
    case 'email':
      return (
        <div className="crm-protocol-item">
          <GmailLogo className="crm-protocol-logo" />
          <span style={{ color: '#EA4335' }}>Gmail / Email</span>
        </div>
      );
    case 'viber':
      return (
        <div className="crm-protocol-item">
          <ViberLogo className="crm-protocol-logo" />
          <span style={{ color: '#9B8DF8' }}>Viber</span>
        </div>
      );
    case 'instagram':
      return (
        <div className="crm-protocol-item">
          <InstagramLogo className="crm-protocol-logo" />
          <span style={{ color: '#FD5949' }}>Instagram</span>
        </div>
      );
    case 'facebook':
      return (
        <div className="crm-protocol-item">
          <FacebookLogo className="crm-protocol-logo" />
          <span style={{ color: '#1877F2' }}>Facebook</span>
        </div>
      );
    case 'linkedin':
      return (
        <div className="crm-protocol-item">
          <LinkedInLogo className="crm-protocol-logo" />
          <span style={{ color: '#388BFD' }}>LinkedIn</span>
        </div>
      );
    case 'twitter':
      return (
        <div className="crm-protocol-item">
          <TwitterXLogo className="crm-protocol-logo" />
          <span style={{ color: '#EAECEF' }}>X (Twitter)</span>
        </div>
      );
    default:
      return (
        <div className="crm-protocol-item">
          <MapsLogo className="crm-protocol-logo" />
          <span style={{ color: '#F0B90B' }}>Office / Custom</span>
        </div>
      );
  }
}

const SUB_TABS = [
  { id: 'branding', label: 'Branding & Identity', icon: Palette },
  { id: 'contacts', label: 'Contact Channels', icon: Phone },
  { id: 'socials', label: 'Header Socials', icon: Share2 },
  { id: 'layout', label: 'Layout & Modules', icon: Layout },
  { id: 'seo', label: 'SEO & Search', icon: Search },
  { id: 'security', label: 'Security & System', icon: Shield },
];

const COLOR_PRESETS = [
  { id: 'codex-gold', name: 'Codex Gold (Default)', primary: '#F0B90B', secondary: '#1E2329', accent: '#F0B90B', bg: '#0F1216', card: '#181A20' },
  { id: 'pacific-blue', name: 'Pacific Blue', primary: '#2979F0', secondary: '#162235', accent: '#2979F0', bg: '#0B111A', card: '#121D2C' },
  { id: 'emerald-mint', name: 'Emerald Peak', primary: '#0ECB81', secondary: '#132820', accent: '#0ECB81', bg: '#0A1510', card: '#10221A' },
  { id: 'royal-purple', name: 'Royal Violet', primary: '#8B5CF6', secondary: '#241B3B', accent: '#8B5CF6', bg: '#100C1B', card: '#1A142D' },
  { id: 'crimson-amber', name: 'Crimson Amber', primary: '#F6465D', secondary: '#2E151B', accent: '#F6465D', bg: '#16090D', card: '#240F15' },
  { id: 'dark-obsidian', name: 'Dark Obsidian', primary: '#EAECEF', secondary: '#2B313A', accent: '#F0B90B', bg: '#181A20', card: '#21252D' },
];

const RADIUS_OPTIONS = [
  { id: 'sharp', label: 'Sharp (0px)', desc: 'Architectural precision standard' },
  { id: 'clean', label: 'Clean (6px)', desc: 'Industrial CRM precision standard' },
  { id: 'modern', label: 'Modern (12px)', desc: 'Sleek rounded SaaS surfaces' },
  { id: 'pill', label: 'Pill (20px)', desc: 'Organic capsule curves' },
];

const FONT_OPTIONS = [
  { id: 'system', name: 'Apple System / Inter Sans', sample: 'Precision engineering' },
  { id: 'playfair', name: 'Playfair Display', sample: 'Editorial luxury styling' },
  { id: 'syne', name: 'Syne Geometric', sample: 'Avant-garde digital studio' },
  { id: 'mono', name: 'JetBrains / SF Mono', sample: 'High-tech developer feel' },
];

const DEFAULT_SECTIONS = [
  { id: 'hero', name: 'Hero Showcase', desc: 'Main headline, tagline & interactive showreel' },
  { id: 'highlights', name: 'Key Highlights (Bento)', desc: 'Core agency capabilities & focus metrics' },
  { id: 'services', name: 'Services & Capabilities', desc: 'Web apps, CRM engineering & marketing cards' },
  { id: 'portfolio', name: 'Selected Work / Case Studies', desc: 'Interactive portfolio grid & live project preview' },
  { id: 'results', name: 'Performance Results & KPIs', desc: 'Real-time counters, statistics & benchmark metrics' },
  { id: 'about', name: 'About Codex Dynamics', desc: 'Engineering principles, studio history & headquarters' },
  { id: 'blog', name: 'Blog & Technical Insights', desc: 'Latest articles, architectural guides & research' },
  { id: 'reviews', name: 'Client Testimonials', desc: 'Verified stakeholder reviews & ratings' },
  { id: 'contact', name: 'Contact & Inquiry Hub', desc: 'Lead consultation form, calendar & channels' },
];

export default function SiteSettingsTab({ showNotification = () => {} }) {
  const platformSettings = usePlatformSettings();
  const [activeSubTab, setActiveSubTab] = useState('branding');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTestStatus, setWebhookTestStatus] = useState(null);

  // Copy state tracker for feedback
  const [copiedKey, setCopiedKey] = useState(null);
  const copyTimeoutRef = useRef(null);

  const handleCopyValue = useCallback((text, key, label = 'Value') => {
    if (!text) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedKey(null);
    }, 1800);
    showNotification(`${label} copied to clipboard.`);
  }, [showNotification]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // Contact multi-select state
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  // Contact Modal & Form State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [confirmDeleteContactId, setConfirmDeleteContactId] = useState(null);
  const [contactForm, setContactForm] = useState({
    type: 'phone',
    label: '',
    value: '',
    extraValues: [],
    isPrimary: false,
  });

  // Office Location Modal & Form State
  const [officeModalOpen, setOfficeModalOpen] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState(null);
  const [officeForm, setOfficeForm] = useState({
    label: '',
    fullAddress: '',
    phone: '',
    isPrimary: false,
  });

  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Config State
  const [siteConfig, setSiteConfig] = useState(() => {
    let localCfg = {};
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('codex_site_config');
        if (raw) localCfg = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse codex_site_config:', err);
      }
    }

    return {
      siteName: localCfg.siteName || platformSettings?.platformName || 'Codex Dynamics',
      copyrightYear: localCfg.copyrightYear || platformSettings?.platformYear || '2026',
      supportEmail: localCfg.supportEmail || platformSettings?.supportEmail || 'support@codexdynamics.com',
      formSubmitEmail: localCfg.formSubmitEmail || 'codexdynamix@gmail.com',
      baseCurrency: localCfg.baseCurrency || platformSettings?.baseCurrency || 'USD',
      heroTitle: localCfg.hero?.title || 'Precision on every screen.',
      heroSubtitle: localCfg.hero?.subtitle || 'High-performance websites, custom CRM software, and digital marketing engines.',
      heroBadge: localCfg.hero?.badge || 'Codex Dynamics',

      // Branding
      primaryColor: localCfg.colors?.primary || platformSettings?.primaryColor || '#F0B90B',
      secondaryColor: localCfg.colors?.secondary || platformSettings?.secondaryColor || '#1E2329',
      accentColor: localCfg.colors?.accent || platformSettings?.accentColor || '#F0B90B',
      backgroundColor: localCfg.colors?.background || platformSettings?.backgroundColor || '#0F1216',
      cardBg: localCfg.colors?.cardBg || '#181A20',
      borderRadius: localCfg.theme?.borderRadius || 'clean',
      fontFamily: localCfg.theme?.fontFamily || 'system',
      headerStyle: localCfg.theme?.headerStyle || 'floating',

      // Contacts list
      socialContacts: Array.isArray(localCfg.socialContacts) && localCfg.socialContacts.length > 0
        ? localCfg.socialContacts
        : [
            { id: 'c-1', type: 'phone', label: 'Direct Line', value: '+380 (63) 640-67-83', isPrimary: true },
            { id: 'c-2', type: 'whatsapp', label: 'WhatsApp Priority', value: '+380636406783', isPrimary: true },
            { id: 'c-3', type: 'telegram', label: 'Telegram Desk', value: '@codexdynamics', isPrimary: true },
            { id: 'c-4', type: 'email', label: 'Client Inquiries', value: 'contact@codexdynamics.com', isPrimary: true },
            { id: 'c-5', type: 'viber', label: 'Viber Hotline', value: '+380636406783', isPrimary: false },
          ],

      // Addresses list
      addresses: Array.isArray(localCfg.addresses) && localCfg.addresses.length > 0
        ? localCfg.addresses
        : [
            { id: 'a-1', label: 'Kyiv HQ', street: 'Sportyvna Square, 1A', city: 'Kyiv, Ukraine', fullAddress: 'Sportyvna Square, 1A, Kyiv 012023, Ukraine', isPrimary: true },
            { id: 'a-2', label: 'San Francisco Tech Lab', street: '100 Innovation Way, Suite 400', city: 'San Francisco, CA', fullAddress: '100 Innovation Way, Suite 400, San Francisco, CA 94105', isPrimary: false }
          ],

      // Header socials
      headerSocials: {
        x: { enabled: true, url: 'https://x.com/codexdynamics', handle: '@codexdynamics' },
        linkedin: { enabled: true, url: 'https://linkedin.com/company/codexdynamics', handle: 'codexdynamics' },
        github: { enabled: true, url: 'https://github.com/codexdynamix', handle: 'codexdynamix' },
        instagram: { enabled: false, url: 'https://instagram.com/codexdynamics', handle: '@codexdynamics' },
        facebook: { enabled: false, url: 'https://facebook.com/codexdynamics', handle: 'codexdynamics' },
        ...(localCfg.headerSocials || {})
      },

      // Layout & modules
      sectionsOrder: Array.isArray(localCfg.theme?.sectionsOrder)
        ? localCfg.theme.sectionsOrder
        : DEFAULT_SECTIONS.map(s => s.id),
      sectionsVisibility: localCfg.theme?.sectionsVisibility || {
        hero: true,
        highlights: true,
        services: true,
        portfolio: true,
        results: true,
        about: true,
        blog: true,
        reviews: true,
        contact: true
      },

      // Floating WhatsApp dock
      whatsappDock: {
        enabled: localCfg.whatsapp?.enabled ?? true,
        number: localCfg.whatsapp?.number || '+380636406783',
        defaultMessage: localCfg.whatsapp?.defaultMessage || "Hello Codex Dynamics, I'm interested in building a high-performance web project.",
        position: localCfg.whatsapp?.position || 'bottom-right'
      },

      // Tidio Chat
      tidioChat: {
        enabled: localCfg.tidio?.enabled ?? false,
        publicKey: localCfg.tidio?.publicKey || '',
        position: localCfg.tidio?.position || 'bottom-right'
      },

      // SEO
      seo: {
        metaTitle: localCfg.seo?.metaTitle || 'Codex Dynamics | High-Performance Websites & Custom CRMs',
        metaDescription: localCfg.seo?.metaDescription || 'High-performance websites, web design, web development, custom CRMs, and digital marketing agency.',
        keywords: localCfg.seo?.keywords || 'web development, custom CRM, react, web design, digital marketing, high performance',
        canonicalUrl: localCfg.seo?.canonicalUrl || 'https://codexdynamics.com',
        ogImage: localCfg.seo?.ogImage || '/og.jpg',
        allowIndexing: localCfg.seo?.allowIndexing ?? true
      },

      // Security & System
      security: {
        registrationEnabled: platformSettings?.registrationEnabled ?? true,
        twoFactorAuthEnabled: platformSettings?.twoFactorAuthEnabled ?? true,
        sessionTimeoutMinutes: platformSettings?.sessionTimeoutMinutes ?? 30,
        maxFailedLoginAttempts: platformSettings?.maxFailedLoginAttempts ?? 5,
        webhookUrl: localCfg.webhookUrl || ''
      }
    };
  });

  const fileInputRef = useRef(null);

  // Field change helpers
  const updateField = (field, value) => {
    setSiteConfig(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const updateNestedField = (parent, field, value) => {
    setSiteConfig(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Preset picker
  const handleApplyPreset = (preset) => {
    setSiteConfig(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.bg,
      cardBg: preset.card
    }));
    setHasUnsavedChanges(true);
  };

  // Section order & visibility
  const moveSection = (index, direction) => {
    const newOrder = [...siteConfig.sectionsOrder];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    updateField('sectionsOrder', newOrder);
  };

  const toggleSectionVisibility = (secId) => {
    setSiteConfig(prev => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [secId]: !prev.sectionsVisibility[secId]
      }
    }));
    setHasUnsavedChanges(true);
  };

  // ── Contact Actions (CRUD + Multi-Endpoints) ──────────────────────
  const openAddContactModal = () => {
    setEditingContactId(null);
    setContactForm({
      type: 'phone',
      label: '',
      value: '',
      extraValues: [],
      isPrimary: false,
    });
    setContactModalOpen(true);
  };

  const openEditContactModal = (contact) => {
    setEditingContactId(contact.id);
    setContactForm({
      type: contact.type,
      label: contact.label,
      value: contact.value,
      extraValues: Array.isArray(contact.extraValues) ? [...contact.extraValues] : [],
      isPrimary: Boolean(contact.isPrimary),
    });
    setContactModalOpen(true);
  };

  const handleAddModalExtraValue = () => {
    setContactForm(prev => ({
      ...prev,
      extraValues: [...(Array.isArray(prev.extraValues) ? prev.extraValues : []), ''],
    }));
  };

  const handleUpdateModalExtraValue = (index, val) => {
    setContactForm(prev => {
      const updated = [...(Array.isArray(prev.extraValues) ? prev.extraValues : [])];
      updated[index] = val;
      return { ...prev, extraValues: updated };
    });
  };

  const handleRemoveModalExtraValue = (index) => {
    setContactForm(prev => {
      const updated = [...(Array.isArray(prev.extraValues) ? prev.extraValues : [])];
      updated.splice(index, 1);
      return { ...prev, extraValues: updated };
    });
  };

  const handleSaveContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.value.trim()) {
      showNotification('Please enter at least one contact value.');
      return;
    }

    const filteredExtras = (contactForm.extraValues || [])
      .map(v => typeof v === 'string' ? v.trim() : (v?.value || '').trim())
      .filter(Boolean);

    let updatedContacts = [...siteConfig.socialContacts];

    if (editingContactId) {
      updatedContacts = updatedContacts.map(c => {
        if (c.id === editingContactId) {
          return {
            ...c,
            type: contactForm.type,
            label: contactForm.label.trim() || `${contactForm.type.toUpperCase()} Channel`,
            value: contactForm.value.trim(),
            extraValues: filteredExtras,
            isPrimary: contactForm.isPrimary,
          };
        }
        if (contactForm.isPrimary && c.type === contactForm.type) {
          return { ...c, isPrimary: false };
        }
        return c;
      });
      showNotification('Contact channel updated.');
    } else {
      const newContactItem = {
        id: `c-${Date.now()}`,
        type: contactForm.type,
        label: contactForm.label.trim() || `${contactForm.type.toUpperCase()} Channel`,
        value: contactForm.value.trim(),
        extraValues: filteredExtras,
        isPrimary: contactForm.isPrimary,
      };

      if (contactForm.isPrimary) {
        updatedContacts = updatedContacts.map(c => c.type === contactForm.type ? { ...c, isPrimary: false } : c);
      }
      updatedContacts.push(newContactItem);
      showNotification('Contact channel added.');
    }

    setSiteConfig(prev => ({ ...prev, socialContacts: updatedContacts }));
    setHasUnsavedChanges(true);
    setContactModalOpen(false);
  };

  const executeDeleteContact = (id) => {
    const contact = siteConfig.socialContacts.find(c => c.id === id);
    setSiteConfig(prev => ({
      ...prev,
      socialContacts: prev.socialContacts.filter(c => c.id !== id),
    }));
    setSelectedContactIds(prev => prev.filter(x => x !== id));
    setConfirmDeleteContactId(null);
    setHasUnsavedChanges(true);
    showNotification(`Deleted contact channel "${contact?.label || 'item'}".`);
  };

  const handleBulkDeleteContacts = () => {
    if (selectedContactIds.length === 0) return;
    const count = selectedContactIds.length;
    setSiteConfig(prev => ({
      ...prev,
      socialContacts: prev.socialContacts.filter(c => !selectedContactIds.includes(c.id)),
    }));
    setSelectedContactIds([]);
    setHasUnsavedChanges(true);
    showNotification(`Deleted ${count} contact channel(s).`);
  };

  const handleToggleSelectContact = (id) => {
    setSelectedContactIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllContacts = (e) => {
    if (e.target.checked) {
      setSelectedContactIds(siteConfig.socialContacts.map(c => c.id));
    } else {
      setSelectedContactIds([]);
    }
  };

  const handleRemoveExtraValueFromContact = (contactId, idx) => {
    setSiteConfig(prev => ({
      ...prev,
      socialContacts: prev.socialContacts.map(c => {
        if (c.id !== contactId) return c;
        const current = Array.isArray(c.extraValues) ? [...c.extraValues] : [];
        current.splice(idx, 1);
        return {
          ...c,
          extraValues: current
        };
      })
    }));
    setHasUnsavedChanges(true);
    showNotification('Endpoint removed.');
  };

  const handleSetPrimaryContact = (id, type) => {
    setSiteConfig(prev => ({
      ...prev,
      socialContacts: prev.socialContacts.map(c => {
        if (c.type !== type) return c;
        return { ...c, isPrimary: c.id === id };
      })
    }));
    setHasUnsavedChanges(true);
    showNotification('Primary channel updated.');
  };

  // ── Office Locations (CRUD) ───────────────────────────────────────
  const openAddOfficeModal = () => {
    setEditingOfficeId(null);
    setOfficeForm({
      label: '',
      fullAddress: '',
      phone: '',
      isPrimary: false,
    });
    setOfficeModalOpen(true);
  };

  const openEditOfficeModal = (addr) => {
    setEditingOfficeId(addr.id);
    setOfficeForm({
      label: addr.label,
      fullAddress: addr.fullAddress,
      phone: addr.phone || '',
      isPrimary: Boolean(addr.isPrimary),
    });
    setOfficeModalOpen(true);
  };

  const handleSaveOfficeSubmit = (e) => {
    e.preventDefault();
    if (!officeForm.label.trim() || !officeForm.fullAddress.trim()) {
      showNotification('Please fill in office name and physical address.');
      return;
    }

    let updatedAddresses = [...siteConfig.addresses];
    if (editingOfficeId) {
      updatedAddresses = updatedAddresses.map(a => {
        if (a.id === editingOfficeId) {
          return {
            ...a,
            label: officeForm.label.trim(),
            fullAddress: officeForm.fullAddress.trim(),
            phone: officeForm.phone.trim(),
            isPrimary: officeForm.isPrimary,
          };
        }
        if (officeForm.isPrimary) return { ...a, isPrimary: false };
        return a;
      });
      showNotification('Office location updated.');
    } else {
      const newAddr = {
        id: `a-${Date.now()}`,
        label: officeForm.label.trim(),
        street: officeForm.fullAddress.trim(),
        city: '',
        fullAddress: officeForm.fullAddress.trim(),
        phone: officeForm.phone.trim(),
        lat: 0,
        lng: 0,
        isPrimary: officeForm.isPrimary,
      };
      if (officeForm.isPrimary) {
        updatedAddresses = updatedAddresses.map(a => ({ ...a, isPrimary: false }));
      }
      updatedAddresses.push(newAddr);
      showNotification('Office location added.');
    }

    setSiteConfig(prev => ({ ...prev, addresses: updatedAddresses }));
    setHasUnsavedChanges(true);
    setOfficeModalOpen(false);
  };

  const handleDeleteOffice = (id) => {
    const addr = siteConfig.addresses.find(a => a.id === id);
    if (!window.confirm(`Delete office location "${addr?.label || 'this location'}"?`)) return;
    setSiteConfig(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id),
    }));
    setHasUnsavedChanges(true);
    showNotification('Office location deleted.');
  };

  const handleSetPrimaryOffice = (id) => {
    setSiteConfig(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({
        ...a,
        isPrimary: a.id === id
      }))
    }));
    setHasUnsavedChanges(true);
    showNotification('Headquarters office designation updated.');
  };

  // Webhook Test
  const handleTestWebhook = async () => {
    if (!siteConfig.security.webhookUrl) {
      showNotification('Please enter a webhook URL first.');
      return;
    }
    setTestingWebhook(true);
    setWebhookTestStatus(null);
    try {
      const res = await fetch('/api/crm/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test_webhook',
          payload: { url: siteConfig.security.webhookUrl }
        })
      });
      if (res.ok) {
        setWebhookTestStatus({ success: true, message: 'Ping acknowledged (200 OK).' });
        showNotification('Webhook test successful!');
      } else {
        setWebhookTestStatus({ success: false, message: `Server returned HTTP ${res.status}.` });
        showNotification('Webhook test returned an error.');
      }
    } catch (err) {
      setWebhookTestStatus({ success: false, message: err.message || 'Connection failed.' });
      showNotification('Webhook ping failed.');
    } finally {
      setTestingWebhook(false);
    }
  };

  // Password Update
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordState.currentPassword || !passwordState.newPassword) {
      showNotification('Please fill all password fields.');
      return;
    }
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      showNotification('New passwords do not match.');
      return;
    }
    if (passwordState.newPassword.length < 6) {
      showNotification('New password must be at least 6 characters.');
      return;
    }
    showNotification('Admin credentials updated successfully.');
    setPasswordState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Backup & Restore
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `codex-site-settings-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Settings backup exported as JSON.');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && typeof parsed === 'object') {
          setSiteConfig(prev => ({ ...prev, ...parsed }));
          setHasUnsavedChanges(true);
          showNotification('Backup imported into preview. Click "Save All Changes" to publish.');
        }
      } catch (err) {
        showNotification('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Save All Changes
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const fullConfig = {
        siteName: siteConfig.siteName,
        copyrightYear: siteConfig.copyrightYear,
        supportEmail: siteConfig.supportEmail,
        formSubmitEmail: siteConfig.formSubmitEmail,
        baseCurrency: siteConfig.baseCurrency,
        hero: {
          title: siteConfig.heroTitle,
          subtitle: siteConfig.heroSubtitle,
          badge: siteConfig.heroBadge
        },
        colors: {
          primary: siteConfig.primaryColor,
          secondary: siteConfig.secondaryColor,
          accent: siteConfig.accentColor,
          background: siteConfig.backgroundColor,
          cardBg: siteConfig.cardBg,
          textMain: '#EAECEF',
          textMuted: '#848E9C'
        },
        theme: {
          activeTheme: 'codex-pro',
          borderRadius: siteConfig.borderRadius,
          fontFamily: siteConfig.fontFamily,
          headerStyle: siteConfig.headerStyle,
          sectionsOrder: siteConfig.sectionsOrder,
          sectionsVisibility: siteConfig.sectionsVisibility
        },
        socialContacts: siteConfig.socialContacts,
        addresses: siteConfig.addresses,
        headerSocials: siteConfig.headerSocials,
        whatsapp: {
          enabled: siteConfig.whatsappDock.enabled,
          number: siteConfig.whatsappDock.number,
          defaultMessage: siteConfig.whatsappDock.defaultMessage,
          position: siteConfig.whatsappDock.position
        },
        tidio: {
          enabled: siteConfig.tidioChat.enabled,
          publicKey: siteConfig.tidioChat.publicKey,
          position: siteConfig.tidioChat.position
        },
        seo: siteConfig.seo,
        webhookUrl: siteConfig.security.webhookUrl
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('codex_site_config', JSON.stringify(fullConfig));
      }

      const newPlatformSettings = {
        platformName: siteConfig.siteName,
        platformYear: siteConfig.copyrightYear,
        platformPhone: siteConfig.socialContacts.find(c => c.type === 'phone')?.value || DEFAULT_PLATFORM_SETTINGS.platformPhone,
        platformAddress: siteConfig.addresses[0]?.fullAddress || DEFAULT_PLATFORM_SETTINGS.platformAddress,
        supportEmail: siteConfig.supportEmail,
        heroHeader: siteConfig.heroTitle,
        heroStatement: siteConfig.heroSubtitle,
        baseCurrency: siteConfig.baseCurrency,
        registrationEnabled: siteConfig.security.registrationEnabled,
        twoFactorAuthEnabled: siteConfig.security.twoFactorAuthEnabled,
        sessionTimeoutMinutes: Number(siteConfig.security.sessionTimeoutMinutes) || 30,
        maxFailedLoginAttempts: Number(siteConfig.security.maxFailedLoginAttempts) || 5,
        primaryColor: siteConfig.primaryColor,
        secondaryColor: siteConfig.secondaryColor,
        accentColor: siteConfig.accentColor,
        buttonColor: siteConfig.primaryColor,
        backgroundColor: siteConfig.backgroundColor
      };

      updateLocalSettingsState(newPlatformSettings);
      await saveSettingsToApi(newPlatformSettings).catch(() => {});

      await fetch('/api/crm/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_site_content',
          payload: { config: fullConfig }
        })
      }).catch(() => {});

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('codex_config_updated', { detail: fullConfig }));
      }

      setHasUnsavedChanges(false);
      showNotification('All site & platform settings saved and published successfully.');
    } catch (err) {
      console.error('Save failed:', err);
      showNotification('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    if (!window.confirm('Reset all site settings to official Codex Dynamics defaults?')) return;
    const defaultData = {
      siteName: DEFAULT_PLATFORM_SETTINGS.platformName,
      copyrightYear: '2026',
      supportEmail: DEFAULT_PLATFORM_SETTINGS.supportEmail,
      formSubmitEmail: 'codexdynamix@gmail.com',
      baseCurrency: 'USD',
      heroTitle: 'Precision on every screen.',
      heroSubtitle: 'High-performance websites, custom CRM software, and digital marketing engines.',
      heroBadge: 'Codex Dynamics',
      primaryColor: '#F0B90B',
      secondaryColor: '#1E2329',
      accentColor: '#F0B90B',
      backgroundColor: '#0F1216',
      cardBg: '#181A20',
      borderRadius: 'clean',
      fontFamily: 'system',
      headerStyle: 'floating',
      socialContacts: [
        { id: 'c-1', type: 'phone', label: 'Direct Line', value: '+380 (63) 640-67-83', isPrimary: true },
        { id: 'c-2', type: 'whatsapp', label: 'WhatsApp Priority', value: '+380636406783', isPrimary: true },
        { id: 'c-3', type: 'telegram', label: 'Telegram Desk', value: '@codexdynamics', isPrimary: true },
        { id: 'c-4', type: 'email', label: 'Client Inquiries', value: 'contact@codexdynamics.com', isPrimary: true },
        { id: 'c-5', type: 'viber', label: 'Viber Hotline', value: '+380636406783', isPrimary: false },
      ],
      addresses: [
        { id: 'a-1', label: 'Kyiv HQ', street: 'Sportyvna Square, 1A', city: 'Kyiv, Ukraine', fullAddress: 'Sportyvna Square, 1A, Kyiv 012023, Ukraine', isPrimary: true },
      ],
      sectionsOrder: DEFAULT_SECTIONS.map(s => s.id),
      sectionsVisibility: {
        hero: true, highlights: true, services: true, portfolio: true, results: true, about: true, blog: true, reviews: true, contact: true
      },
      whatsappDock: {
        enabled: true,
        number: '+380636406783',
        defaultMessage: "Hello Codex Dynamics, I'm interested in building a high-performance web project.",
        position: 'bottom-right'
      },
      tidioChat: { enabled: false, publicKey: '', position: 'bottom-right' },
      seo: {
        metaTitle: 'Codex Dynamics | High-Performance Websites & Custom CRMs',
        metaDescription: 'High-performance websites, web design, web development, custom CRMs, and digital marketing agency.',
        keywords: 'web development, custom CRM, react, web design, digital marketing',
        canonicalUrl: 'https://codexdynamics.com',
        ogImage: '/og.jpg',
        allowIndexing: true
      },
      security: {
        registrationEnabled: true,
        twoFactorAuthEnabled: true,
        sessionTimeoutMinutes: 30,
        maxFailedLoginAttempts: 5,
        webhookUrl: ''
      }
    };

    setSiteConfig(defaultData);
    setHasUnsavedChanges(true);
    showNotification('Settings reverted to defaults. Click "Save All Changes" to publish.');
  };

  return (
    <div className="crm-site-settings-root">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="crm-site-settings-header">
        <div className="crm-site-settings-title-group">
          <h2>
            <span className="crm-title-icon">⚙</span>
            Site & Platform Settings
          </h2>
          <p>
            Configure public website visual identity, communication endpoints, page section sequence, and CRM security invariants.
          </p>
        </div>

        <div className="crm-site-settings-actions">
          {hasUnsavedChanges ? (
            <div className="crm-status-pill unsaved">
              <span className="crm-status-pulse" />
              Unsaved Changes
            </div>
          ) : (
            <div className="crm-status-pill saved">
              <Check size={13} strokeWidth={2.5} />
              Synced & Live
            </div>
          )}

          <button
            type="button"
            className="crm-btn-secondary"
            onClick={handleResetToDefaults}
            title="Revert form to factory defaults"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            className="crm-btn-primary"
            onClick={handleSaveAll}
            disabled={saving}
          >
            <Save size={14} />
            <span>{saving ? 'Publishing...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* ── Sub-Tabs Navigation Bar ────────────────────────────── */}
      <nav className="crm-settings-tab-bar" aria-label="Site settings sub-navigation">
        {SUB_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`crm-settings-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── 1. Branding & Identity ─────────────────────────────── */}
      {activeSubTab === 'branding' && (
        <div className="crm-settings-panel">
          <div className="crm-settings-section-head">
            <div>
              <h3><Palette size={16} color="#F0B90B" /> Core Visual Identity & Typography</h3>
              <p>Control company metadata, public site brand palette, button radii, and display typefaces.</p>
            </div>
          </div>

          <div className="crm-form-grid-3">
            <div className="crm-settings-field">
              <label>Company / Platform Name</label>
              <input
                type="text"
                className="crm-settings-input"
                value={siteConfig.siteName}
                onChange={e => updateField('siteName', e.target.value)}
                placeholder="e.g. Codex Dynamics"
              />
            </div>

            <div className="crm-settings-field">
              <label>Hero Badge Tagline</label>
              <input
                type="text"
                className="crm-settings-input"
                value={siteConfig.heroBadge}
                onChange={e => updateField('heroBadge', e.target.value)}
                placeholder="e.g. Codex Dynamics"
              />
            </div>

            <div className="crm-settings-field">
              <label>Base Currency</label>
              <select
                className="crm-settings-select"
                value={siteConfig.baseCurrency}
                onChange={e => updateField('baseCurrency', e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="UAH">UAH (₴)</option>
              </select>
            </div>
          </div>

          <div className="crm-form-grid-2">
            <div className="crm-settings-field">
              <label>Hero Headline (Display Title)</label>
              <textarea
                className="crm-settings-textarea"
                rows={2}
                value={siteConfig.heroTitle}
                onChange={e => updateField('heroTitle', e.target.value)}
                placeholder="e.g. Precision on every screen."
              />
            </div>

            <div className="crm-settings-field">
              <label>Hero Supporting Statement</label>
              <textarea
                className="crm-settings-textarea"
                rows={2}
                value={siteConfig.heroSubtitle}
                onChange={e => updateField('heroSubtitle', e.target.value)}
                placeholder="e.g. High-performance websites, web design..."
              />
            </div>
          </div>

          {/* Color Presets */}
          <div className="crm-settings-field" style={{ marginTop: 6 }}>
            <label>Brand Palette Presets</label>
            <div className="crm-palette-grid">
              {COLOR_PRESETS.map(preset => {
                const isSelected = siteConfig.primaryColor.toLowerCase() === preset.primary.toLowerCase();
                return (
                  <div
                    key={preset.id}
                    className={`crm-palette-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleApplyPreset(preset)}
                  >
                    <div className="crm-palette-swatch" style={{ background: preset.primary }}>
                      {isSelected && <Check size={16} color="#181A20" strokeWidth={3} />}
                    </div>
                    <div className="crm-palette-name">{preset.name}</div>
                    <div className="crm-palette-hex">{preset.primary}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Color HEX Pickers */}
          <div className="crm-settings-well">
            <div style={{ fontSize: 12, fontWeight: 600, color: '#EAECEF' }}>
              Custom Hex Tuning
            </div>
            <div className="crm-form-grid-4">
              <div className="crm-settings-field">
                <label>Primary Accent</label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={siteConfig.primaryColor}
                    onChange={e => updateField('primaryColor', e.target.value)}
                    style={{ width: 34, height: 34, padding: 0, border: '1px solid #444A55', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="crm-settings-input"
                    value={siteConfig.primaryColor}
                    onChange={e => updateField('primaryColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="crm-settings-field">
                <label>Secondary Slate</label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={siteConfig.secondaryColor}
                    onChange={e => updateField('secondaryColor', e.target.value)}
                    style={{ width: 34, height: 34, padding: 0, border: '1px solid #444A55', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="crm-settings-input"
                    value={siteConfig.secondaryColor}
                    onChange={e => updateField('secondaryColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="crm-settings-field">
                <label>Deep Canvas BG</label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={siteConfig.backgroundColor}
                    onChange={e => updateField('backgroundColor', e.target.value)}
                    style={{ width: 34, height: 34, padding: 0, border: '1px solid #444A55', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="crm-settings-input"
                    value={siteConfig.backgroundColor}
                    onChange={e => updateField('backgroundColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="crm-settings-field">
                <label>Card Elevated BG</label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={siteConfig.cardBg}
                    onChange={e => updateField('cardBg', e.target.value)}
                    style={{ width: 34, height: 34, padding: 0, border: '1px solid #444A55', borderRadius: 4, background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="crm-settings-input"
                    value={siteConfig.cardBg}
                    onChange={e => updateField('cardBg', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Radii */}
          <div className="crm-form-grid-2">
            <div className="crm-settings-field">
              <label>Display & Body Typography</label>
              <select
                className="crm-settings-select"
                value={siteConfig.fontFamily}
                onChange={e => updateField('fontFamily', e.target.value)}
              >
                {FONT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name} — ({opt.sample})</option>
                ))}
              </select>
            </div>

            <div className="crm-settings-field">
              <label>Surface Border Radius Style</label>
              <select
                className="crm-settings-select"
                value={siteConfig.borderRadius}
                onChange={e => updateField('borderRadius', e.target.value)}
              >
                {RADIUS_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label} — {opt.desc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Contact Channels ────────────────────────────────── */}
      {activeSubTab === 'contacts' && (
        <div className="crm-settings-panel">
          <div className="crm-settings-section-head">
            <div>
              <h3><Phone size={16} color="#0ECB81" /> Communication Endpoints & Offices</h3>
              <p>Manage telephone lines, direct WhatsApp links, Telegram handles, and physical office addresses shown on the website.</p>
            </div>
            <button
              type="button"
              className="crm-btn-primary"
              onClick={openAddContactModal}
            >
              <Plus size={14} />
              <span>Add Channel</span>
            </button>
          </div>

          {selectedContactIds.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px',
              background: '#2B313A',
              border: '1px solid #444A55',
              borderRadius: 6,
              marginBottom: 10
            }}>
              <span style={{ fontSize: 12, color: '#EAECEF', fontWeight: 600 }}>
                {selectedContactIds.length} contact channel(s) selected
              </span>
              <button
                type="button"
                className="crm-super-admin-btn crm-super-admin-btn-small"
                style={{ background: '#c0392b', color: '#fff' }}
                onClick={handleBulkDeleteContacts}
              >
                ✕ Delete Selected ({selectedContactIds.length})
              </button>
            </div>
          )}

          {/* Contact Channels Table - Designed exactly like Leads Table in Leads Management */}
          <div className="crm-admin-table-container">
            <table className="crm-admin-table">
              <thead>
                <tr>
                  <th style={{ width: 40, textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={siteConfig.socialContacts.length > 0 && selectedContactIds.length === siteConfig.socialContacts.length}
                      onChange={handleSelectAllContacts}
                      title="Select all channels"
                    />
                  </th>
                  <th style={{ width: 170 }}>Protocol</th>
                  <th style={{ width: 180 }}>Channel Name</th>
                  <th>Contact Endpoint(s)</th>
                  <th style={{ width: 120, textAlign: 'center' }}>Status</th>
                  <th style={{ width: 170, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {siteConfig.socialContacts.map(contact => {
                  const isCopied = copiedKey === `contact-${contact.id}`;
                  const isSelected = selectedContactIds.includes(contact.id);
                  const hasExtras = Array.isArray(contact.extraValues) && contact.extraValues.length > 0;
                  const isConfirmingDelete = confirmDeleteContactId === contact.id;

                  return (
                    <tr key={contact.id} className={isSelected ? 'crm-row-selected' : ''}>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectContact(contact.id)}
                        />
                      </td>
                      <td>
                        <OfficialProtocolBadge type={contact.type} />
                      </td>
                      <td>
                        <div className="crm-channel-name-cell">
                          <strong className="crm-channel-title">{contact.label}</strong>
                          <span className="crm-channel-sub">{contact.id}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div className="crm-endpoint-primary-row">
                            <span className="crm-endpoint-val-text">{contact.value}</span>
                            <button
                              type="button"
                              className="crm-endpoint-copy-icon-btn"
                              title={`Copy ${contact.value}`}
                              onClick={() => handleCopyValue(contact.value, `contact-${contact.id}`, contact.label)}
                            >
                              {isCopied ? <Check size={11} color="#0ECB81" /> : <Copy size={11} />}
                            </button>
                          </div>

                          {hasExtras && (
                            <div className="crm-endpoint-extra-list">
                              {contact.extraValues.map((extraVal, exIdx) => {
                                const exCopied = copiedKey === `contact-${contact.id}-extra-${exIdx}`;
                                return (
                                  <div key={exIdx} className="crm-endpoint-extra-row">
                                    <span className="crm-endpoint-extra-bullet">•</span>
                                    <span className="crm-endpoint-extra-val-text">{extraVal}</span>
                                    <button
                                      type="button"
                                      className="crm-endpoint-copy-icon-btn"
                                      onClick={() => handleCopyValue(extraVal, `contact-${contact.id}-extra-${exIdx}`, `${contact.label} (#${exIdx + 2})`)}
                                      title="Copy additional value"
                                    >
                                      {exCopied ? <Check size={10} color="#0ECB81" /> : <Copy size={10} />}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {contact.isPrimary ? (
                          <span className="crm-status-primary-badge">
                            ★ Primary
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="crm-btn-set-primary"
                            onClick={() => handleSetPrimaryContact(contact.id, contact.type)}
                            title="Designate as primary channel"
                          >
                            Set Primary
                          </button>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {isConfirmingDelete ? (
                          <div className="crm-inline-confirm-del-box">
                            <span className="crm-del-prompt">Delete?</span>
                            <button
                              type="button"
                              className="crm-del-btn-confirm"
                              onClick={() => executeDeleteContact(contact.id)}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className="crm-del-btn-cancel"
                              onClick={() => setConfirmDeleteContactId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="crm-actions-cluster">
                            <button
                              type="button"
                              className="crm-action-btn crm-action-change"
                              onClick={() => openEditContactModal(contact)}
                              title="Change channel details, protocol, or endpoints"
                            >
                              <Edit size={12} />
                              <span>Change</span>
                            </button>
                            <button
                              type="button"
                              className="crm-action-btn crm-action-delete"
                              onClick={() => setConfirmDeleteContactId(contact.id)}
                              title="Delete this contact channel"
                            >
                              <Trash2 size={12} />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Physical Headquarters Section - Leads Table Design */}
          <div style={{ marginTop: 12 }}>
            <div className="crm-settings-section-head" style={{ marginBottom: 12 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: 13, color: '#EAECEF', fontWeight: 600 }}>📍 Physical Office Locations</h4>
                <p style={{ margin: '3px 0 0 0', fontSize: 11.5, color: '#848E9C' }}>Rendered in footer, contact modals, and geo-navigation.</p>
              </div>
            </div>

            <div className="crm-admin-table-container">
              <table className="crm-admin-table">
                <thead>
                  <tr>
                    <th style={{ width: 220 }}>Office Location</th>
                    <th>Full Physical Address</th>
                    <th style={{ width: 120 }}>Designation</th>
                    <th style={{ width: 100, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {siteConfig.addresses.map((addr, idx) => {
                    const isAddrCopied = copiedKey === `addr-${addr.id}`;
                    return (
                      <tr key={addr.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#EAECEF' }}>{addr.label}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="text"
                              className="crm-settings-input"
                              value={addr.fullAddress}
                              onChange={e => {
                                const updated = [...siteConfig.addresses];
                                updated[idx] = { ...addr, fullAddress: e.target.value };
                                updateField('addresses', updated);
                              }}
                              style={{ flex: 1, minWidth: 240 }}
                            />
                            <button
                              title={addr.fullAddress}
                              onClick={() => handleCopyValue(addr.fullAddress, `addr-${addr.id}`, addr.label)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: isAddrCopied ? '#0ECB81' : '#848E9C',
                                padding: '2px 4px',
                                lineHeight: 1,
                                borderRadius: 3,
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                              onMouseEnter={e => { if (!isAddrCopied) e.currentTarget.style.color = '#F0B90B'; }}
                              onMouseLeave={e => { if (!isAddrCopied) e.currentTarget.style.color = isAddrCopied ? '#0ECB81' : '#848E9C'; }}
                            >
                              {isAddrCopied ? <Check size={12} color="#0ECB81" /> : <i className="fas fa-copy" style={{ fontSize: 11 }}></i>}
                            </button>
                          </div>
                        </td>
                        <td>
                          {addr.isPrimary ? (
                            <span className="crm-status-badge crm-status-pending">HQ Hub</span>
                          ) : (
                            <span className="crm-status-badge crm-status-suspended">Regional</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="crm-super-admin-btn crm-super-admin-btn-small"
                            onClick={() => handleCopyValue(addr.fullAddress, `addr-${addr.id}`, addr.label)}
                          >
                            Copy
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Header Socials ──────────────────────────────────── */}
      {activeSubTab === 'socials' && (
        <div className="crm-settings-panel">
          <div className="crm-settings-section-head">
            <div>
              <h3><Share2 size={16} color="#2979F0" /> Header Social Profiles</h3>
              <p>Configure social presence icons rendered in the navigation header bar and footer directory.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { key: 'x', name: 'X (formerly Twitter)', defaultUrl: 'https://x.com/codexdynamics' },
              { key: 'linkedin', name: 'LinkedIn Company Profile', defaultUrl: 'https://linkedin.com/company/codexdynamics' },
              { key: 'github', name: 'GitHub Organization', defaultUrl: 'https://github.com/codexdynamix' },
              { key: 'instagram', name: 'Instagram Portfolio', defaultUrl: 'https://instagram.com/codexdynamics' },
              { key: 'facebook', name: 'Facebook Page', defaultUrl: 'https://facebook.com/codexdynamics' },
            ].map(social => {
              const item = siteConfig.headerSocials[social.key] || { enabled: false, url: social.defaultUrl, handle: '' };
              const isSocialCopied = copiedKey === `social-${social.key}`;

              return (
                <div key={social.key} className="crm-toggle-card">
                  <div className="crm-toggle-card-info" style={{ flex: 1 }}>
                    <div className="crm-toggle-card-title">
                      <Globe size={14} color="#848E9C" />
                      {social.name}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                      <input
                        type="text"
                        className="crm-settings-input"
                        placeholder={social.defaultUrl}
                        value={item.url}
                        disabled={!item.enabled}
                        onChange={e => {
                          const updated = {
                            ...siteConfig.headerSocials,
                            [social.key]: { ...item, url: e.target.value }
                          };
                          updateField('headerSocials', updated);
                        }}
                      />
                      {item.enabled && item.url && (
                        <button
                          type="button"
                          className={`crm-settings-copy-btn ${isSocialCopied ? 'copied' : ''}`}
                          onClick={() => handleCopyValue(item.url, `social-${social.key}`, social.name)}
                          title={isSocialCopied ? 'Copied!' : 'Copy URL'}
                          aria-label={`Copy URL for ${social.name}`}
                        >
                          {isSocialCopied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Standard Toggle Switch */}
                  <label className="crm-toggle-switch" title={`Toggle ${social.name}`}>
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => {
                        const updated = {
                          ...siteConfig.headerSocials,
                          [social.key]: { ...item, enabled: !item.enabled }
                        };
                        updateField('headerSocials', updated);
                      }}
                    />
                    <span className="crm-toggle-slider" />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 4. Layout & Modules ────────────────────────────────── */}
      {activeSubTab === 'layout' && (
        <div className="crm-settings-panel">
          <div className="crm-settings-section-head">
            <div>
              <h3><Layout size={16} color="#F0B90B" /> Section Ordering & Conversion Modules</h3>
              <p>Reorder homepage sequence, toggle feature sections on/off, and manage conversion floating docks.</p>
            </div>
          </div>

          {/* Section Sequence List */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#EAECEF', marginBottom: 10 }}>
              Homepage Section Sequence & Visibility
            </div>
            {siteConfig.sectionsOrder.map((secId, idx) => {
              const meta = DEFAULT_SECTIONS.find(s => s.id === secId) || { name: secId, desc: '' };
              const isVisible = siteConfig.sectionsVisibility[secId] !== false;

              return (
                <div key={secId} className="crm-order-item">
                  <div className="crm-order-title">
                    <span style={{ fontSize: 11, color: '#848E9C', fontFamily: 'monospace', width: 22 }}>
                      0{idx + 1}
                    </span>
                    <div>
                      <div style={{ color: isVisible ? '#EAECEF' : '#5E6673', textDecoration: isVisible ? 'none' : 'line-through' }}>
                        {meta.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#707A8A' }}>{meta.desc}</div>
                    </div>
                  </div>

                  <div className="crm-order-actions">
                    <button
                      type="button"
                      className="crm-icon-btn"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, -1)}
                      title="Move section up"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      className="crm-icon-btn"
                      disabled={idx === siteConfig.sectionsOrder.length - 1}
                      onClick={() => moveSection(idx, 1)}
                      title="Move section down"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      className={`crm-icon-btn ${isVisible ? '' : 'danger'}`}
                      onClick={() => toggleSectionVisibility(secId)}
                      title={isVisible ? 'Hide section' : 'Show section'}
                    >
                      {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating WhatsApp Dock */}
          <div className="crm-settings-well">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: 13, color: '#EAECEF', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MessageCircle size={15} color="#0ECB81" />
                  Floating WhatsApp Dock
                </strong>
                <p style={{ margin: '2px 0 0 0', fontSize: 11.5, color: '#848E9C' }}>
                  A persistent floating contact button for instant visitor conversations.
                </p>
              </div>

              {/* Standard Toggle Switch */}
              <label className="crm-toggle-switch" title="Toggle WhatsApp dock">
                <input
                  type="checkbox"
                  checked={siteConfig.whatsappDock.enabled}
                  onChange={() => updateNestedField('whatsappDock', 'enabled', !siteConfig.whatsappDock.enabled)}
                />
                <span className="crm-toggle-slider" />
              </label>
            </div>

            {siteConfig.whatsappDock.enabled && (
              <div className="crm-form-grid-2" style={{ paddingTop: 10, borderTop: '1px solid #444A55' }}>
                <div className="crm-settings-field">
                  <label>WhatsApp Number (international format)</label>
                  <input
                    type="text"
                    className="crm-settings-input"
                    value={siteConfig.whatsappDock.number}
                    onChange={e => updateNestedField('whatsappDock', 'number', e.target.value)}
                    placeholder="+380636406783"
                  />
                </div>
                <div className="crm-settings-field">
                  <label>Prefilled Greeting Message</label>
                  <input
                    type="text"
                    className="crm-settings-input"
                    value={siteConfig.whatsappDock.defaultMessage}
                    onChange={e => updateNestedField('whatsappDock', 'defaultMessage', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 5. SEO & Search ────────────────────────────────────── */}
      {activeSubTab === 'seo' && (
        <div className="crm-settings-panel">
          <div className="crm-settings-section-head">
            <div>
              <h3><Search size={16} color="#F0B90B" /> Search Engine Optimization & Social Sharing</h3>
              <p>Configure search snippet tags, metadata descriptions, and OpenGraph social card previews.</p>
            </div>
          </div>

          <div className="crm-form-grid-2">
            <div className="crm-settings-field">
              <label>
                Meta Title
                <span className="crm-field-hint">{siteConfig.seo.metaTitle.length}/60 characters</span>
              </label>
              <input
                type="text"
                className="crm-settings-input"
                value={siteConfig.seo.metaTitle}
                onChange={e => updateNestedField('seo', 'metaTitle', e.target.value)}
              />
            </div>

            <div className="crm-settings-field">
              <label>Canonical Site URL</label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input
                  type="text"
                  className="crm-settings-input"
                  value={siteConfig.seo.canonicalUrl}
                  onChange={e => updateNestedField('seo', 'canonicalUrl', e.target.value)}
                  placeholder="https://codexdynamics.com"
                />
                <button
                  type="button"
                  className={`crm-settings-copy-btn ${copiedKey === 'canonical' ? 'copied' : ''}`}
                  onClick={() => handleCopyValue(siteConfig.seo.canonicalUrl, 'canonical', 'Canonical URL')}
                  title={copiedKey === 'canonical' ? 'Copied!' : 'Copy Canonical URL'}
                  aria-label="Copy Canonical URL"
                >
                  {copiedKey === 'canonical' ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>

          <div className="crm-settings-field">
            <label>
              Meta Description
              <span className="crm-field-hint">{siteConfig.seo.metaDescription.length}/160 characters</span>
            </label>
            <textarea
              className="crm-settings-textarea"
              rows={3}
              value={siteConfig.seo.metaDescription}
              onChange={e => updateNestedField('seo', 'metaDescription', e.target.value)}
            />
          </div>

          <div className="crm-form-grid-2">
            <div className="crm-settings-field">
              <label>Meta Keywords (comma-separated)</label>
              <input
                type="text"
                className="crm-settings-input"
                value={siteConfig.seo.keywords}
                onChange={e => updateNestedField('seo', 'keywords', e.target.value)}
              />
            </div>

            <div className="crm-settings-field">
              <label>OpenGraph Social Share Image URL</label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input
                  type="text"
                  className="crm-settings-input"
                  value={siteConfig.seo.ogImage}
                  onChange={e => updateNestedField('seo', 'ogImage', e.target.value)}
                  placeholder="/og.jpg"
                />
                <button
                  type="button"
                  className={`crm-settings-copy-btn ${copiedKey === 'ogImage' ? 'copied' : ''}`}
                  onClick={() => handleCopyValue(siteConfig.seo.ogImage, 'ogImage', 'OG Image URL')}
                  title={copiedKey === 'ogImage' ? 'Copied!' : 'Copy OG Image URL'}
                  aria-label="Copy OG Image URL"
                >
                  {copiedKey === 'ogImage' ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>

          {/* Google Search Live Preview */}
          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#848E9C', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Google Search Result Snippet Simulation
            </div>
            <div className="crm-google-preview">
              <div className="crm-google-url">
                <span>{siteConfig.seo.canonicalUrl}</span>
                <span style={{ color: '#5E6673' }}>› home</span>
              </div>
              <div className="crm-google-title">
                {siteConfig.seo.metaTitle}
              </div>
              <div className="crm-google-desc">
                {siteConfig.seo.metaDescription}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. Security & System ───────────────────────────────── */}
      {activeSubTab === 'security' && (
        <div className="crm-settings-panel">
          <div className="crm-settings-section-head">
            <div>
              <h3><Shield size={16} color="#0ECB81" /> CRM Security Invariants & Integration Webhooks</h3>
              <p>Manage authentication controls, outbound lead integration webhooks, and complete configuration snapshots.</p>
            </div>
          </div>

          {/* Security Invariant Toggles */}
          <div className="crm-form-grid-2">
            <div className="crm-toggle-card">
              <div className="crm-toggle-card-info">
                <div className="crm-toggle-card-title">Client Self-Registration</div>
                <div className="crm-toggle-card-desc">Permit prospective customers to register new client portal accounts.</div>
              </div>
              <label className="crm-toggle-switch" title="Toggle Client Self-Registration">
                <input
                  type="checkbox"
                  checked={siteConfig.security.registrationEnabled}
                  onChange={() => updateNestedField('security', 'registrationEnabled', !siteConfig.security.registrationEnabled)}
                />
                <span className="crm-toggle-slider" />
              </label>
            </div>

            <div className="crm-toggle-card">
              <div className="crm-toggle-card-info">
                <div className="crm-toggle-card-title">Two-Factor Authentication (2FA)</div>
                <div className="crm-toggle-card-desc">Enforce two-factor verification codes on staff logins.</div>
              </div>
              <label className="crm-toggle-switch" title="Toggle Two-Factor Authentication">
                <input
                  type="checkbox"
                  checked={siteConfig.security.twoFactorAuthEnabled}
                  onChange={() => updateNestedField('security', 'twoFactorAuthEnabled', !siteConfig.security.twoFactorAuthEnabled)}
                />
                <span className="crm-toggle-slider" />
              </label>
            </div>
          </div>

          <div className="crm-form-grid-2">
            <div className="crm-settings-field">
              <label>Session Idle Timeout (minutes)</label>
              <input
                type="number"
                min={5}
                max={1440}
                className="crm-settings-input"
                value={siteConfig.security.sessionTimeoutMinutes}
                onChange={e => updateNestedField('security', 'sessionTimeoutMinutes', e.target.value)}
              />
            </div>

            <div className="crm-settings-field">
              <label>Max Failed Login Lockout Threshold</label>
              <input
                type="number"
                min={3}
                max={20}
                className="crm-settings-input"
                value={siteConfig.security.maxFailedLoginAttempts}
                onChange={e => updateNestedField('security', 'maxFailedLoginAttempts', e.target.value)}
              />
            </div>
          </div>

          {/* Webhook Settings */}
          <div className="crm-settings-well">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: 13, color: '#EAECEF', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Send size={14} color="#2979F0" />
                  Lead Integration Webhook
                </strong>
                <p style={{ margin: '2px 0 0 0', fontSize: 11.5, color: '#848E9C' }}>
                  Dispatches new inbound website consultation leads to Zapier, Make, or custom CRM APIs.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="url"
                className="crm-settings-input"
                style={{ flex: 1, minWidth: 260 }}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={siteConfig.security.webhookUrl}
                onChange={e => updateNestedField('security', 'webhookUrl', e.target.value)}
              />
              {siteConfig.security.webhookUrl && (
                <button
                  type="button"
                  className={`crm-settings-copy-btn ${copiedKey === 'webhook' ? 'copied' : ''}`}
                  onClick={() => handleCopyValue(siteConfig.security.webhookUrl, 'webhook', 'Webhook URL')}
                  title={copiedKey === 'webhook' ? 'Copied!' : 'Copy Webhook URL'}
                  aria-label="Copy Webhook URL"
                >
                  {copiedKey === 'webhook' ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
                </button>
              )}
              <button
                type="button"
                className="crm-btn-secondary"
                disabled={testingWebhook}
                onClick={handleTestWebhook}
              >
                <RefreshCw size={13} className={testingWebhook ? 'crm-spin' : ''} />
                <span>{testingWebhook ? 'Pinging...' : 'Send Test Ping'}</span>
              </button>
            </div>

            {webhookTestStatus && (
              <div style={{
                marginTop: 6,
                fontSize: 12,
                color: webhookTestStatus.success ? '#0ECB81' : '#F6465D',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                {webhookTestStatus.success ? <CheckCircle2 size={13} /> : <HelpCircle size={13} />}
                <span>{webhookTestStatus.message}</span>
              </div>
            )}
          </div>

          {/* Admin Password Change */}
          <div className="crm-settings-well">
            <div style={{ fontSize: 13, fontWeight: 600, color: '#EAECEF', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Lock size={14} color="#F0B90B" />
              Update Super Admin Password
            </div>
            <form onSubmit={handleChangePassword} className="crm-form-grid-3">
              <div className="crm-settings-field">
                <label>Current Password</label>
                <input
                  type="password"
                  className="crm-settings-input"
                  value={passwordState.currentPassword}
                  onChange={e => setPasswordState(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>

              <div className="crm-settings-field">
                <label>New Password</label>
                <input
                  type="password"
                  className="crm-settings-input"
                  value={passwordState.newPassword}
                  onChange={e => setPasswordState(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="crm-settings-field">
                <label>Confirm New Password</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="password"
                    className="crm-settings-input"
                    value={passwordState.confirmPassword}
                    onChange={e => setPasswordState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Repeat password"
                  />
                  <button type="submit" className="crm-btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Backup & Restore Data */}
          <div className="crm-settings-well">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div>
                <strong style={{ fontSize: 13, color: '#EAECEF' }}>Configuration Snapshots & Portability</strong>
                <p style={{ margin: '2px 0 0 0', fontSize: 11.5, color: '#848E9C' }}>
                  Export full website and CRM parameters as a JSON backup, or restore previous configuration states.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="crm-btn-secondary" onClick={handleExportBackup}>
                  <Download size={13} />
                  <span>Export JSON</span>
                </button>

                <button
                  type="button"
                  className="crm-btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={13} />
                  <span>Restore JSON</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  style={{ display: 'none' }}
                  onChange={handleImportBackup}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Contact Modal ──────────────────────────── */}
      {contactModalOpen && (
        <div className="crm-settings-modal-backdrop" onClick={() => setContactModalOpen(false)}>
          <div className="crm-settings-modal-card" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="crm-settings-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(14, 203, 129, 0.15)',
                  border: '1px solid rgba(14, 203, 129, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {editingContactId ? <Edit size={16} color="#0ECB81" /> : <Plus size={16} color="#0ECB81" />}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#EAECEF' }}>
                    {editingContactId ? 'Change Communication Channel' : '+ Add Communication Channel'}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: '#848E9C' }}>
                    Configure protocol, official badge, and multiple endpoints on this item
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="crm-icon-btn"
                onClick={() => setContactModalOpen(false)}
                title="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form with scrollable body and fixed sticky footer */}
            <form
              onSubmit={handleSaveContactSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              <div className="crm-settings-modal-body">
                {/* 1. Protocol Visual Grid */}
                <div className="crm-settings-field">
                  <label style={{ marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Official Channel Protocol</span>
                    <span style={{ fontSize: 11, color: '#848E9C', fontWeight: 'normal' }}>
                      Selected: <strong style={{ color: '#EAECEF' }}>{PROTOCOL_OPTIONS.find(p => p.id === contactForm.type)?.name || contactForm.type}</strong>
                    </span>
                  </label>
                  <div className="crm-protocol-chips-grid">
                    {PROTOCOL_OPTIONS.map(proto => {
                      const isActive = contactForm.type === proto.id;
                      const LogoComponent = proto.Logo;
                      return (
                        <button
                          key={proto.id}
                          type="button"
                          className={`crm-protocol-chip-btn ${isActive ? 'active' : ''}`}
                          style={isActive ? { borderColor: proto.color, color: '#EAECEF' } : {}}
                          onClick={() => {
                            setContactForm(prev => ({
                              ...prev,
                              type: proto.id,
                              label: prev.label ? prev.label : `${proto.name} Support`
                            }));
                          }}
                        >
                          <LogoComponent className="crm-chip-logo" />
                          <span>{proto.name}</span>
                          {isActive && <Check size={12} color={proto.color} style={{ marginLeft: 'auto' }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Descriptive Label */}
                <div className="crm-settings-field">
                  <label>Descriptive Label</label>
                  <input
                    type="text"
                    className="crm-settings-input"
                    placeholder="e.g. London Office Direct, VIP Customer Desk, Sales Line"
                    value={contactForm.label}
                    onChange={e => setContactForm(prev => ({ ...prev, label: e.target.value }))}
                  />
                  <span style={{ fontSize: 11, color: '#6C7584', marginTop: 3 }}>
                    Internal and public name for this communication line.
                  </span>
                </div>

                {/* 3. Primary Contact Value */}
                {(() => {
                  const currentProto = PROTOCOL_OPTIONS.find(p => p.id === contactForm.type) || PROTOCOL_OPTIONS[0];
                  return (
                    <div className="crm-settings-field">
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Primary {currentProto.name} Endpoint / Value *</span>
                        <span style={{ fontSize: 11, color: '#848E9C', fontWeight: 'normal' }}>{currentProto.hint}</span>
                      </label>
                      <input
                        type="text"
                        className="crm-settings-input"
                        placeholder={`e.g. ${currentProto.placeholder}`}
                        value={contactForm.value}
                        onChange={e => setContactForm(prev => ({ ...prev, value: e.target.value }))}
                        required
                      />
                    </div>
                  );
                })()}

                {/* 4. Multiple Endpoints / Numbers on this Item (Add More) */}
                <div className="crm-modal-extras-card">
                  <div className="crm-modal-extras-header">
                    <div>
                      <h4 className="crm-modal-extras-title">
                        Multiple Endpoints / Numbers
                        <span className="crm-modal-extras-count">
                          {(contactForm.extraValues?.length || 0) + 1} total
                        </span>
                      </h4>
                      <p className="crm-modal-extras-desc">
                        Add extra telephone numbers, WhatsApp lines, backup email inboxes, or handles to this single contact item.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="crm-btn-add-extra-val"
                      onClick={handleAddModalExtraValue}
                    >
                      <Plus size={13} />
                      <span>+ Add More</span>
                    </button>
                  </div>

                  {contactForm.extraValues && contactForm.extraValues.length > 0 ? (
                    <div className="crm-modal-extras-list">
                      {contactForm.extraValues.map((val, idx) => (
                        <div key={idx} className="crm-modal-extra-item">
                          <span className="crm-modal-extra-tag">#{idx + 2}</span>
                          <input
                            type="text"
                            className="crm-settings-input"
                            style={{ flex: 1 }}
                            placeholder={`Additional ${PROTOCOL_OPTIONS.find(p => p.id === contactForm.type)?.name || ''} endpoint #${idx + 2}`}
                            value={val}
                            onChange={e => handleUpdateModalExtraValue(idx, e.target.value)}
                          />
                          <button
                            type="button"
                            className="crm-modal-extra-del-btn"
                            onClick={() => handleRemoveModalExtraValue(idx)}
                            title="Remove this additional value"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="crm-modal-extras-empty">
                      Currently 1 endpoint. Click <strong style={{ color: '#F0B90B' }}>"+ Add More"</strong> above to attach additional telephone numbers, WhatsApp lines, or inboxes to this channel.
                    </div>
                  )}
                </div>

                {/* 5. Primary Designation Switch */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: '#2B313A',
                  borderRadius: 8,
                  border: '1px solid #444A55'
                }}>
                  <div>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: '#EAECEF', display: 'block' }}>
                      Designate as Primary {PROTOCOL_OPTIONS.find(p => p.id === contactForm.type)?.name || contactForm.type} Channel
                    </span>
                    <span style={{ fontSize: 11, color: '#848E9C' }}>
                      Features prominently across header CTA buttons, hero section, and quick dials.
                    </span>
                  </div>
                  <label className="crm-toggle-switch">
                    <input
                      type="checkbox"
                      checked={contactForm.isPrimary}
                      onChange={e => setContactForm(prev => ({ ...prev, isPrimary: e.target.checked }))}
                    />
                    <span className="crm-toggle-slider" />
                  </label>
                </div>
              </div>

              {/* Fixed Sticky Footer - Guaranteed to fit on any screen */}
              <div className="crm-settings-modal-footer">
                {editingContactId ? (
                  <button
                    type="button"
                    className="crm-action-btn crm-action-delete"
                    style={{ padding: '8px 14px' }}
                    onClick={() => {
                      executeDeleteContact(editingContactId);
                      setContactModalOpen(false);
                    }}
                    title="Delete this contact channel"
                  >
                    <Trash2 size={13} />
                    <span>Delete Channel</span>
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button
                    type="button"
                    className="crm-btn-secondary"
                    style={{ padding: '8px 16px', borderRadius: 8 }}
                    onClick={() => setContactModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="crm-btn-primary"
                    style={{
                      padding: '8px 20px',
                      borderRadius: 8,
                      background: '#0ECB81',
                      color: '#0B111A',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Check size={15} strokeWidth={2.5} />
                    <span>{editingContactId ? 'Save Changes' : 'Add Channel'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
