
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ChatClient } from './chat-client';
import { getConversations, type Conversation, type Profile } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

const ChatSkeleton = () => (
  <div className="flex h-full w-full">
    {/* Left Pane Skeleton */}
    <aside className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex-grow p-3 space-y-3 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </aside>
    {/* Right Pane Skeleton */}
    <section className="hidden md:flex flex-col flex-grow h-full">
      <header className="flex items-center p-3 border-b shadow-sm">
        <Skeleton className="h-10 w-10 rounded-full mr-3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </header>
      <div className="flex-grow p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Loading chats...</p>
      </div>
      <footer className="p-3 border-t bg-background">
        <Skeleton className="h-10 w-full" />
      </footer>
    </section>
  </div>
);

// A new wrapper component to safely use useSearchParams
function MessagesPageContent() {
  const searchParams = useSearchParams();
  const { user: currentUserProfile, isLoading: isAuthLoading } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialSelectedProfileId = searchParams.get('chatWith')
    ? parseInt(searchParams.get('chatWith'), 10)
    : undefined;

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (currentUserProfile) {
      const allConversations = getConversations();
      const filteredConversations = allConversations.filter(
        (convo) => convo.participant.role !== currentUserProfile.role
      );
      setConversations(filteredConversations);
    }
    
    setIsLoading(false);
  }, [currentUserProfile, isAuthLoading]);

  if (isLoading || isAuthLoading) {
    return <ChatSkeleton />;
  }

  if (!currentUserProfile) {
     return (
        <div className="flex flex-col flex-grow items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground mt-2">Authenticating...</p>
        </div>
     );
  }

  const currentUserForChat = { id: currentUserProfile.id, name: currentUserProfile.name };

  return (
    <ChatClient
      initialConversations={conversations}
      currentUser={currentUserForChat}
      initialSelectedProfileId={initialSelectedProfileId}
    />
  );
}


export default function MessagesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 flex flex-col">
        <div className="bg-background border rounded-lg overflow-hidden flex-grow flex">
          <Suspense fallback={<ChatSkeleton />}>
            <MessagesPageContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
