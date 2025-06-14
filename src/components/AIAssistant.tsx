
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ResumeData } from '@/pages/Index';
import { Sparkles, Send, Lightbulb, Target, Wand2 } from 'lucide-react';
import { useAIService } from '@/hooks/useAIService';
// Removed: import { APIKeyInput } from './APIKeyInput';
// Removed: import { Settings } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onResumeDataChange: (data: ResumeData) => void;
}

const suggestions = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Optimize for ATS",
    description: "Make your resume more compatible with Applicant Tracking Systems",
    prompt: "Please analyze my resume and suggest improvements to make it more ATS-friendly. Focus on keyword optimization and format improvements."
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Improve Job Descriptions",
    description: "Enhance your work experience descriptions with action verbs and quantified achievements",
    prompt: "Please review my work experience descriptions and suggest improvements using strong action verbs and quantified achievements."
  },
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: "Professional Summary",
    description: "Create a compelling professional summary that highlights your key strengths",
    prompt: "Based on my experience and skills, please write a compelling professional summary that would catch a recruiter's attention."
  }
];

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onClose,
  resumeData,
  onResumeDataChange
}) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  // Removed: const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { generateResponse, isLoading } = useAIService(); // apiKey, saveApiKey, hasApiKey not needed

  const handleSendMessage = async (prompt?: string) => {
    const messageToSend = prompt || message;
    if (!messageToSend.trim()) return;

    setConversation(prev => [...prev, { role: 'user', content: messageToSend }]);
    setMessage('');

    try {
      const aiResponse = await generateResponse(messageToSend, resumeData);
      setConversation(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${errorMessage}` 
      }]);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>AI Resume Assistant</span>
                <span className="text-sm text-gray-500">(DeepSeek R1 Free)</span>
              </div>
              {/* Removed settings button for API key */}
            </DialogTitle>
          </DialogHeader>

          {/* Removed API key warning and prompt UI */}

          <div className="flex-1 flex space-x-4 overflow-hidden">
            {/* Suggestions Panel */}
            <div className="w-1/3 space-y-3">
              <h3 className="font-medium text-gray-900">Quick Actions</h3>
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className="p-3 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  onClick={() => handleSendMessage(suggestion.prompt)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600">{suggestion.icon}</div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Chat Panel */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {conversation.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Welcome to AI Resume Assistant!</p>
                    <p className="text-sm mt-2">Ask me anything about your resume or use the quick actions on the left.</p>
                  </div>
                ) : (
                  conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about your resume..."
                  className="flex-1 min-h-[40px] max-h-[100px] resize-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={() => handleSendMessage()} 
                  disabled={!message.trim() || isLoading}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Removed APIKeyInput dialog */}
    </>
  );
};

// This file is getting long (over 200 lines). Please consider refactoring it to smaller components for better maintainability.
