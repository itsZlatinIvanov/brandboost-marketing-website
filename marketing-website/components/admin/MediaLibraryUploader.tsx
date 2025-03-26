import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, X, Image as ImageIcon, Search, Tag, Clock, Heart, Plus, Check, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getAllMedia, addMediaAsset, trackAssetUsage, filterMediaByType, searchMedia, getRecentlyUsedMedia, MediaAsset } from '@/services/mediaLibraryService';

interface MediaLibraryUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  accept?: string;
  maxSizeMB?: number;
  mediaType?: 'image' | 'logo' | 'icon';
}

export const MediaLibraryUploader = ({
  value,
  onChange,
  label,
  accept = 'image/jpeg, image/png, image/jpg',
  maxSizeMB = 2,
  mediaType = 'image'
}: MediaLibraryUploaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryMedia, setLibraryMedia] = useState<MediaAsset[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetTags, setNewAssetTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Load media when library is opened
  useEffect(() => {
    if (isLibraryOpen) {
      loadMedia();
    }
  }, [isLibraryOpen]);

  // Load media from the library
  const loadMedia = () => {
    if (searchQuery) {
      setLibraryMedia(searchMedia(searchQuery));
    } else {
      setLibraryMedia(getAllMedia());
    }
  };

  // Handle file selection for upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError(null);
    setIsUploading(true);
    setNewAssetName(file.name.split('.')[0]); // Default name from filename

    try {
      // Convert to base64
      const base64 = await fileToBase64(file);
      
      // Get image dimensions
      const dimensions = await getImageDimensions(base64);
      
      // Create a new asset object
      const newAsset = {
        name: newAssetName || file.name.split('.')[0],
        type: mediaType,
        url: base64,
        tags: newAssetTags.split(',').map(tag => tag.trim()).filter(Boolean),
        dimensions,
        size: file.size
      };
      
      // Show preview of the selected image
      setSelectedMedia({
        ...newAsset,
        id: 'preview',
        dateAdded: Date.now(),
        usageCount: 0
      } as MediaAsset);
      
    } catch (error) {
      console.error('Error processing file:', error);
      setError('Error processing the image');
    } finally {
      setIsUploading(false);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Get image dimensions
  const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = base64;
    });
  };

  // Save the new asset to the library
  const saveToLibrary = () => {
    if (!selectedMedia || !newAssetName) return;
    
    try {
      // Add the asset to the library
      const asset = addMediaAsset({
        name: newAssetName,
        type: mediaType,
        url: selectedMedia.url,
        tags: newAssetTags.split(',').map(tag => tag.trim()).filter(Boolean),
        dimensions: selectedMedia.dimensions,
        size: selectedMedia.size
      });
      
      // Update state
      onChange(asset.url);
      setIsLibraryOpen(false);
      setSelectedMedia(null);
      setNewAssetName('');
      setNewAssetTags('');
      
      toast({
        title: "Asset Added to Library",
        description: `${asset.name} has been added to your media library.`
      });
    } catch (error) {
      console.error('Error saving to library:', error);
      setError('Failed to save to library');
    }
  };

  // Select an existing asset from the library
  const selectFromLibrary = (asset: MediaAsset) => {
    setSelectedMedia(asset);
  };

  // Use the selected asset
  const useSelectedAsset = () => {
    if (!selectedMedia) return;
    
    // Track the usage of this asset
    if (selectedMedia.id !== 'preview') {
      trackAssetUsage(selectedMedia.id);
    }
    
    onChange(selectedMedia.url);
    setIsLibraryOpen(false);
  };

  // Remove the currently set image
  const handleRemoveImage = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Filter media by type
  const handleFilterByType = (type: MediaAsset['type']) => {
    setLibraryMedia(filterMediaByType(type));
  };

  // Load recently used media
  const loadRecentlyUsed = () => {
    setLibraryMedia(getRecentlyUsedMedia(10));
  };

  // Clear the selection
  const clearSelection = () => {
    setSelectedMedia(null);
    setNewAssetName('');
    setNewAssetTags('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-40">
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Uploading...</p>
              </div>
            ) : value ? (
              <div className="relative w-full h-full">
                <img 
                  src={value} 
                  alt="Selected media" 
                  className="object-contain w-full h-full"
                />
                <button 
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" 
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No image selected</p>
              </div>
            )}
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        
        <div className="flex flex-col justify-center space-y-2">
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => inputRef.current?.click()}
            className="w-full"
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload New
          </Button>
          
          <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Browse Media Library
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Media Library</DialogTitle>
                <DialogDescription>
                  Select an existing image or upload a new one
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-hidden flex flex-col">
                <Tabs defaultValue="browse" className="flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="browse">Browse Library</TabsTrigger>
                      <TabsTrigger value="upload">Upload New</TabsTrigger>
                    </TabsList>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleFilterByType(mediaType)}
                      >
                        <Filter className="h-4 w-4 mr-1" />
                        {mediaType === 'image' ? 'Images' : mediaType === 'logo' ? 'Logos' : 'Icons'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadRecentlyUsed}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Recent
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name or tag..."
                      className="pl-8 pr-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && loadMedia()}
                    />
                  </div>
                  
                  <TabsContent value="browse" className="flex-1 overflow-auto">
                    {libraryMedia.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {libraryMedia.map(asset => (
                          <Card 
                            key={asset.id} 
                            className={`cursor-pointer overflow-hidden ${selectedMedia?.id === asset.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => selectFromLibrary(asset)}
                          >
                            <div className="aspect-square bg-gray-100 relative">
                              <img 
                                src={asset.url} 
                                alt={asset.name}
                                className="object-contain w-full h-full p-2"
                              />
                              {selectedMedia?.id === asset.id && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <CardContent className="p-2">
                              <div className="truncate font-medium text-sm">{asset.name}</div>
                              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                <span>{asset.dimensions?.width || 0}×{asset.dimensions?.height || 0}</span>
                                <span>{(asset.size / 1024).toFixed(0)}KB</span>
                              </div>
                              {asset.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {asset.tags.slice(0, 2).map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs py-0 px-1">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {asset.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs py-0 px-1">
                                      +{asset.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No media found in the library</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Upload new assets or try a different search
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="upload" className="flex-1 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-md p-4 h-52 flex flex-col items-center justify-center cursor-pointer"
                          onClick={() => inputRef.current?.click()}
                        >
                          {selectedMedia ? (
                            <div className="relative w-full h-full">
                              <img 
                                src={selectedMedia.url} 
                                alt="Upload preview" 
                                className="object-contain w-full h-full"
                              />
                              <button 
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearSelection();
                                }}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                              <p className="text-gray-500">Click to upload or drag and drop</p>
                              <p className="text-sm text-gray-400 mt-1">
                                {accept.split(',').join(', ')} up to {maxSizeMB}MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="assetName">Asset Name</Label>
                          <Input
                            id="assetName"
                            value={newAssetName}
                            onChange={(e) => setNewAssetName(e.target.value)}
                            placeholder="Enter a descriptive name"
                            disabled={!selectedMedia}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="assetTags">Tags (comma separated)</Label>
                          <div className="relative">
                            <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              id="assetTags"
                              value={newAssetTags}
                              onChange={(e) => setNewAssetTags(e.target.value)}
                              placeholder="logo, header, product"
                              className="pl-8"
                              disabled={!selectedMedia}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Add tags to help find this asset later
                          </p>
                        </div>
                        
                        {selectedMedia && (
                          <div className="pt-2">
                            <p className="text-xs text-gray-500 flex items-center">
                              <span className="font-medium mr-1">Size:</span> 
                              {(selectedMedia.size / 1024).toFixed(0)}KB
                            </p>
                            {selectedMedia.dimensions && (
                              <p className="text-xs text-gray-500 flex items-center">
                                <span className="font-medium mr-1">Dimensions:</span> 
                                {selectedMedia.dimensions.width}×{selectedMedia.dimensions.height}px
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Separator className="my-4" />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsLibraryOpen(false)}
                >
                  Cancel
                </Button>
                
                {selectedMedia && selectedMedia.id === 'preview' ? (
                  <Button 
                    onClick={saveToLibrary} 
                    disabled={!selectedMedia || !newAssetName}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Library & Use
                  </Button>
                ) : (
                  <Button 
                    onClick={useSelectedAsset}
                    disabled={!selectedMedia}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Use Selected
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG. Max size: {maxSizeMB}MB
          </p>
        </div>
      </div>
    </div>
  );
}; 