import { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { 
  Bold, Italic, Underline, List, AlignLeft,
  AlignCenter, AlignRight, Link, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  minHeight?: string;
}

export const RichTextEditor = ({ 
  value, 
  onChange, 
  label,
  minHeight = '200px'
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);
  
  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  // Handle formatting commands
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleContentChange();
    }
  };
  
  const handleLinkInsert = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };
  
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <div className="border border-gray-200 rounded-md overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 p-2 border-b border-gray-200 flex flex-wrap gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-300 mx-1" />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-300 mx-1" />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-300 mx-1" />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLinkInsert}
            className="h-8 w-8 p-0"
          >
            <Link className="h-4 w-4" />
          </Button>
          
          <div className="flex-1" />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              if (editorRef.current) {
                editorRef.current.innerHTML = '';
                handleContentChange();
              }
            }}
            className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
        
        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          className="p-3 outline-none"
          style={{ minHeight }}
          onInput={handleContentChange}
          onBlur={handleContentChange}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
      
      <p className="text-xs text-gray-500">
        Use the toolbar above to format your text. Select text to apply formatting.
      </p>
    </div>
  );
}; 