
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Save, Share2, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">ResumeAI</h1>
        </div>
        <div className="text-sm text-gray-500">
          Auto-saved 2 minutes ago
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
