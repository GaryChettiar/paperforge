
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Save, Share2, User, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const { toast } = useToast();

  // Handler to copy the current URL to clipboard and show a toast
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "You can now share this page with others.",
      });
    } catch {
      toast({
        title: "Could not copy link",
        description: "Your browser may not support copying. Try manually copying the URL.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <FileText className="w-8 h-8" style={{ color: '#243e36' }} />
          <h1 className="text-xl font-bold" style={{ color: '#243e36' }}>ResumeAI</h1>
        </Link>
        <div className="text-sm text-gray-500">
          Auto-saved 2 minutes ago
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-opacity-10" style={{ color: '#243e36' }}>
          <Save className="w-4 h-4" />
          <span>Save</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 hover:bg-opacity-10"
          style={{ color: '#243e36' }}
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full hover:bg-opacity-10" style={{ color: '#243e36' }}>
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
