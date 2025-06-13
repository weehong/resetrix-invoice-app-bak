export type OpenGraphImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type OpenGraphConfig = {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  locale: string;
  type: string;
};

export type TwitterConfig = {
  card: string;
  title: string;
  description: string;
  images: string[];
  creator: string;
};

export type IconsConfig = {
  icon: string;
  apple: string;
  shortcut: string;
  other: Array<{
    rel: string;
    url: string;
    color: string;
  }>;
};

export type ThemeColorConfig = Array<{
  media: string;
  color: string;
}>;

export type RobotsConfig = {
  index: boolean;
  follow: boolean;
  nocache: boolean;
  noimageindex: boolean;
  noarchive: boolean;
  nosnippet: boolean;
};

export type VerificationConfig = {
  google?: string;
  yandex?: string;
  me?: string;
  other?: Record<string, string>;
};

export type FormatDetectionConfig = {
  telephone: boolean;
  address: boolean;
  email: boolean;
  date: boolean;
  url: boolean;
};

export type AppleWebAppConfig = {
  capable: boolean;
  statusBarStyle: string;
  title: string;
  startupImage: string[];
};

export type ViewportConfig = {
  width: string;
  initialScale: number;
  maximumScale: number;
  userScalable: boolean;
  viewportFit: string;
};
