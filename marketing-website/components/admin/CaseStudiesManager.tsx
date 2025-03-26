import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { CaseStudy, Industry, ResultType, IconType } from '@/data/caseStudies';
import { Search, PlusCircle, Trash2, Edit, Save, X, Clock } from 'lucide-react';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { MediaLibraryUploader } from '@/components/admin/MediaLibraryUploader';
import { 
  validateForm, 
  validateField,
  ValidationErrors, 
  ValidationRules,
  required,
  minLength,
  isUrl
} from '@/components/admin/FormValidation';

// Import the simple local storage service
import { getCaseStudies, saveCaseStudies, createEmptyCaseStudy } from '@/services/localCaseStudiesService';

// Add draft service imports
import { 
  getDraft, 
  saveDraft, 
  removeDraft, 
  markDraftAsSaved, 
  startAutoSave, 
  stopAutoSave 
} from '@/services/draftService';
import { DraftsList } from '@/components/admin/DraftsList';

// Export the type for use in other modules
export type CaseStudyFields = {
  id: string;
  name: string;
  title: string;
  industry: Industry;
  resultType: ResultType;
  image: string;
  logo?: string;
  challenge: string;
  solution: string;
  results: string;
  quote: string;
  tags: string[];
  category?: 'coach' | 'consultant' | 'expert';
  transformationTime?: string;
  beforeMetrics?: {
    followers: string;
    engagement: string;
    leads: string;
    timeSpent: string;
  };
  afterMetrics?: {
    followers: string;
    engagement: string;
    leads: string;
    timeSpent: string;
  };
  stats: {
    value: string;
    label: string;
    icon: IconType;
  }[];
};

interface CaseStudiesManagerProps {
  initialStudy?: 'new' | string; // 'new' for creating a new study, or an ID to edit
}

export const CaseStudiesManager = ({ initialStudy }: CaseStudiesManagerProps = {}) => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudy, setEditingStudy] = useState<CaseStudyFields | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Add new state for auto-save
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [showDrafts, setShowDrafts] = useState(true);

  // Define validation rules
  const validationRules: ValidationRules = {
    id: [required('ID is required')],
    name: [required('Name is required')],
    title: [required('Title is required')],
    industry: [required('Industry is required')],
    resultType: [required('Result type is required')],
    image: [required('Image is required'), isUrl('Image must be a valid URL or uploaded file')],
    challenge: [required('Challenge is required'), minLength(20, 'Challenge should be at least 20 characters')],
    solution: [required('Solution is required'), minLength(20, 'Solution should be at least 20 characters')],
    results: [required('Results is required'), minLength(20, 'Results should be at least 20 characters')],
    quote: [required('Quote is required')]
  };

  // Load case studies from localStorage on component mount
  useEffect(() => {
    const loadedStudies = getCaseStudies();
    setStudies(loadedStudies);
  }, []);

  // Start auto-save when editing a study
  useEffect(() => {
    if (editingStudy) {
      startAutoSave(
        editingStudy.id, 
        () => editingStudy,
        () => setLastAutoSave(new Date())
      );
    }
    
    return () => {
      stopAutoSave();
    };
  }, [editingStudy]);

  // Handle initialStudy prop for creating or editing a specific study
  useEffect(() => {
    if (initialStudy === 'new') {
      const emptyStudy = createEmptyCaseStudy();
      const safeCopy: CaseStudyFields = {
        id: emptyStudy.id,
        name: emptyStudy.name,
        title: emptyStudy.title,
        industry: emptyStudy.industry,
        resultType: emptyStudy.resultType,
        image: emptyStudy.image,
        logo: emptyStudy.logo,
        challenge: emptyStudy.challenge,
        solution: emptyStudy.solution,
        results: emptyStudy.results,
        quote: emptyStudy.quote,
        tags: [...emptyStudy.tags],
        category: emptyStudy.category,
        transformationTime: emptyStudy.transformationTime,
        beforeMetrics: emptyStudy.beforeMetrics ? {
          followers: emptyStudy.beforeMetrics.followers,
          engagement: emptyStudy.beforeMetrics.engagement,
          leads: emptyStudy.beforeMetrics.leads,
          timeSpent: emptyStudy.beforeMetrics.timeSpent
        } : undefined,
        afterMetrics: emptyStudy.afterMetrics ? {
          followers: emptyStudy.afterMetrics.followers,
          engagement: emptyStudy.afterMetrics.engagement,
          leads: emptyStudy.afterMetrics.leads,
          timeSpent: emptyStudy.afterMetrics.timeSpent
        } : undefined,
        stats: emptyStudy.stats.map(stat => ({
          value: stat.value,
          label: stat.label,
          icon: stat.icon
        }))
      };
      setEditingStudy(safeCopy);
      setIsCreateMode(true);
      setShowDrafts(false);
    } else if (initialStudy && initialStudy !== 'new') {
      // Find the study by ID and edit it
      const study = studies.find(s => s.id === initialStudy);
      if (study) {
        // Create safe copy directly instead of calling handleEditStudy
        // to avoid dependency cycle
        const safeCopy: CaseStudyFields = {
          id: study.id,
          name: study.name,
          title: study.title,
          industry: study.industry,
          resultType: study.resultType,
          image: study.image,
          logo: study.logo,
          challenge: study.challenge,
          solution: study.solution,
          results: study.results,
          quote: study.quote,
          tags: [...study.tags],
          category: study.category,
          transformationTime: study.transformationTime,
          beforeMetrics: study.beforeMetrics ? {
            followers: study.beforeMetrics.followers,
            engagement: study.beforeMetrics.engagement,
            leads: study.beforeMetrics.leads,
            timeSpent: study.beforeMetrics.timeSpent
          } : undefined,
          afterMetrics: study.afterMetrics ? {
            followers: study.afterMetrics.followers,
            engagement: study.afterMetrics.engagement,
            leads: study.afterMetrics.leads,
            timeSpent: study.afterMetrics.timeSpent
          } : undefined,
          stats: study.stats.map(stat => ({
            value: stat.value,
            label: stat.label,
            icon: stat.icon
          }))
        };
        setEditingStudy(safeCopy);
        setIsCreateMode(false);
        setShowDrafts(false);
      }
    }
  }, [initialStudy, studies]);

  // Filtered studies based on search term
  const filteredStudies = studies.filter(
    study => 
      study.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle editing a case study
  const handleEditStudy = (study: CaseStudy) => {
    // Check if there's a draft for this study
    const draft = getDraft(study.id);
    
    if (draft) {
      // Ask user if they want to load the draft
      if (confirm(`A draft of "${study.name}" from ${new Date(draft.lastSaved).toLocaleString()} exists. Load it?`)) {
        setEditingStudy(draft.data);
      } else {
        // Create a safe copy as before
        const safeCopy: CaseStudyFields = {
          id: study.id,
          name: study.name,
          title: study.title,
          industry: study.industry,
          resultType: study.resultType,
          image: study.image,
          logo: study.logo,
          challenge: study.challenge,
          solution: study.solution,
          results: study.results,
          quote: study.quote,
          tags: [...study.tags],
          category: study.category,
          transformationTime: study.transformationTime,
          beforeMetrics: study.beforeMetrics ? {
            followers: study.beforeMetrics.followers,
            engagement: study.beforeMetrics.engagement,
            leads: study.beforeMetrics.leads,
            timeSpent: study.beforeMetrics.timeSpent
          } : undefined,
          afterMetrics: study.afterMetrics ? {
            followers: study.afterMetrics.followers,
            engagement: study.afterMetrics.engagement,
            leads: study.afterMetrics.leads,
            timeSpent: study.afterMetrics.timeSpent
          } : undefined,
          stats: study.stats.map(stat => ({
            value: stat.value,
            label: stat.label,
            icon: stat.icon
          }))
        };
        setEditingStudy(safeCopy);
      }
    } else {
      // Create a safe copy as before
      const safeCopy: CaseStudyFields = {
        id: study.id,
        name: study.name,
        title: study.title,
        industry: study.industry,
        resultType: study.resultType,
        image: study.image,
        logo: study.logo,
        challenge: study.challenge,
        solution: study.solution,
        results: study.results,
        quote: study.quote,
        tags: [...study.tags],
        category: study.category,
        transformationTime: study.transformationTime,
        beforeMetrics: study.beforeMetrics ? {
          followers: study.beforeMetrics.followers,
          engagement: study.beforeMetrics.engagement,
          leads: study.beforeMetrics.leads,
          timeSpent: study.beforeMetrics.timeSpent
        } : undefined,
        afterMetrics: study.afterMetrics ? {
          followers: study.afterMetrics.followers,
          engagement: study.afterMetrics.engagement,
          leads: study.afterMetrics.leads,
          timeSpent: study.afterMetrics.timeSpent
        } : undefined,
        stats: study.stats.map(stat => ({
          value: stat.value,
          label: stat.label,
          icon: stat.icon
        }))
      };
      setEditingStudy(safeCopy);
    }
    
    setIsCreateMode(false);
  };

  // Handle creating a new case study
  const handleCreateStudy = () => {
    const emptyStudy = createEmptyCaseStudy();
    handleEditStudy(emptyStudy);
    setIsCreateMode(true);
  };

  // Validate a single field
  const validateFieldAndSetError = (field: string, value: any) => {
    const fieldError = validateField(field, value, validationRules);
    setErrors(prev => ({
      ...prev,
      [field]: fieldError
    }));
    return fieldError === null;
  };

  // Update handleFieldChange to validate on change
  const handleFieldChange = (field: string, value: any) => {
    if (!editingStudy) return;
    
    setEditingStudy(prev => {
      if (!prev) return prev;
      
      let newValue = { ...prev };
      
      if (field.includes('.')) {
        // Handle nested fields like beforeMetrics.followers
        const [parent, child] = field.split('.');
        
        if (parent === 'beforeMetrics') {
          // Initialize with default empty values if needed to satisfy TypeScript
          const currentMetrics = prev.beforeMetrics || {
            followers: '',
            engagement: '',
            leads: '',
            timeSpent: ''
          };
          
          newValue = {
            ...prev,
            beforeMetrics: {
              ...currentMetrics,
              [child]: value
            }
          };
        } else if (parent === 'afterMetrics') {
          // Initialize with default empty values if needed to satisfy TypeScript
          const currentMetrics = prev.afterMetrics || {
            followers: '',
            engagement: '',
            leads: '',
            timeSpent: ''
          };
          
          newValue = {
            ...prev,
            afterMetrics: {
              ...currentMetrics,
              [child]: value
            }
          };
        }
      } else {
        // Handle regular fields
        newValue = {
          ...prev,
          [field]: value
        };
      }
      
      // Validate the field if it has validation rules
      if (validationRules[field]) {
        validateFieldAndSetError(field, value);
      }
      
      return newValue;
    });
  };

  // Add a function to load a draft directly
  const handleLoadDraft = (draftId: string) => {
    const draft = getDraft(draftId);
    if (draft) {
      setEditingStudy(draft.data);
      setIsCreateMode(draft.data.id.startsWith('new-'));
      setShowDrafts(false);
      
      toast({
        title: "Draft Loaded",
        description: `Draft from ${new Date(draft.lastSaved).toLocaleString()} loaded successfully.`
      });
    }
  };

  // Handle saving a case study
  const handleSaveStudy = () => {
    if (!editingStudy) return;
    
    // Validate all fields
    const formErrors = validateForm(editingStudy, validationRules);
    setErrors(formErrors);
    
    // Check if there are any errors
    if (Object.values(formErrors).some(error => error !== null)) {
      toast({
        title: "Validation Error",
        description: "Please fix the highlighted errors before saving.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Prepare the study for saving
      const studyToSave: CaseStudy = {
        ...editingStudy as CaseStudy,
        // Add any required fields that might be missing
        featured: false
      };
      
      let updatedStudies: CaseStudy[];
      
      if (isCreateMode) {
        // Add new case study
        updatedStudies = [...studies, studyToSave];
      } else {
        // Update existing case study
        updatedStudies = studies.map(study => 
          study.id === editingStudy.id ? studyToSave : study
        );
      }
      
      // Save to localStorage
      saveCaseStudies(updatedStudies);
      
      // Update state
      setStudies(updatedStudies);
      setEditingStudy(null);
      setIsCreateMode(false);
      
      // Remove the draft since it's now saved
      removeDraft(editingStudy.id);
      
      // Show success message
      toast({
        title: isCreateMode ? "Case Study Created" : "Case Study Updated",
        description: `${editingStudy.name} has been successfully ${isCreateMode ? 'created' : 'updated'}.`,
      });
    } catch (error) {
      console.error("Error saving case study:", error);
      toast({
        title: "Error",
        description: "There was a problem saving the case study.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle deleting a case study
  const handleDeleteStudy = (id: string) => {
    setStudyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (!studyToDelete) return;
    
    try {
      const updatedStudies = studies.filter(study => study.id !== studyToDelete);
      saveCaseStudies(updatedStudies);
      setStudies(updatedStudies);
      
      toast({
        title: "Case Study Deleted",
        description: "The case study has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting case study:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting the case study.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setStudyToDelete(null);
    }
  };

  // Update handleCancelEdit to ask about saving draft
  const handleCancelEdit = () => {
    if (editingStudy) {
      // Automatically save as draft if changes were made
      saveDraft(editingStudy.id, editingStudy);
      toast({
        title: "Draft Saved",
        description: "Your changes have been saved as a draft.",
      });
    }
    
    setEditingStudy(null);
    setIsCreateMode(false);
    setShowDrafts(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Case Studies</h2>
        <Button onClick={handleCreateStudy}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Case Study
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search case studies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Show drafts list if not editing and there are drafts */}
      {!editingStudy && showDrafts && (
        <DraftsList onLoadDraft={handleLoadDraft} />
      )}
      
      {editingStudy ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{isCreateMode ? 'Create New Case Study' : 'Edit Case Study'}</CardTitle>
                <CardDescription>
                  {isCreateMode 
                    ? 'Fill in the details to create a new case study' 
                    : `Editing: ${editingStudy.name}`}
                </CardDescription>
              </div>
              
              {/* Show auto-save status */}
              {lastAutoSave && (
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Auto-saved: {lastAutoSave.toLocaleTimeString()}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="id" className={errors.id ? 'text-red-500' : ''}>
                        ID (unique identifier)
                      </Label>
                      <Input 
                        id="id" 
                        value={editingStudy.id || ''} 
                        onChange={(e) => handleFieldChange('id', e.target.value)}
                        disabled={!isCreateMode}
                        className={errors.id ? 'border-red-500' : ''}
                      />
                      {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name" className={errors.name ? 'text-red-500' : ''}>
                        Name
                      </Label>
                      <Input 
                        id="name" 
                        value={editingStudy.name || ''} 
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title" className={errors.title ? 'text-red-500' : ''}>
                        Title/Position
                      </Label>
                      <Input 
                        id="title" 
                        value={editingStudy.title || ''} 
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className={errors.title ? 'border-red-500' : ''}
                      />
                      {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry" className={errors.industry ? 'text-red-500' : ''}>
                        Industry
                      </Label>
                      <Select 
                        value={editingStudy.industry} 
                        onValueChange={(value) => handleFieldChange('industry', value as Industry)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="life">Life</SelectItem>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="career">Career</SelectItem>
                          <SelectItem value="relationship">Relationship</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resultType" className={errors.resultType ? 'text-red-500' : ''}>
                        Result Type
                      </Label>
                      <Select 
                        value={editingStudy.resultType} 
                        onValueChange={(value) => handleFieldChange('resultType', value as ResultType)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Result Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="audience">Audience Growth</SelectItem>
                          <SelectItem value="time">Time Saved</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.resultType && <p className="text-sm text-red-500">{errors.resultType}</p>}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <MediaLibraryUploader
                        label="Case Study Image"
                        value={editingStudy.image}
                        onChange={(value) => handleFieldChange('image', value)}
                        mediaType="image"
                      />
                      {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <MediaLibraryUploader
                        label="Logo (optional)"
                        value={editingStudy.logo || ''}
                        onChange={(value) => handleFieldChange('logo', value)}
                        mediaType="logo"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category" className={errors.category ? 'text-red-500' : ''}>
                        Category
                      </Label>
                      <Select 
                        value={editingStudy.category} 
                        onValueChange={(value) => handleFieldChange('category', value as 'coach' | 'consultant' | 'expert')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coach">Coach</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transformationTime" className={errors.transformationTime ? 'text-red-500' : ''}>
                        Transformation Time
                      </Label>
                      <Input 
                        id="transformationTime" 
                        value={editingStudy.transformationTime || ''} 
                        onChange={(e) => handleFieldChange('transformationTime', e.target.value)}
                        placeholder="e.g. 3 months"
                        className={errors.transformationTime ? 'border-red-500' : ''}
                      />
                      {errors.transformationTime && <p className="text-sm text-red-500">{errors.transformationTime}</p>}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="tags" className={errors.tags ? 'text-red-500' : ''}>
                        Tags (comma separated)
                      </Label>
                      <Input 
                        id="tags" 
                        value={editingStudy.tags ? editingStudy.tags.join(', ') : ''} 
                        onChange={(e) => handleFieldChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                        className={errors.tags ? 'border-red-500' : ''}
                      />
                      {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Story Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Story Details</h3>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <RichTextEditor
                        label="Challenge"
                        value={editingStudy.challenge || ''}
                        onChange={(value) => handleFieldChange('challenge', value)}
                      />
                      {errors.challenge && <p className="text-sm text-red-500">{errors.challenge}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <RichTextEditor
                        label="Solution"
                        value={editingStudy.solution || ''}
                        onChange={(value) => handleFieldChange('solution', value)}
                      />
                      {errors.solution && <p className="text-sm text-red-500">{errors.solution}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <RichTextEditor
                        label="Results"
                        value={editingStudy.results || ''}
                        onChange={(value) => handleFieldChange('results', value)}
                      />
                      {errors.results && <p className="text-sm text-red-500">{errors.results}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <RichTextEditor
                        label="Quote"
                        value={editingStudy.quote || ''}
                        onChange={(value) => handleFieldChange('quote', value)}
                        minHeight="100px"
                      />
                      {errors.quote && <p className="text-sm text-red-500">{errors.quote}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Metrics & Stats</h3>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Before Metrics</Label>
                        <div className="space-y-2">
                          <Input 
                            placeholder="Followers"
                            value={editingStudy.beforeMetrics?.followers || ''} 
                            onChange={(e) => handleFieldChange('beforeMetrics.followers', e.target.value)}
                          />
                          <Input 
                            placeholder="Engagement"
                            value={editingStudy.beforeMetrics?.engagement || ''} 
                            onChange={(e) => handleFieldChange('beforeMetrics.engagement', e.target.value)}
                          />
                          <Input 
                            placeholder="Leads"
                            value={editingStudy.beforeMetrics?.leads || ''} 
                            onChange={(e) => handleFieldChange('beforeMetrics.leads', e.target.value)}
                          />
                          <Input 
                            placeholder="Time Spent"
                            value={editingStudy.beforeMetrics?.timeSpent || ''} 
                            onChange={(e) => handleFieldChange('beforeMetrics.timeSpent', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>After Metrics</Label>
                        <div className="space-y-2">
                          <Input 
                            placeholder="Followers"
                            value={editingStudy.afterMetrics?.followers || ''} 
                            onChange={(e) => handleFieldChange('afterMetrics.followers', e.target.value)}
                          />
                          <Input 
                            placeholder="Engagement"
                            value={editingStudy.afterMetrics?.engagement || ''} 
                            onChange={(e) => handleFieldChange('afterMetrics.engagement', e.target.value)}
                          />
                          <Input 
                            placeholder="Leads"
                            value={editingStudy.afterMetrics?.leads || ''} 
                            onChange={(e) => handleFieldChange('afterMetrics.leads', e.target.value)}
                          />
                          <Input 
                            placeholder="Time Spent"
                            value={editingStudy.afterMetrics?.timeSpent || ''} 
                            onChange={(e) => handleFieldChange('afterMetrics.timeSpent', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* We could add UI for managing stats, social posts, etc. here */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">
                        Note: Additional fields for stats, social posts, and other complex data are not included in this 
                        basic admin interface. These would require more advanced form components.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveStudy} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Case Study'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Result Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudies.length > 0 ? (
                  filteredStudies.map((study) => (
                    <TableRow key={study.id}>
                      <TableCell className="font-medium">{study.name}</TableCell>
                      <TableCell>{study.title}</TableCell>
                      <TableCell>{study.industry}</TableCell>
                      <TableCell>{study.resultType}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditStudy(study)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteStudy(study.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      {searchTerm 
                        ? 'No case studies match your search criteria' 
                        : 'No case studies found. Click "Add New Case Study" to create one.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this case study? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 