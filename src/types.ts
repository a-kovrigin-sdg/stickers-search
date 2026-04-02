export type TagEntry = {
  reference: string;
  keywords: Record<string, string>;
};

export type StickerItem = {
  name: string;
  image: string;
  smallImage: string;
  animation?: string;
  animationPreview?: string;
  linkedCheer?: string;
};

export type StickerPack = {
  name: string;
  icon?: {
    name: string;
  };
  credits: number;
  isBought: boolean;
  labels: string[];
  stickers: StickerItem[];
};

export type StickersPayload = {
  items: StickerPack[];
};

export type StickerDocument = {
  id: string;
  stickerName: string;
  packName: string;
  reference: string;
  image: string;
  smallImage: string;
  labels: string;
  credits: number;
  isBought: boolean;
  keywordsText: string;
};

export type IndexField = "stickerName" | "packName" | "keywordsText";

export type StoreField =
  | "stickerName"
  | "packName"
  | "image"
  | "smallImage"
  | "labels"
  | "credits"
  | "isBought"
  | "reference";

export type CombineWith = "AND" | "OR";
