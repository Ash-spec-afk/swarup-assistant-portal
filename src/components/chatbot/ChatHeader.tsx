
import { useState } from 'react';
import { Globe, Download, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

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

interface ChatHeaderProps {
  currentLanguage: { code: string; name: string };
  setCurrentLanguage: (lang: { code: string; name: string }) => void;
  isMuted: boolean;
  toggleMute: () => void;
  generateReport: () => void;
  isGeneratingReport: boolean;
  messageCount: number;
}

const ChatHeader = ({
  currentLanguage,
  setCurrentLanguage,
  isMuted,
  toggleMute,
  generateReport,
  isGeneratingReport,
  messageCount
}: ChatHeaderProps) => {
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  
  const changeLanguage = (langCode: string) => {
    const selectedLang = languages.find(lang => lang.code === langCode) || languages[0];
    setCurrentLanguage(selectedLang);
    setIsLanguageDialogOpen(false);
  };

  return (
    <div className="mb-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/chatbot">Medical Assistant</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
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
            disabled={isGeneratingReport || messageCount < 2}
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingReport ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
