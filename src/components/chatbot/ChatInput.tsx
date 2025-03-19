
import { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isRecording: boolean;
  toggleRecording: () => void;
  currentLanguage: { code: string; name: string };
}

const ChatInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isRecording,
  toggleRecording,
  currentLanguage
}: ChatInputProps) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className={`rounded-full p-3 ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
          onClick={toggleRecording}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Textarea
          placeholder={`Type your symptoms in ${currentLanguage.name}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="rounded-xl resize-none"
          rows={1}
        />
        
        <Button 
          onClick={handleSendMessage} 
          disabled={inputValue.trim() === ''}
          className="rounded-full p-3 bg-medical-600 hover:bg-medical-700"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Your conversation is private and secure. You can download a PDF report to share with your doctor.
      </div>
    </div>
  );
};

export default ChatInput;
