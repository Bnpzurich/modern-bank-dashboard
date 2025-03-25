import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import { Mail, Paperclip } from 'lucide-react';

const triggerFileInput = (id: string) => {
  const element = document.getElementById(id);
  if (element instanceof HTMLElement) {
    element.click();
  }
};

export default function Support() {
  const { toast } = useToast()
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAttachment(event.target.files[0]);
    } else {
      setAttachment(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Simulate sending the support request
    console.log('Sending support request:', {
      email,
      message,
      attachment: attachment ? attachment.name : 'No attachment',
    });

    // Clear the form
    setEmail('');
    setMessage('');
    setAttachment(null);

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="mb-4">
        Need assistance? Send us a message and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            id="email"
            className="mt-1 block w-full"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <Textarea
            id="message"
            rows={5}
            className="mt-1 block w-full"
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachment (optional)
          </label>
          <div className="mt-1 flex items-center">
            <Button
              variant="secondary"
              type="button"
              onClick={() => triggerFileInput('upload-input')}
            >
              <Paperclip className="mr-2 h-4 w-4" />
              {attachment ? attachment.name : 'Upload file'}
            </Button>
            <Input
              type="file"
              id="upload-input"
              className="hidden"
              onChange={handleFileChange}
            />
            {attachment && (
              <span className="ml-2 text-gray-500">
                {attachment.name}
              </span>
            )}
          </div>
        </div>

        <div>
          <Button type="submit" className="btn-hover">
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}
