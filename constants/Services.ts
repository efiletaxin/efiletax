export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  color: string;
  category: 'tax' | 'gst' | 'registration' | 'compliance' | 'accounting';
  features: string[];
  documents: string[];
  startingPrice: string;
  duration: string;
}

export const SERVICES: Service[] = [
  {
    id: 'itr-filing',
    title: 'ITR Filing',
    shortDesc: 'File your Income Tax Return accurately & on time',
    description:
      'We help individuals, professionals, and businesses file their Income Tax Returns (ITR) accurately and on time. Our experts ensure maximum deductions and compliance with the latest tax laws.',
    icon: 'document-text',
    color: '#1A3C8F',
    category: 'tax',
    features: [
      'All ITR forms (ITR-1 to ITR-7)',
      'Salary, Business & Capital Gains',
      'Tax computation & optimization',
      'Form 26AS reconciliation',
      'Refund tracking',
      'Expert review before filing',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card',
      'Form 16 / Salary Slips',
      'Bank Statements',
      'Investment proofs (80C, 80D, etc.)',
      'Previous year ITR (if any)',
    ],
    startingPrice: '₹499',
    duration: '1-2 business days',
  },
  {
    id: 'gst-registration',
    title: 'GST Registration',
    shortDesc: 'Get your GSTIN in 3-5 working days',
    description:
      'Register your business under GST to legally collect tax from customers. Mandatory for businesses with turnover exceeding ₹20 lakhs (₹10 lakhs for special category states).',
    icon: 'business',
    color: '#F97316',
    category: 'gst',
    features: [
      'New GST registration',
      'Regular & Composition scheme',
      'GSTIN in 3-5 working days',
      'Digital signature assistance',
      'Post-registration support',
      'GST certificate download',
    ],
    documents: [
      'PAN Card of business/proprietor',
      'Aadhaar Card',
      'Business address proof',
      'Bank account details',
      'Business registration certificate',
      'Photographs',
    ],
    startingPrice: '₹999',
    duration: '3-5 business days',
  },
  {
    id: 'gst-return',
    title: 'GST Return Filing',
    shortDesc: 'Monthly & quarterly GST return filing',
    description:
      'Timely GST return filing to avoid penalties. We handle GSTR-1, GSTR-3B, GSTR-9 and all other GST returns for your business.',
    icon: 'receipt',
    color: '#10B981',
    category: 'gst',
    features: [
      'GSTR-1, GSTR-3B filing',
      'GSTR-9 annual return',
      'Input Tax Credit reconciliation',
      'Late fee & penalty avoidance',
      'GST audit support',
      'Dedicated relationship manager',
    ],
    documents: [
      'Sales invoices',
      'Purchase invoices',
      'Credit/Debit notes',
      'Bank statements',
      'Previous GST returns',
    ],
    startingPrice: '₹799/month',
    duration: 'Ongoing',
  },
  {
    id: 'company-registration',
    title: 'Company Registration',
    shortDesc: 'Register your Private Limited Company',
    description:
      'Start your business journey with a legally registered Private Limited Company under The Companies Act, 2013. Get your Certificate of Incorporation quickly.',
    icon: 'briefcase',
    color: '#8B5CF6',
    category: 'registration',
    features: [
      'Private Limited Company',
      'LLP Registration',
      'OPC (One Person Company)',
      'Section 8 (NGO)',
      'DSC & DIN included',
      'MOA & AOA drafting',
    ],
    documents: [
      'PAN Card of directors',
      'Aadhaar Card of directors',
      'Address proof of directors',
      'Registered office address proof',
      'NOC from property owner',
      'Passport-size photographs',
    ],
    startingPrice: '₹4,999',
    duration: '7-10 business days',
  },
  {
    id: 'udyam-registration',
    title: 'Udyam Registration',
    shortDesc: 'MSME / Udyog Aadhaar registration for small businesses',
    description:
      'Get your Udyam Registration Certificate and enjoy benefits like priority sector lending, government subsidies, and protection against delayed payments.',
    icon: 'star',
    color: '#EF4444',
    category: 'registration',
    features: [
      'Udyam Registration Certificate',
      'MSME benefits eligibility',
      'Priority sector lending',
      'Subsidy eligibility',
      'Collateral-free loans',
      'Government scheme access',
    ],
    documents: [
      'Aadhaar Card of proprietor/partner/director',
      'PAN Card',
      'Business bank account details',
      'GSTIN (if applicable)',
    ],
    startingPrice: '₹299',
    duration: '1-2 business days',
  },
  {
    id: 'tds-return',
    title: 'TDS Return Filing',
    shortDesc: 'Quarterly TDS return filing (24Q, 26Q, 27Q)',
    description:
      'File your TDS returns accurately and on time to avoid penalties. We handle all types of TDS returns including salary, non-salary, and NRI payments.',
    icon: 'calculator',
    color: '#0EA5E9',
    category: 'tax',
    features: [
      '24Q (Salary TDS)',
      '26Q (Non-salary TDS)',
      '27Q (NRI payments)',
      'Challan reconciliation',
      'TDS certificate generation',
      'Correction returns',
    ],
    documents: [
      'TAN Certificate',
      'PAN of deductees',
      'TDS challan details',
      'Salary / payment details',
      'Previous TDS returns',
    ],
    startingPrice: '₹999/quarter',
    duration: '2-3 business days',
  },
  {
    id: 'bookkeeping',
    title: 'Accounting & Bookkeeping',
    shortDesc: 'Professional accounting for your business',
    description:
      'Maintain accurate financial records with our professional bookkeeping and accounting services. Get monthly P&L, balance sheet, and financial insights.',
    icon: 'bar-chart',
    color: '#F59E0B',
    category: 'accounting',
    features: [
      'Monthly bookkeeping',
      'P&L statement',
      'Balance sheet preparation',
      'Bank reconciliation',
      'Accounts payable/receivable',
      'Financial MIS reports',
    ],
    documents: [
      'Bank statements',
      'Sales invoices',
      'Purchase bills',
      'Expense vouchers',
      'Payroll records',
    ],
    startingPrice: '₹1,999/month',
    duration: 'Ongoing',
  },
  {
    id: 'annual-compliance',
    title: 'Annual Compliance',
    shortDesc: 'ROC filing & annual compliance for companies',
    description:
      'Stay compliant with all statutory requirements. We handle ROC filings, annual returns, director KYC, and other annual compliance requirements for your company.',
    icon: 'shield-checkmark',
    color: '#6366F1',
    category: 'compliance',
    features: [
      'MGT-7 Annual Return',
      'AOC-4 Financial Statements',
      'Director KYC (DIR-3)',
      'ADT-1 Auditor appointment',
      'Board meeting compliance',
      'Statutory audit support',
    ],
    documents: [
      'Certificate of Incorporation',
      'MOA & AOA',
      'Financial statements',
      'Board resolutions',
      'Director details',
      'Auditor report',
    ],
    startingPrice: '₹3,999/year',
    duration: '5-7 business days',
  },
  {
    id: 'import-export',
    title: 'Import Export Code',
    shortDesc: 'IEC registration for international trade',
    description:
      'Get your Import Export Code (IEC) to start importing or exporting goods and services. Mandatory for all businesses engaged in international trade.',
    icon: 'globe',
    color: '#14B8A6',
    category: 'registration',
    features: [
      'IEC registration',
      'DGFT portal filing',
      'Digital signature',
      'Customs clearance guidance',
      'Export benefits advisory',
      'Modification support',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card / Voter ID',
      'Business address proof',
      'Bank account certificate',
      'Photograph',
    ],
    startingPrice: '₹1,499',
    duration: '3-5 business days',
  },
];

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', icon: 'grid' },
  { id: 'tax', label: 'Income Tax', icon: 'document-text' },
  { id: 'gst', label: 'GST', icon: 'receipt' },
  { id: 'registration', label: 'Registration', icon: 'business' },
  { id: 'compliance', label: 'Compliance', icon: 'shield-checkmark' },
  { id: 'accounting', label: 'Accounting', icon: 'bar-chart' },
];
