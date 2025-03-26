import { useState, useEffect } from 'react';
import { getDrafts, removeDraft } from '@/services/draftService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Trash2, FileText, Clock, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

interface DraftsListProps {
  onLoadDraft: (draftId: string) => void;
}

export const DraftsList = ({ onLoadDraft }: DraftsListProps) => {
  const [drafts, setDrafts] = useState<ReturnType<typeof getDrafts>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);
  
  // Load drafts on mount and when drafts change
  const loadDrafts = () => {
    setDrafts(getDrafts());
  };
  
  useEffect(() => {
    loadDrafts();
    
    // Set up interval to refresh drafts list every 30 seconds
    const interval = setInterval(loadDrafts, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Handle draft deletion
  const handleDeleteDraft = () => {
    if (draftToDelete) {
      removeDraft(draftToDelete);
      loadDrafts();
      setDeleteDialogOpen(false);
      setDraftToDelete(null);
      
      toast({
        title: "Draft Deleted",
        description: "The draft has been successfully deleted."
      });
    }
  };
  
  // Open delete confirmation dialog
  const openDeleteDialog = (draftId: string) => {
    setDraftToDelete(draftId);
    setDeleteDialogOpen(true);
  };
  
  // Drafts array for rendering
  const draftsArray = Object.values(drafts).sort((a, b) => b.lastSaved - a.lastSaved);
  
  if (draftsArray.length === 0) {
    return null; // Don't render anything if no drafts
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Saved Drafts</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-2"
            onClick={loadDrafts}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {draftsArray.length > 0 ? (
          <div className="space-y-4">
            {draftsArray.map(draft => (
              <div 
                key={draft.id} 
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">
                      {draft.data.name || 'Unnamed Case Study'}
                      {draft.isDirty && <span className="ml-2 text-xs text-amber-500">(Unsaved)</span>}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Last edited: {formatDate(draft.lastSaved)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onLoadDraft(draft.id)}
                  >
                    Load
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openDeleteDialog(draft.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertDescription>No drafts found.</AlertDescription>
          </Alert>
        )}
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Draft</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this draft? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteDraft}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}; 