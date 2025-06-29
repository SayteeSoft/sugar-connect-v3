
export type Profile = {
  id: number;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  role: 'baby' | 'daddy';
  online: boolean;
  hint: string;
  verified?: boolean;
  bio?: string;
  wants?: string[];
  interests?: string[];
  gallery?: string[];
  attributes?: {
    [key: string]: string;
  };
};

export type Message = {
  id: number;
  senderId: number; // Corresponds to a Profile ID
  text: string;
  timestamp: string; // ISO string for simplicity
};

export type Conversation = {
  id: number;
  participant: Profile;
  messages: Message[];
  unreadCount: number;
};

export const wantsOptions = [
  'Mentorship', 'Discreet', 'Long-term', 'Travel Partner', 
  'Casual', 'No Strings Attached', 'Friendship', 'Networking'
];

export const interestsOptions = [
  'Art', 'Travel', 'Fine Dining', 'Theatre', 'Wine Tasting',
  'Sports', 'Music', 'Movies', 'Reading', 'Cooking', 'Fitness'
];


export const featuredProfiles: Profile[] = [
  {
    id: 1,
    name: 'saytee.software',
    age: 49,
    location: 'London, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait man',
    role: 'daddy',
    online: false,
    verified: true,
    bio: "I'm a successful entrepreneur with a passion for the finer things in life. I enjoy mentoring ambitious individuals and exploring the world. Looking for a genuine connection with someone who is intelligent, driven, and has a great sense of humor.",
    wants: ['Mentorship', 'Discreet', 'Long-term', 'Travel Partner'],
    interests: ['Art', 'Travel', 'Fine Dining', 'Theatre', 'Wine Tasting'],
    gallery: [
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
    ],
    attributes: {
      'Age': "49",
      'Height': "6'1\"",
      'Body Type': 'Athletic',
      'Ethnicity': 'Caucasian',
      'Hair Color': 'Brown',
      'Eye Color': 'Blue',
      'Piercings': 'None',
      'Tattoos': 'Sleeve on left arm',
    },
  },
  {
    id: 2,
    name: 'Jessica',
    age: 24,
    location: 'London, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
  },
  {
    id: 3,
    name: 'Sophie',
    age: 22,
    location: 'Birmingham, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
  },
  {
    id: 4,
    name: 'Mark',
    age: 52,
    location: 'Glasgow, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait man',
    role: 'daddy',
    online: true,
  },
  {
    id: 5,
    name: 'Chloe',
    age: 26,
    location: 'Liverpool, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait woman',
    role: 'baby',
    online: false,
  },
  {
    id: 6,
    name: 'James',
    age: 38,
    location: 'Bristol, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait man',
    role: 'daddy',
    online: true,
  },
  {
    id: 7,
    name: 'Amelia',
    age: 21,
    location: 'Leeds, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
  },
  {
    id: 8,
    name: 'Richard',
    age: 49,
    location: 'Edinburgh, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait man',
    role: 'daddy',
    online: false,
  },
  {
    id: 9,
    name: 'Olivia',
    age: 23,
    location: 'Sheffield, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'woman nature',
    role: 'baby',
    online: false,
  },
  {
    id: 10,
    name: 'William',
    age: 45,
    location: 'Cardiff, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'man suit',
    role: 'daddy',
    online: true,
  },
  {
    id: 11,
    name: 'Isla',
    age: 25,
    location: 'Belfast, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'woman smiling',
    role: 'baby',
    online: true,
  },
  {
    id: 12,
    name: 'George',
    age: 55,
    location: 'Southampton, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'man outdoor',
    role: 'daddy',
    online: false,
  },
];

const PROFILES_STORAGE_KEY = 'sugarconnect_profiles';

const now = new Date();
const getTimestamp = (minutesAgo: number) => new Date(now.getTime() - minutesAgo * 60 * 1000).toISOString();


const conversationsData: Conversation[] = [
    {
        id: 1,
        participant: featuredProfiles.find(p => p.id === 2)!,
        unreadCount: 2,
        messages: [
            { id: 1, senderId: 2, text: 'Hey there! Loved your profile, especially your taste in art.', timestamp: getTimestamp(120) },
            { id: 2, senderId: 1, text: 'Thank you, Jessica. I appreciate that. You have a wonderful smile.', timestamp: getTimestamp(115) },
            { id: 3, senderId: 2, text: 'Aww, thanks! You seem like a really interesting person. What are you up to this weekend?', timestamp: getTimestamp(10) },
            { id: 4, senderId: 2, text: 'Let me know if you might be free for a drink.', timestamp: getTimestamp(9) },
        ]
    },
    {
        id: 2,
        participant: featuredProfiles.find(p => p.id === 3)!,
        unreadCount: 0,
        messages: [
            { id: 1, senderId: 1, text: 'Good morning, Sophie. I hope you have a great day.', timestamp: getTimestamp(1440) },
            { id: 2, senderId: 3, text: 'Morning! You too. Thanks for the message :)', timestamp: getTimestamp(1430) },
            { id: 3, senderId: 1, text: 'Any plans for the upcoming week?', timestamp: getTimestamp(900) },
            { id: 4, senderId: 3, text: 'Not yet! Still trying to figure things out. You?', timestamp: getTimestamp(895) },
        ]
    },
     {
        id: 3,
        participant: featuredProfiles.find(p => p.id === 5)!,
        unreadCount: 0,
        messages: [
            { id: 1, senderId: 5, text: 'Your profile mentioned you enjoy fine dining. Any favorite spots?', timestamp: getTimestamp(2880) },
            { id: 2, senderId: 1, text: 'Absolutely. There\'s a fantastic French place downtown I could recommend. Perhaps I could take you sometime.', timestamp: getTimestamp(2870) },
        ]
    },
    {
        id: 4,
        participant: featuredProfiles.find(p => p.id === 7)!,
        unreadCount: 1,
        messages: [
            { id: 1, senderId: 7, text: 'Hi! I saw you\'re a travel partner. What\'s the most amazing place you\'ve visited?', timestamp: getTimestamp(5) },
        ]
    },
];


/**
 * Retrieves profiles from localStorage. If not present, seeds localStorage with initial data.
 * This function should only be called on the client side for dynamic data.
 * On the server, it returns the static list.
 * @returns {Profile[]} An array of profiles.
 */
export const getProfiles = (): Profile[] => {
  if (typeof window === 'undefined') {
    return featuredProfiles;
  }

  try {
    const storedProfiles = window.localStorage.getItem(PROFILES_STORAGE_KEY);
    if (storedProfiles) {
      return JSON.parse(storedProfiles);
    } else {
      window.localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(featuredProfiles));
      return featuredProfiles;
    }
  } catch (error) {
    console.error('Failed to access localStorage:', error);
    return featuredProfiles;
  }
};

/**
 * Retrieves a single profile by ID.
 * Uses localStorage on the client, and static data on the server.
 * @param {number} id - The ID of the profile to retrieve.
 * @returns {Profile | undefined} The profile object or undefined if not found.
 */
export const getProfile = (id: number): Profile | undefined => {
  const profiles = getProfiles();
  return profiles.find(p => p.id === id);
};

/**
 * Updates a profile in localStorage.
 * This function should only be called on the client side.
 * @param {Profile} updatedProfile - The profile object with updated data.
 * @returns {boolean} True if the update was successful, false otherwise.
 */
export const updateProfile = (updatedProfile: Profile): boolean => {
  if (typeof window === 'undefined') {
    console.warn('updateProfile can only be called on the client side.');
    return false;
  }

  try {
    const profiles = getProfiles();
    const profileIndex = profiles.findIndex(p => p.id === updatedProfile.id);

    if (profileIndex === -1) {
      console.error(`Profile with id ${updatedProfile.id} not found.`);
      return false;
    }

    profiles[profileIndex] = updatedProfile;
    window.localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    return true;
  } catch (error) {
    console.error('Failed to update profile in localStorage:', error);
    return false;
  }
};

/**
 * Retrieves all conversations. In a real app, this would be for the logged-in user.
 * @returns {Conversation[]} An array of conversation objects.
 */
export const getConversations = (): Conversation[] => {
    // In a real app, you'd fetch this from an API. For now, we return static data.
    // Sorting by the most recent message
    return conversationsData.sort((a, b) => {
        const lastMessageA = new Date(a.messages[a.messages.length - 1].timestamp).getTime();
        const lastMessageB = new Date(b.messages[b.messages.length - 1].timestamp).getTime();
        return lastMessageB - lastMessageA;
    });
};
