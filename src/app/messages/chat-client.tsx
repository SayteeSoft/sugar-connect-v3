
'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, Message, Profile } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Paperclip,
  Smile,
  SendHorizonal,
  MoreVertical,
  Phone,
  Video,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format, isToday, isYesterday } from 'date-fns';

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return format(date, 'p'); // e.g., 4:30 PM
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'MMM d'); // e.g., Jun 28
};

interface ChatClientProps {
  initialConversations: Conversation[];
  currentUser: { id: number; name: string };
  initialSelectedProfileId?: number;
}

export function ChatClient({ initialConversations, currentUser, initialSelectedProfileId }: ChatClientProps) {
  const findConversationIdByProfileId = (profileId?: number): number | null => {
    if (!profileId) return null;
    const conversation = initialConversations.find(
      (c) => c.participant.id === profileId
    );
    return conversation?.id || null;
  };
  
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(
    findConversationIdByProfileId(initialSelectedProfileId) || initialConversations[0]?.id || null
  );
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;

    const message: Message = {
      id: Date.now(),
      senderId: currentUser.id,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setConversations(prev =>
      prev.map(convo =>
        convo.id === selectedConversationId
          ? {
              ...convo,
              messages: [...convo.messages, message],
            }
          : convo
      )
    );
    setNewMessage('');
  };


  return (
    <div className="flex h-full w-full bg-background">
      {/* Left Pane: Conversation List */}
      <aside className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages" className="pl-9" />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={cn(
                'flex items-center p-3 cursor-pointer hover:bg-muted/50 transition-colors',
                selectedConversationId === convo.id && 'bg-muted'
              )}
              onClick={() => setSelectedConversationId(convo.id)}
            >
              <Avatar className="h-12 w-12 mr-3 relative">
                <AvatarImage src={convo.participant.imageUrl} alt={convo.participant.name} data-ai-hint={convo.participant.hint} />
                <AvatarFallback>{convo.participant.name.charAt(0)}</AvatarFallback>
                {convo.participant.online && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                )}
              </Avatar>
              <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{convo.participant.name}</h3>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {isClient ? formatTimestamp(convo.messages[convo.messages.length - 1].timestamp) : null}
                  </p>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm text-muted-foreground truncate">
                    {convo.messages[convo.messages.length - 1].text}
                  </p>
                  {convo.unreadCount > 0 && (
                    <span className="ml-2 flex-shrink-0 text-xs bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center rounded-full font-medium">
                      {convo.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right Pane: Chat Window */}
      <section className="hidden md:flex flex-col flex-grow h-full">
        {selectedConversation ? (
          <>
            <header className="flex items-center p-3 border-b shadow-sm">
              <Avatar className="h-10 w-10 mr-3 relative">
                <AvatarImage
                  src={selectedConversation.participant.imageUrl}
                  alt={selectedConversation.participant.name}
                  data-ai-hint={selectedConversation.participant.hint}
                />
                <AvatarFallback>
                  {selectedConversation.participant.name.charAt(0)}
                </AvatarFallback>
                 {selectedConversation.participant.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                )}
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{selectedConversation.participant.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.participant.online ? 'Online' : `Last seen ${isClient ? formatTimestamp(new Date(Date.now() - 1000 * 60 * 15).toISOString()) : 'recently'}`}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Phone /></Button></TooltipTrigger>
                    <TooltipContent><p>Voice Call</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><Video /></Button></TooltipTrigger>
                    <TooltipContent><p>Video Call</p></TooltipContent>
                  </Tooltip>
                   <Tooltip>
                    <TooltipTrigger asChild><Button variant="ghost" size="icon"><MoreVertical /></Button></TooltipTrigger>
                    <TooltipContent><p>More Options</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </header>
            
            <div className="flex-grow p-4 overflow-y-auto bg-secondary/40">
                <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                'flex items-end gap-2',
                                message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {message.senderId !== currentUser.id && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedConversation.participant.imageUrl} alt={selectedConversation.participant.name} />
                                    <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={cn(
                                'max-w-md rounded-xl px-4 py-2',
                                message.senderId === currentUser.id
                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                    : 'bg-card text-card-foreground rounded-bl-none border'
                                )}
                            >
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <footer className="p-3 border-t bg-background">
                <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                  <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild><Button type="button" variant="ghost" size="icon"><Paperclip /></Button></TooltipTrigger>
                        <TooltipContent><p>Attach File</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild><Button type="button" variant="ghost" size="icon"><Smile /></Button></TooltipTrigger>
                        <TooltipContent><p>Insert Emoji</p></TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        autoComplete="off"
                        className="flex-grow"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                        <SendHorizonal />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </section>
    </div>
  );
}
