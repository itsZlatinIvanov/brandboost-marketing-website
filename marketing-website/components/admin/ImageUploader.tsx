import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  accept?: string;
  maxSizeMB?: number;
}

export const ImageUploader = ({
  value,
  onChange,
  label,
  accept = 'image/jpeg, image/png, image/jpg',
  maxSizeMB = 2
}: ImageUploaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Error reading file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange('');
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
                  alt="Uploaded" 
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
        
        <div className="flex flex-col justify-center">
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <div className="space-y-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => inputRef.current?.click()}
              className="w-full"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Select Image
            </Button>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG. Max size: {maxSizeMB}MB
            </p>
            {value && value.startsWith('http') && (
              <p className="text-xs text-gray-500">
                Current image is from URL. Upload a new one to replace it.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 