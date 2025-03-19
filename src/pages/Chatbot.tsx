
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatHeader from '@/components/chatbot/ChatHeader';
import ChatMessages from '@/components/chatbot/ChatMessages';
import ChatInput from '@/components/chatbot/ChatInput';

// Types for our chat messages
type MessageType = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm Swarup, your medical assistant. I'm here to help identify your symptoms and prepare a report for your doctor. How can I help you today?",
      type: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ code: 'en', name: 'English' });
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate assistant response (in a real app, this would be an API call)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're experiencing these symptoms. Let me ask you a few more questions to better understand your condition.",
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  // Handle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop a voice recording
    // and send it to a speech-to-text service
    
    if (isRecording) {
      // This would be where we process the recording
      setInputValue(inputValue + " [Voice input would be transcribed here]");
    }
  };

  // Toggle TTS audio output
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Generate and download PDF report
  const generateReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation (in a real app, this would call an API)
    setTimeout(() => {
      setIsGeneratingReport(false);
      // This would trigger a PDF download in a real implementation
      alert("Report generated and downloaded!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <ChatHeader 
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            isMuted={isMuted}
            toggleMute={toggleMute}
            generateReport={generateReport}
            isGeneratingReport={isGeneratingReport}
            messageCount={messages.length}
          />
          
          <Card className="mb-4 shadow-sm">
            <ChatMessages messages={messages} />
          </Card>
          
          <ChatInput 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            currentLanguage={currentLanguage}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
