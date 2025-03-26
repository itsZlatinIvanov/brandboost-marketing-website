import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Clock, 
  Image as ImageIcon, 
  Grid, 
  List,
  Tag as TagIcon,
  Heart,
  HelpCircle,
  Download,
  Share
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  getAllMedia, 
  deleteMediaAsset, 
  updateMediaAsset, 
  searchMedia, 
  filterMediaByType, 
  MediaAsset 
} from '@/services/mediaLibraryService';

export const MediaLibraryManager = () => {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<MediaAsset['type'] | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editingTags, setEditingTags] = useState('');
  
  // Load media on mount
  useEffect(() => {
    loadMedia();
  }, []);
  
  // Load media with filters
  const loadMedia = () => {
    let filteredMedia = getAllMedia();
    
    // Apply search filter
    if (searchTerm) {
      filteredMedia = searchMedia(searchTerm);
    }
    
    // Apply type filter
    if (selectedType !== 'all') {
      filteredMedia = filterMediaByType(selectedType);
    }
    
    setMedia(filteredMedia);
  };
  
  // Handle search
  const handleSearch = () => {
    loadMedia();
  };
  
  // Handle type filter
  const handleFilterByType = (type: MediaAsset['type'] | 'all') => {
    setSelectedType(type);
    
    let filteredMedia = getAllMedia();
    
    // Apply search filter
    if (searchTerm) {
      filteredMedia = searchMedia(searchTerm);
    }
    
    // Apply type filter if not 'all'
    if (type !== 'all') {
      filteredMedia = filteredMedia.filter(asset => asset.type === type);
    }
    
    setMedia(filteredMedia);
  };
  
  // Begin asset deletion
  const handleDeleteClick = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm asset deletion
  const confirmDelete = () => {
    if (!selectedAsset) return;
    
    deleteMediaAsset(selectedAsset.id);
    setIsDeleteDialogOpen(false);
    loadMedia();
    
    toast({
      title: "Asset Deleted",
      description: `${selectedAsset.name} has been removed from the library.`
    });
    
    setSelectedAsset(null);
  };
  
  // Begin asset editing
  const handleEditClick = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setEditingName(asset.name);
    setEditingTags(asset.tags.join(', '));
    setIsEditDialogOpen(true);
  };
  
  // Save asset edits
  const saveAssetEdits = () => {
    if (!selectedAsset) return;
    
    const updatedAsset = updateMediaAsset(selectedAsset.id, {
      name: editingName,
      tags: editingTags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    
    if (updatedAsset) {
      setIsEditDialogOpen(false);
      loadMedia();
      
      toast({
        title: "Asset Updated",
        description: `${updatedAsset.name} has been updated successfully.`
      });
    }
    
    setSelectedAsset(null);
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // Format date
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  // Download asset
  const downloadAsset = (asset: MediaAsset) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: `Downloading ${asset.name}`
    });
  };
  
  // Copy asset URL
  const copyAssetUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url).then(() => {
      toast({
        title: "URL Copied",
        description: "Asset URL copied to clipboard"
      });
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Media Library</h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Media Type</h3>
                
                <div className="space-y-1">
                  <Button
                    variant={selectedType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleFilterByType('all')}
                  >
                    <TagIcon className="h-4 w-4 mr-2" />
                    All Types
                  </Button>
                  
                  <Button
                    variant={selectedType === 'image' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleFilterByType('image')}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Images
                  </Button>
                  
                  <Button
                    variant={selectedType === 'logo' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleFilterByType('logo')}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
                    </svg>
                    Logos
                  </Button>
                  
                  <Button
                    variant={selectedType === 'icon' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleFilterByType('icon')}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Icons
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <p className="text-xs text-gray-500">
                  Total: {media.length} item{media.length !== 1 ? 's' : ''}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <HelpCircle className="h-4 w-4 inline-block mr-1 text-blue-500" />
                  Add images to your library for reuse across case studies.
                </p>
                <p>
                  <HelpCircle className="h-4 w-4 inline-block mr-1 text-blue-500" />
                  Tag your images for easier discovery later.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>Media Assets</CardTitle>
              <CardDescription>
                Manage your images, logos, and icons
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-[60vh]">
                {media.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {media.map(asset => (
                        <Card key={asset.id} className="overflow-hidden">
                          <div className="aspect-square bg-gray-100 relative group">
                            <img 
                              src={asset.url} 
                              alt={asset.name}
                              className="object-contain w-full h-full p-2"
                            />
                            
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                              <Button 
                                variant="default" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditClick(asset)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="default" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => downloadAsset(asset)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="default" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => copyAssetUrl(asset)}
                              >
                                <Share className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="destructive" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteClick(asset)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <CardContent className="p-2">
                            <div className="truncate font-medium text-sm">{asset.name}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>{asset.dimensions?.width || 0}×{asset.dimensions?.height || 0}</span>
                              <span>{formatFileSize(asset.size)}</span>
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
                    <div className="space-y-2">
                      {media.map(asset => (
                        <div 
                          key={asset.id} 
                          className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-gray-50"
                        >
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={asset.url} 
                              alt={asset.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          
                          <div className="ml-4 flex-1 min-w-0">
                            <div className="truncate font-medium">{asset.name}</div>
                            <div className="text-sm text-gray-500">
                              {formatFileSize(asset.size)} • {formatDate(asset.dateAdded)} • 
                              Used {asset.usageCount} time{asset.usageCount !== 1 ? 's' : ''}
                            </div>
                            {asset.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {asset.tags.map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs py-0 px-1">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 ml-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditClick(asset)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => downloadAsset(asset)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => copyAssetUrl(asset)}
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 hover:text-red-500"
                              onClick={() => handleDeleteClick(asset)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <Alert>
                    <AlertDescription>
                      No media assets found. Use the image uploader in case studies to add images to your library.
                    </AlertDescription>
                  </Alert>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Asset</DialogTitle>
          </DialogHeader>
          
          <p>
            Are you sure you want to delete <strong>{selectedAsset?.name}</strong>?
            This action cannot be undone.
          </p>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="md:col-span-1 aspect-square bg-gray-100">
                {selectedAsset && (
                  <img 
                    src={selectedAsset.url} 
                    alt={selectedAsset.name}
                    className="w-full h-full object-contain p-2"
                  />
                )}
              </div>
              
              <div className="md:col-span-3 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    value={editingName} 
                    onChange={(e) => setEditingName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input 
                    value={editingTags} 
                    onChange={(e) => setEditingTags(e.target.value)} 
                    placeholder="logo, header, product"
                  />
                  <p className="text-xs text-gray-500">
                    Add tags to help find this asset later
                  </p>
                </div>
                
                {selectedAsset && (
                  <div className="space-y-1 pt-2">
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="font-medium mr-1">Size:</span> 
                      {formatFileSize(selectedAsset.size)}
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="font-medium mr-1">Type:</span> 
                      {selectedAsset.type}
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="font-medium mr-1">Added:</span> 
                      {formatDate(selectedAsset.dateAdded)}
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="font-medium mr-1">Used:</span> 
                      {selectedAsset.usageCount} time{selectedAsset.usageCount !== 1 ? 's' : ''}
                    </div>
                    
                    {selectedAsset.dimensions && (
                      <div className="text-xs text-gray-500 flex items-center">
                        <span className="font-medium mr-1">Dimensions:</span> 
                        {selectedAsset.dimensions.width}×{selectedAsset.dimensions.height}px
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAssetEdits}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 