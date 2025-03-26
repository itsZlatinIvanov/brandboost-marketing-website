import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { getOldDrafts, removeDraft } from '@/services/draftService';
import { getCaseStudies, resetToInitialCaseStudies } from '@/services/localCaseStudiesService';
import { BarChart, UsersRound, FileText, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DashboardProps {
  onCreateNewCaseStudy: () => void;
}

export const Dashboard = ({ onCreateNewCaseStudy }: DashboardProps) => {
  const [stats, setStats] = useState({
    totalCaseStudies: 0,
    caseStudiesByIndustry: {} as Record<string, number>,
    caseStudiesByResultType: {} as Record<string, number>,
    totalDrafts: 0,
    oldDrafts: 0,
  });
  
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [cleanupDialogOpen, setCleanupDialogOpen] = useState(false);
  
  // Calculate stats on mount and when needed
  const calculateStats = () => {
    const studies = getCaseStudies();
    const drafts = getOldDrafts(24); // Drafts older than 24 hours
    
    // Group by industry
    const industryGroups = studies.reduce((acc, study) => {
      acc[study.industry] = (acc[study.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Group by result type
    const resultTypeGroups = studies.reduce((acc, study) => {
      acc[study.resultType] = (acc[study.resultType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    setStats({
      totalCaseStudies: studies.length,
      caseStudiesByIndustry: industryGroups,
      caseStudiesByResultType: resultTypeGroups,
      totalDrafts: Object.keys(getOldDrafts(0)).length,
      oldDrafts: drafts.length,
    });
  };
  
  useEffect(() => {
    calculateStats();
  }, []);
  
  // Reset all case studies to initial state
  const handleResetCaseStudies = () => {
    resetToInitialCaseStudies();
    calculateStats();
    setResetDialogOpen(false);
    
    toast({
      title: "Case Studies Reset",
      description: "All case studies have been reset to their initial state.",
    });
  };
  
  // Clean up old drafts
  const handleCleanupOldDrafts = () => {
    const oldDrafts = getOldDrafts(24);
    oldDrafts.forEach(draft => {
      removeDraft(draft.id);
    });
    
    calculateStats();
    setCleanupDialogOpen(false);
    
    toast({
      title: "Old Drafts Cleaned Up",
      description: `${oldDrafts.length} old drafts have been removed.`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>
          Manage your case studies and view stats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tools">Admin Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Case Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold">{stats.totalCaseStudies}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Top Industry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <UsersRound className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {Object.entries(stats.caseStudiesByIndustry).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Top Result Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-2xl font-bold">
                      {Object.entries(stats.caseStudiesByResultType).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {stats.oldDrafts > 0 && (
              <Alert className="bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle>Old Drafts Detected</AlertTitle>
                <AlertDescription>
                  You have {stats.oldDrafts} drafts older than 24 hours. Consider cleaning them up.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={calculateStats}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh Stats
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create New Case Study</CardTitle>
                  <CardDescription>
                    Add a new case study to your collection
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={onCreateNewCaseStudy} className="w-full">Create New</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Clean Up Old Drafts</CardTitle>
                  <CardDescription>
                    Remove drafts older than 24 hours
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline"
                    onClick={() => setCleanupDialogOpen(true)}
                    className="w-full"
                    disabled={stats.oldDrafts === 0}
                  >
                    Clean Up {stats.oldDrafts > 0 && `(${stats.oldDrafts})`}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Actions that cannot be undone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      These actions will permanently affect your data and cannot be reversed.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="destructive"
                    onClick={() => setResetDialogOpen(true)}
                    className="ml-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset All Case Studies
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Reset Confirmation Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset All Case Studies</DialogTitle>
            <DialogDescription>
              This will reset all case studies to their initial state and remove any modifications you've made.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleResetCaseStudies}>
              Reset Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cleanup Confirmation Dialog */}
      <Dialog open={cleanupDialogOpen} onOpenChange={setCleanupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clean Up Old Drafts</DialogTitle>
            <DialogDescription>
              This will remove all drafts older than 24 hours. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCleanupDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleCleanupOldDrafts}>
              Clean Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}; 