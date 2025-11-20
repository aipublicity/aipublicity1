import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types';
import { INITIAL_CONTENT } from '../constants';

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ai_publicity_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge parsed content with INITIAL_CONTENT to ensure all fields (like new 'branding' field) exist
        // This prevents crashes if the schema changes
        setContent({ ...INITIAL_CONTENT, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved content");
      }
    }
  }, []);

  const updateContent = (section: keyof SiteContent, data: any) => {
    const newContent = { ...content, [section]: { ...content[section], ...data } };
    setContent(newContent);
    localStorage.setItem('ai_publicity_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(INITIAL_CONTENT);
    localStorage.removeItem('ai_publicity_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};