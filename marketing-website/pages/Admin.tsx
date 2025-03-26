import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { caseStudies, CaseStudy } from '@/data/caseStudies';
import { CaseStudiesManager } from '@/components/admin/CaseStudiesManager';
import { MediaLibraryManager } from '@/components/admin/MediaLibraryManager';
import { Dashboard } from '@/components/admin/Dashboard';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { createEmptyCaseStudy } from '@/services/localCaseStudiesService';
import { Database, Images, LayoutDashboard, FileText } from 'lucide-react';

// In a real app, this would be integrated with a proper auth system
const ADMIN_PASSWORD = 'clycadmin123'; // This is just for demo purposes - never hardcode passwords in production!

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'dashboard' | 'caseStudies' | 'mediaLibrary'>('dashboard');
  const [initialStudy, setInitialStudy] = useState<'new' | string | undefined>(undefined);
  const navigate = useNavigate();

  // Check if user was previously authenticated in this session
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  
  const handleCreateNewCaseStudy = () => {
    setInitialStudy('new');
    setActiveSection('caseStudies');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the admin area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">CLYC Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <div className="flex gap-1 border border-gray-200 rounded-md p-1 bg-gray-50">
                <Button
                  variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
                  size="sm"
                  className="flex gap-1"
                  onClick={() => setActiveSection('dashboard')}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Button
                  variant={activeSection === 'caseStudies' ? 'default' : 'ghost'} 
                  size="sm"
                  className="flex gap-1"
                  onClick={() => setActiveSection('caseStudies')}
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Case Studies</span>
                </Button>
                <Button
                  variant={activeSection === 'mediaLibrary' ? 'default' : 'ghost'} 
                  size="sm"
                  className="flex gap-1"
                  onClick={() => setActiveSection('mediaLibrary')}
                >
                  <Images className="h-4 w-4" />
                  <span className="hidden sm:inline">Media Library</span>
                </Button>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Logout</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Any unsaved changes will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'dashboard' && (
          <Dashboard onCreateNewCaseStudy={handleCreateNewCaseStudy} />
        )}
        
        {activeSection === 'caseStudies' && (
          <CaseStudiesManager initialStudy={initialStudy} />
        )}
        
        {activeSection === 'mediaLibrary' && (
          <MediaLibraryManager />
        )}
      </main>
    </div>
  );
};

export default Admin; 