export interface Photo {
  id: string;
  created_at?: string | null;
  urls: ImageUrls;
  blur_hash?: string | null;
  liked_by_user?: boolean;
  likes?: number;
  width?: number;
  height?: number;
  alt_description?: string;
  categories?: object[];
  description?: string | null;
  exif?: object;
  location?: object;
  tags?: object[];
  current_user_collections?: object[];
  color?: string | null;
  downloads?: number;
  links?: object;
  updated_at?: string | null;
  promoted_at?: string;
  user?: object;
  sponsorship?: any;
}

interface ImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
