import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatClient } from './chat-client';
import { getConversations } from '@/lib/data';

export default function MessagesPage() {
  const conversations = getConversations();
  // Assume current user is the one with id 2 ('saytee.software')
  const currentUser = { id: 2, name: 'saytee.software' };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-hidden">
        <ChatClient initialConversations={conversations} currentUser={currentUser} />
      </main>
    </div>
  );
}
