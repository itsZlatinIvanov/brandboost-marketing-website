// Media library service for managing uploaded images and other assets

const MEDIA_STORAGE_KEY = 'clyc_media_library';

export type MediaAsset = {
  id: string;
  name: string;
  type: 'image' | 'logo' | 'icon';
  url: string; // Base64 or URL
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
  };
  size: number; // in bytes
  dateAdded: number; // timestamp
  lastUsed?: number; // timestamp when last selected
  usageCount: number; // how many times it's been used
};

// Get all media assets
export const getAllMedia = (): MediaAsset[] => {
  try {
    const mediaJson = localStorage.getItem(MEDIA_STORAGE_KEY);
    return mediaJson ? JSON.parse(mediaJson) : [];
  } catch (error) {
    console.error('Error loading media library:', error);
    return [];
  }
};

// Save the entire media library
export const saveMediaLibrary = (media: MediaAsset[]): void => {
  try {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
  } catch (error) {
    console.error('Error saving media library:', error);
  }
};

// Add a new asset to the library
export const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'dateAdded' | 'usageCount'>): MediaAsset => {
  const media = getAllMedia();
  
  // Generate a unique ID for the asset
  const id = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const newAsset: MediaAsset = {
    ...asset,
    id,
    dateAdded: Date.now(),
    usageCount: 0
  };
  
  media.push(newAsset);
  saveMediaLibrary(media);
  
  return newAsset;
};

// Get a specific asset by ID
export const getMediaAssetById = (id: string): MediaAsset | undefined => {
  const media = getAllMedia();
  return media.find(asset => asset.id === id);
};

// Update an existing asset
export const updateMediaAsset = (id: string, updates: Partial<MediaAsset>): MediaAsset | undefined => {
  const media = getAllMedia();
  const index = media.findIndex(asset => asset.id === id);
  
  if (index !== -1) {
    media[index] = { ...media[index], ...updates };
    saveMediaLibrary(media);
    return media[index];
  }
  
  return undefined;
};

// Delete an asset
export const deleteMediaAsset = (id: string): void => {
  const media = getAllMedia();
  const updatedMedia = media.filter(asset => asset.id !== id);
  
  if (updatedMedia.length !== media.length) {
    saveMediaLibrary(updatedMedia);
  }
};

// Track asset usage
export const trackAssetUsage = (id: string): void => {
  const media = getAllMedia();
  const index = media.findIndex(asset => asset.id === id);
  
  if (index !== -1) {
    media[index] = {
      ...media[index],
      lastUsed: Date.now(),
      usageCount: (media[index].usageCount || 0) + 1
    };
    saveMediaLibrary(media);
  }
};

// Search media by name or tags
export const searchMedia = (query: string): MediaAsset[] => {
  if (!query) return getAllMedia();
  
  const media = getAllMedia();
  const lowerQuery = query.toLowerCase();
  
  return media.filter(asset => 
    asset.name.toLowerCase().includes(lowerQuery) || 
    asset.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Filter media by type
export const filterMediaByType = (type: MediaAsset['type']): MediaAsset[] => {
  const media = getAllMedia();
  return media.filter(asset => asset.type === type);
};

// Get recently used assets (limit by count)
export const getRecentlyUsedMedia = (limit = 5): MediaAsset[] => {
  const media = getAllMedia();
  
  return media
    .filter(asset => asset.lastUsed)
    .sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0))
    .slice(0, limit);
};

// Get most used assets
export const getMostUsedMedia = (limit = 5): MediaAsset[] => {
  const media = getAllMedia();
  
  return media
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
}; 