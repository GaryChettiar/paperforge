import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ResumeData } from '@/pages/Index';
import { Sparkles, Send, Lightbulb, Target, Wand2 } from 'lucide-react';
import { APIKeyInput } from './APIKeyInput';
import { useAIService } from '@/hooks/useAIService';
import { Settings } from 'lucide-react';

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
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { apiKey, saveApiKey, generateResponse, isLoading, hasApiKey } = useAIService();

  const handleSendMessage = async (prompt?: string) => {
    const messageToSend = prompt || message;
    if (!messageToSend.trim()) return;

    if (!hasApiKey) {
      setShowApiKeyDialog(true);
      return;
    }

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

  const generateAIResponse = (prompt: string, data: ResumeData) => {
    // This is a simplified AI response generator
    // In a real application, you would integrate with OpenAI, Claude, or another AI service
    
    if (prompt.toLowerCase().includes('ats') || prompt.toLowerCase().includes('applicant tracking')) {
      return `Based on your resume, here are some ATS optimization suggestions:

1. **Keywords**: Add more industry-specific keywords relevant to your target role
2. **Formatting**: Use standard section headers like "Work Experience" and "Education"
3. **Skills Section**: Include both hard and soft skills that match job descriptions
4. **Quantify Achievements**: Add more specific numbers and metrics to your accomplishments

Your current skills (${data.skills.join(', ')}) are a good start, but consider adding more technical keywords related to your field.`;
    }
    
    if (prompt.toLowerCase().includes('job description') || prompt.toLowerCase().includes('experience')) {
      return `Here are suggestions to improve your work experience descriptions:

1. **Start with Action Verbs**: Use words like "Led," "Developed," "Implemented," "Optimized"
2. **Quantify Results**: Add specific numbers, percentages, or dollar amounts
3. **Show Impact**: Focus on what you accomplished, not just what you did
4. **Use Industry Keywords**: Include relevant technical terms and skills

For example, instead of "Worked on projects," try "Led cross-functional team of 5 developers to deliver 3 major projects, resulting in 40% performance improvement."`;
    }
    
    if (prompt.toLowerCase().includes('summary') || prompt.toLowerCase().includes('professional')) {
      return `Based on your background, here's an enhanced professional summary:

"Results-driven ${data.experience[0]?.title || 'professional'} with ${data.experience.length}+ years of experience in ${data.skills.slice(0, 3).join(', ')}. Proven track record of ${data.experience[0]?.description[0] || 'delivering high-quality solutions'}. Expertise in ${data.skills.slice(0, 5).join(', ')} with a passion for innovation and continuous learning."

This summary:
- Highlights your experience level
- Mentions key skills
- Shows your value proposition
- Uses industry-relevant keywords`;
    }
    
    return `I'd be happy to help you improve your resume! Here are some general suggestions:

1. **Content Review**: Your resume looks good overall. Consider adding more quantified achievements.
2. **Skills Optimization**: Your skills list (${data.skills.slice(0, 3).join(', ')}) shows good technical breadth.
3. **Experience Enhancement**: Focus on results and impact in your job descriptions.
4. **Format Consistency**: Ensure consistent formatting throughout all sections.

What specific aspect would you like me to focus on next?`;
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
                <span className="text-sm text-gray-500">(DeepSeek R1)</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKeyDialog(true)}
                className="flex items-center space-x-1"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs">{hasApiKey ? 'API Key Set' : 'Set API Key'}</span>
              </Button>
            </DialogTitle>
          </DialogHeader>

          {!hasApiKey && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                Please set your OpenRouter API key to use DeepSeek AI features. 
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setShowApiKeyDialog(true)}
                  className="p-0 h-auto text-yellow-800 underline ml-1"
                >
                  Click here to add it.
                </Button>
              </p>
            </div>
          )}

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

      <APIKeyInput
        isOpen={showApiKeyDialog}
        onClose={() => setShowApiKeyDialog(false)}
        onSave={saveApiKey}
        currentApiKey={apiKey}
      />
    </>
  );
};
