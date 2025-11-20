export interface PricingTier {
  name: string;
  price: string;
  originalPrice?: string;
  setupFee?: string;
  features: string[];
  highlight?: boolean;
}

export interface Service {
  title: string;
  description: string;
  iconName: string;
}

export interface SiteContent {
  branding: {
    logoUrl: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  about: {
    mission: string;
    vision: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}