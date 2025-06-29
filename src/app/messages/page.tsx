
import { Header } from '@/components/layout/header';
import { ChatClient } from './chat-client';
import { getConversations } from '@/lib/data';

export default function MessagesPage() {
  const conversations = getConversations();
  // Assume current user is the one with id 1 ('saytee.software')
  const currentUser = { id: 1, name: 'saytee.software' };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 flex flex-col">
        <div className="bg-background border rounded-lg overflow-hidden flex-grow flex">
          <ChatClient initialConversations={conversations} currentUser={currentUser} />
        </div>
      </main>
    </div>
  );
}
