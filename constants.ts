import { PricingTier, Service, SiteContent, PortfolioItem } from './types';

export const INITIAL_CONTENT: SiteContent = {
  branding: {
    logoUrl: "https://i.ibb.co/mFhdSdm4/Logo.png",
  },
  hero: {
    title: "Future-Proof Your Brand with AI Publicity",
    subtitle: "We blend cutting-edge AI agents, cinematic storytelling, and viral marketing strategies to automate your growth and dominate your niche.",
    ctaText: "Start Your Transformation",
  },
  about: {
    mission: "To democratize access to high-end media production and business automation through artificial intelligence.",
    vision: "A world where creativity meets efficiency, allowing businesses to scale their voice without scaling their overhead.",
  },
  contact: {
    email: "faizbaig2000@gmail.com",
    phone: "+1 (365) 866-8824",
    address: "Toronto, Canada",
  },
  colors: {
    primary: "from-indigo-950 via-purple-900 to-slate-950",
    secondary: "cyan-400",
  }
};

export const SERVICES_LIST: Service[] = [
  { title: "AI Animation", description: "Stunning, style-transferred animations that capture attention immediately.", iconName: "Video" },
  { title: "AI Agents", description: "Intelligent voice and chat agents to handle inbound/outbound calls and booking.", iconName: "Bot" },
  { title: "Viral Content", description: "Meme-style marketing and short-form video optimized for algorithmic reach.", iconName: "Zap" },
  { title: "Social Management", description: "Full-service handling of your digital presence, DMs, and community.", iconName: "Share2" },
  { title: "Scriptwriting", description: "Data-driven scripts generated to maximize engagement and retention.", iconName: "PenTool" },
  { title: "Business Integration", description: "Seamlessly integrating AI workflows into your existing CRM and sales processes.", iconName: "Cpu" },
];

export const PRICING_SOCIAL: PricingTier[] = [
  {
    name: "Starter Pack",
    price: "$199/mo",
    originalPrice: "$249/mo",
    setupFee: "$50 one-time onboarding fee",
    features: [
      "3 cinematic videos/mo",
      "1 free ad campaign",
      "3 posts/week",
      "DM & comment replies"
    ]
  },
  {
    name: "Intermediate Pack",
    price: "$359/mo",
    originalPrice: "$449/mo",
    setupFee: "$50 one-time onboarding fee",
    features: [
      "6 cinematic videos/mo",
      "2 free ad campaigns + $10 weekly ad credit",
      "Daily posting (IG & TikTok)",
      "Full page revamp",
      "DM & comment management"
    ]
  },
  {
    name: "Pro Pack",
    price: "$799/mo",
    originalPrice: "$999/mo",
    setupFee: "No onboarding fee",
    features: [
      "12 cinematic videos",
      "4 ad campaigns + $20 weekly credit",
      "Daily posting across 5 platforms",
      "Full setup + full revamp + logo",
      "Full DM/comment management"
    ],
    highlight: true
  }
];

export const PRICING_AI_AGENT: PricingTier[] = [
  {
    name: "AI Starter Pack",
    price: "$159/mo",
    originalPrice: "$199/mo",
    setupFee: "$249 setup fee",
    features: [
      "Inbound calls (300/mo)",
      "Appointment booking",
      "Lead capture + reports"
    ]
  },
  {
    name: "AI Business Pack",
    price: "$319/mo",
    originalPrice: "$399/mo",
    setupFee: "$249 setup fee",
    features: [
      "Inbound + outbound calling",
      "Smart scheduling",
      "Advanced qualification",
      "CRM integrations"
    ],
    highlight: true
  },
  {
    name: "AI Pro Automation",
    price: "$639/mo",
    originalPrice: "$799/mo",
    setupFee: "$249 setup fee",
    features: [
      "Unlimited calls",
      "Custom flows + CRM",
      "Full automation workflows",
      "Daily dashboard + strategy call"
    ]
  }
];

export const PRICING_BUNDLES: PricingTier[] = [
  {
    name: "Growth Pack",
    price: "$479/mo",
    originalPrice: "$599/mo",
    features: [
      "Starter social content",
      "AI inbound calling + scheduling",
      "3 videos/mo",
      "1 Ad Campaign"
    ]
  },
  {
    name: "Business Expansion",
    price: "$719/mo",
    originalPrice: "$899/mo",
    features: [
      "Intermediate content",
      "Inbound + outbound AI",
      "6 videos/mo",
      "2 Ad Campaigns"
    ],
    highlight: true
  },
  {
    name: "Brand Domination",
    price: "$1,199/mo",
    originalPrice: "$1,499/mo",
    features: [
      "Pro-level content",
      "Full AI automation suite",
      "12 videos/mo",
      "4 Ad Campaigns",
      "Up to 5 platforms"
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Neon Future Campaign", category: "AI Animation", imageUrl: "https://picsum.photos/seed/neon/600/400" },
  { id: 2, title: "TechTalks Daily", category: "Social Media", imageUrl: "https://picsum.photos/seed/tech/600/400" },
  { id: 3, title: "EcoSmart Rebrand", category: "Brand Strategy", imageUrl: "https://picsum.photos/seed/eco/600/400" },
  { id: 4, title: "Viral Meme Series", category: "Content Creation", imageUrl: "https://picsum.photos/seed/viral/600/400" },
  { id: 5, title: "Agent Smith Bot", category: "AI Integration", imageUrl: "https://picsum.photos/seed/bot/600/400" },
  { id: 6, title: "Luxury Estate Tour", category: "Video Production", imageUrl: "https://picsum.photos/seed/estate/600/400" },
];