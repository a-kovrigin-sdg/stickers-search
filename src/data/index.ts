import packs from "./stickers.json";
import tags from "./tags.json";

const host = 'https://api5.dating.com';

const mappedStickers = packs.items.map(pack => {
  return {
    ...pack,
    stickers: pack.stickers.map(sticker => ({
      reference: `${pack.name}-${sticker.name}`,
      url: `${host}/${sticker.smallImage}`
    }))
  }
})

export { mappedStickers  as stickersPacks };
export { tags };