
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Send, Globe, Download, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Types for our chat messages
type MessageType = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

// Languages supported by the chatbot
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
];

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
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll to bottom of chat when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      scrollToBottom();
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

  // Change language
  const changeLanguage = (langCode: string) => {
    const selectedLang = languages.find(lang => lang.code === langCode) || languages[0];
    setCurrentLanguage(selectedLang);
    setIsLanguageDialogOpen(false);
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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Medical Symptom Chat</h1>
            <div className="flex items-center gap-3">
              <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    {currentLanguage.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select Language</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={currentLanguage.code === lang.code ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={generateReport}
                disabled={isGeneratingReport || messages.length < 2}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingReport ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
          
          <Card className="mb-4 shadow-sm">
            <div className="h-[60vh] overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-3/4 rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-medical-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-medical-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </Card>
          
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
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
