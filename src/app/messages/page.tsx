
import { Header } from '@/components/layout/header';
import { ChatClient } from './chat-client';
import { getConversations, getProfile } from '@/lib/data';

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function MessagesPage({ searchParams }: PageProps) {
  const allConversations = getConversations();
  // Assume current user is the one with id 1 ('saytee.software')
  const currentUserProfile = getProfile(1);
  const currentUser = { id: 1, name: 'saytee.software' };

  const conversations = currentUserProfile
    ? allConversations.filter(convo => convo.participant.role !== currentUserProfile.role)
    : [];

  const chatWithParam = searchParams?.chatWith;
  const initialSelectedProfileId = chatWithParam
    ? parseInt(Array.isArray(chatWithParam) ? chatWithParam[0] : chatWithParam, 10)
    : undefined;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 flex flex-col">
        <div className="bg-background border rounded-lg overflow-hidden flex-grow flex">
          <ChatClient 
            initialConversations={conversations} 
            currentUser={currentUser}
            initialSelectedProfileId={initialSelectedProfileId} 
          />
        </div>
      </main>
    </>
  );
}
