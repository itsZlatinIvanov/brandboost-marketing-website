import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BookmarkButtonProps {
  studyId: string;
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  studyId, 
  className 
}) => {
  // Get bookmarks from localStorage
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('clyc_bookmarked_studies') || '[]');
      setIsBookmarked(bookmarks.includes(studyId));
    }
  }, [studyId]);
  
  const toggleBookmark = (e: React.MouseEvent) => {
    // Prevent event bubbling to parent elements
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('clyc_bookmarked_studies') || '[]');
      
      if (isBookmarked) {
        const updatedBookmarks = bookmarks.filter((id: string) => id !== studyId);
        localStorage.setItem('clyc_bookmarked_studies', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
      } else {
        bookmarks.push(studyId);
        localStorage.setItem('clyc_bookmarked_studies', JSON.stringify(bookmarks));
        setIsBookmarked(true);
      }
    }
  };
  
  return (
    <button 
      onClick={toggleBookmark}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors", 
        isBookmarked 
          ? "bg-blue-50 text-blue-600 border-blue-200" 
          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
        className
      )}
      aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      aria-pressed={isBookmarked}
    >
      {isBookmarked ? (
        <>
          <BookmarkCheck className="w-4 h-4" />
          <span className="text-sm">Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4" />
          <span className="text-sm">Save</span>
        </>
      )}
    </button>
  );
}; 