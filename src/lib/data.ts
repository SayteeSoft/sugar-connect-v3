
export type Profile = {
  id: number;
  name: string;
  email: string;
  password?: string;
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

export const bodyTypeOptions = ['Slim', 'Athletic', 'Average', 'Curvy', 'A few extra pounds'];
export const ethnicityOptions = ["Black/African Descent", "North/African Descent", "East Asian", "South Asian", "Hispanic/Latino", "Middle Eastern", "Native American/Indigenous", "White"];
export const hairColorOptions = ["Brown", "Black", "Blonde", "Chestnut", "Grey", "Auburn", "Red"];
export const eyeColorOptions = ["Blue", "Brown", "Green", "Grey", "Hazel"];
export const yesNoOptions = [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}];

export const attributeKeys = [
  'Height',
  'Body Type',
  'Ethnicity',
  'Hair Color',
  'Eye Color',
  'Piercings',
  'Tattoos',
];

const PROFILES_STORAGE_KEY = 'sugarconnect_profiles';
const CONVERSATIONS_STORAGE_KEY = 'sugarconnect_conversations';


export const featuredProfiles: Profile[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'saytee.software@gmail.com',
    password: '12345',
    age: 49,
    location: 'London, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait man',
    role: 'daddy',
    online: false,
    verified: true,
    bio: "I'm a successful entrepreneur with a passion for the finer things in life. I enjoy mentoring ambitious individuals and exploring the world. Looking for a genuine connection with someone who is intelligent, driven, and has a great sense of humor.",
    wants: ['Mentorship', 'Discreet', 'Long-term', 'Travel Partner'],
    interests: ['Art', 'Travel', 'Fine Dining', 'Theatre', 'Wine Tasting'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "6'1\"",
      'Body Type': 'Athletic',
      'Ethnicity': 'White',
      'Hair Color': 'Brown',
      'Eye Color': 'Blue',
      'Piercings': 'No',
      'Tattoos': 'Yes',
    },
  },
  {
    id: 2,
    name: 'Darianna',
    email: 'darianna@example.com',
    password: 'password123',
    age: 24,
    location: 'London, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
    verified: true,
    bio: 'Art student with a love for adventure and exploring new cultures. I enjoy gallery openings, weekend getaways, and trying new restaurants. Seeking a mentor and partner to share life\'s beautiful moments with.',
    wants: ['Mentorship', 'Travel Partner', 'Casual'],
    interests: ['Art', 'Travel', 'Fine Dining', 'Movies'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png'
    ],
    attributes: {
      'Height': "5'5\"",
      'Body Type': 'Slim',
      'Ethnicity': 'White',
      'Hair Color': 'Blonde',
      'Eye Color': 'Blue',
      'Piercings': 'No',
      'Tattoos': 'No',
    },
  },
  {
    id: 3,
    name: 'Kateryna',
    email: 'kateryna@example.com',
    password: 'password123',
    age: 22,
    location: 'Birmingham, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
    verified: false,
    bio: 'Recent graduate starting my career in marketing. I\'m ambitious, fun-loving, and enjoy nights out as much as quiet nights in. Looking for a confident and established man to learn from.',
    wants: ['Networking', 'Mentorship', 'Friendship'],
    interests: ['Music', 'Cooking', 'Fitness', 'Reading'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "5'7\"",
      'Body Type': 'Athletic',
      'Ethnicity': 'White',
      'Hair Color': 'Brown',
      'Eye Color': 'Hazel',
      'Piercings': 'Yes',
      'Tattoos': 'Yes',
    },
  },
  {
    id: 4,
    name: 'Mark',
    email: 'mark@example.com',
    password: 'password123',
    age: 52,
    location: 'Glasgow, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait man',
    role: 'daddy',
    online: true,
    verified: true,
    bio: 'Investor and lover of the great outdoors. I spend my weekends hiking and my weekdays closing deals. I appreciate honesty and a good sense of humor. Ready to spoil the right person.',
    wants: ['Long-term', 'Travel Partner'],
    interests: ['Sports', 'Travel', 'Wine Tasting'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "6'0\"",
      'Body Type': 'Average',
      'Ethnicity': 'White',
      'Hair Color': 'Grey',
      'Eye Color': 'Brown',
      'Piercings': 'No',
      'Tattoos': 'No',
    },
  },
  {
    id: 5,
    name: 'Sofia',
    email: 'sofia@example.com',
    password: 'password123',
    age: 26,
    location: 'Liverpool, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait woman',
    role: 'baby',
    online: false,
    verified: true,
    bio: 'Fashion designer with an eye for beauty and a heart for adventure. I\'m looking for a sophisticated gentleman to share elegant evenings and exciting journeys with.',
    wants: ['Discreet', 'Casual', 'Travel Partner'],
    interests: ['Art', 'Theatre', 'Reading', 'Cooking'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png'
    ],
    attributes: {
      'Height': "5'8\"",
      'Body Type': 'Curvy',
      'Ethnicity': 'Hispanic/Latino',
      'Hair Color': 'Black',
      'Eye Color': 'Brown',
      'Piercings': 'Yes',
      'Tattoos': 'No',
    },
  },
  {
    id: 6,
    name: 'James',
    email: 'james@example.com',
    password: 'password123',
    age: 38,
    location: 'Bristol, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait man',
    role: 'daddy',
    online: true,
    verified: false,
    bio: 'Tech CEO who works hard and plays harder. I enjoy sailing, trying new tech, and intellectual conversations. Seeking a bright, witty companion for dates and possibly more.',
    wants: ['Networking', 'No Strings Attached', 'Casual'],
    interests: ['Sports', 'Music', 'Movies', 'Reading'],
    gallery: [
      'https://placehold.co/600x400.png'
    ],
    attributes: {
      'Height': "5'11\"",
      'Body Type': 'Athletic',
      'Ethnicity': 'White',
      'Hair Color': 'Black',
      'Eye Color': 'Green',
      'Piercings': 'No',
      'Tattoos': 'No',
    },
  },
  {
    id: 7,
    name: 'Vansessa',
    email: 'vanessa@example.com',
    password: 'password123',
    age: 21,
    location: 'Leeds, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
    verified: true,
    bio: 'University student studying literature. I\'m a romantic at heart and love poetry, long walks, and deep conversations. Hoping to find a kind, generous man to create beautiful memories with.',
    wants: ['Long-term', 'Friendship', 'Mentorship'],
    interests: ['Reading', 'Cooking', 'Art', 'Travel'],
    gallery: [],
    attributes: {
      'Height': "5'4\"",
      'Body Type': 'Slim',
      'Ethnicity': 'White',
      'Hair Color': 'Red',
      'Eye Color': 'Green',
      'Piercings': 'No',
      'Tattoos': 'No',
    },
  },
  {
    id: 8,
    name: 'Richard',
    email: 'richard@example.com',
    password: 'password123',
    age: 49,
    location: 'Edinburgh, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'portrait man',
    role: 'daddy',
    online: false,
    verified: true,
    bio: 'Architect with an appreciation for design, history, and good whiskey. I\'m looking for an elegant and intelligent young woman to accompany me to to social events and on travels.',
    wants: ['Travel Partner', 'Discreet', 'Networking'],
    interests: ['Travel', 'Fine Dining', 'Theatre', 'Wine Tasting'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "6'2\"",
      'Body Type': 'Slim',
      'Ethnicity': 'White',
      'Hair Color': 'Brown',
      'Eye Color': 'Blue',
      'Piercings': 'No',
      'Tattoos': 'No',
    },
  },
  {
    id: 9,
    name: 'Olivia',
    email: 'olivia@example.com',
    password: 'password123',
    age: 23,
    location: 'Sheffield, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'woman nature',
    role: 'baby',
    online: false,
    verified: false,
    bio: 'Yoga instructor and nature lover. I find peace in the outdoors and joy in healthy living. Seeking a grounded, successful partner who values wellness and authenticity.',
    wants: ['Friendship', 'Casual', 'Long-term'],
    interests: ['Fitness', 'Cooking', 'Travel', 'Reading'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "5'6\"",
      'Body Type': 'Athletic',
      'Ethnicity': 'Hispanic/Latino',
      'Hair Color': 'Brown',
      'Eye Color': 'Brown',
      'Piercings': 'Yes',
      'Tattoos': 'Yes',
    },
  },
  {
    id: 10,
    name: 'William',
    email: 'william@example.com',
    password: 'password123',
    age: 45,
    location: 'Cardiff, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'man suit',
    role: 'daddy',
    online: true,
    verified: true,
    bio: 'Lawyer with a sharp mind and a generous heart. When I\'m not in the courtroom, I enjoy rugby, classical music, and fine wine. Looking for a bright, ambitious partner to share my success with.',
    wants: ['Long-term', 'Mentorship'],
    interests: ['Sports', 'Music', 'Wine Tasting', 'Reading'],
    gallery: [
        'https://placehold.co/600x400.png'
    ],
    attributes: {
      'Height': "5'10\"",
      'Body Type': 'Average',
      'Ethnicity': 'White',
      'Hair Color': 'Blonde',
      'Eye Color': 'Blue',
      'Piercings': 'No',
      'Tattoos': 'No',
    },
  },
  {
    id: 11,
    name: 'Isla',
    email: 'isla@example.com',
    password: 'password123',
    age: 25,
    location: 'Belfast, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'woman smiling',
    role: 'baby',
    online: true,
    verified: true,
    bio: 'Musician and free spirit. My life is filled with melodies, travel, and laughter. I\'m searching for a patron and partner who appreciates the arts and has a zest for life.',
    wants: ['Travel Partner', 'Friendship', 'Casual'],
    interests: ['Music', 'Art', 'Travel', 'Movies'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "5'7\"",
      'Body Type': 'Slim',
      'Ethnicity': 'White',
      'Hair Color': 'Black',
      'Eye Color': 'Green',
      'Piercings': 'No',
      'Tattoos': 'Yes',
    },
  },
  {
    id: 12,
    name: 'George',
    email: 'george@example.com',
    password: 'password123',
    age: 55,
    location: 'Southampton, UK',
    imageUrl: 'https://placehold.co/600x750.png',
    hint: 'man outdoor',
    role: 'daddy',
    online: false,
    verified: false,
    bio: 'Retired naval officer, now enjoying a life of leisure. I spend my time sailing, golfing, and enjoying good company. Looking for a cheerful and easygoing companion for dinners, events, and travel.',
    wants: ['Casual', 'Travel Partner', 'No Strings Attached'],
    interests: ['Sports', 'Travel', 'Fine Dining', 'Reading'],
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    attributes: {
      'Height': "5'9\"",
      'Body Type': 'Average',
      'Ethnicity': 'White',
      'Hair Color': 'Grey',
      'Eye Color': 'Hazel',
      'Piercings': 'No',
      'Tattoos': 'Yes',
    },
  },
];

const rawConversationsData = [
  {
      id: 1,
      participantId: 2,
      unreadCount: 2,
      messages: [
          { id: 1, senderId: 2, text: 'Hey there! Loved your profile, especially your taste in art.', timestamp: '2024-07-28T10:00:00.000Z' },
          { id: 2, senderId: 1, text: 'Thank you, Darianna. I appreciate that. You have a wonderful smile.', timestamp: '2024-07-28T10:05:00.000Z' },
          { id: 3, senderId: 2, text: 'Aww, thanks! You seem like a really interesting person. What are you up to this weekend?', timestamp: '2024-07-28T11:20:00.000Z' },
          { id: 4, senderId: 2, text: 'Let me know if you might be free for a drink.', timestamp: '2024-07-28T11:21:00.000Z' },
      ]
  },
  {
      id: 2,
      participantId: 3,
      unreadCount: 0,
      messages: [
          { id: 1, senderId: 1, text: 'Good morning, Kateryna. I hope you have a great day.', timestamp: '2024-07-27T09:00:00.000Z' },
          { id: 2, senderId: 3, text: 'Morning! You too. Thanks for the message :)', timestamp: '2024-07-27T09:12:00.000Z' },
          { id: 3, senderId: 1, text: 'Any plans for the upcoming week?', timestamp: '2024-07-27T18:30:00.000Z' },
          { id: 4, senderId: 3, text: 'Not yet! Still trying to figure things out. You?', timestamp: '2024-07-27T18:35:00.000Z' },
      ]
  },
   {
      id: 3,
      participantId: 5,
      unreadCount: 0,
      messages: [
          { id: 1, senderId: 5, text: 'Your profile mentioned you enjoy fine dining. Any favorite spots?', timestamp: '2024-07-26T15:00:00.000Z' },
          { id: 2, senderId: 1, text: 'Absolutely. There\'s a fantastic French place downtown I could recommend. Perhaps I could take you sometime.', timestamp: '2024-07-26T15:10:00.000Z' },
      ]
  },
  {
      id: 4,
      participantId: 7,
      unreadCount: 1,
      messages: [
          { id: 1, senderId: 7, text: 'Hi! I saw you\'re a travel partner. What\'s the most amazing place you\'ve visited?', timestamp: '2024-07-28T12:00:00.000Z' },
      ]
  },
];


/**
 * Retrieves profiles from localStorage. If not present, seeds localStorage with initial data.
 * This function should only be called on the client side.
 * @returns {Profile[]} An array of profiles.
 */
export const getProfiles = (): Profile[] => {
  if (typeof window === 'undefined') {
    return []; // Return empty array on server to prevent mismatch.
  }
  try {
    const storedProfiles = window.localStorage.getItem(PROFILES_STORAGE_KEY);
    
    if (storedProfiles) {
      const profiles: Profile[] = JSON.parse(storedProfiles);
      // Ensure admin password is not overwritten by old stored data
      const adminSourceData = featuredProfiles.find(p => p.id === 1);
      const adminStoredIndex = profiles.findIndex(p => p.id === 1);
      if (adminSourceData && adminStoredIndex !== -1) {
          profiles[adminStoredIndex] = { ...profiles[adminStoredIndex], ...adminSourceData };
      } else if (adminSourceData && adminStoredIndex === -1) {
          profiles.push(adminSourceData);
      }
      return profiles;
    } else {
      window.localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(featuredProfiles));
      return featuredProfiles;
    }
  } catch (error) {
    console.error('Failed to access localStorage:', error);
    return featuredProfiles; // Fallback to default data on parsing error
  }
};

/**
 * Retrieves a single profile by ID.
 * This function is client-side only.
 * @param {number} id - The ID of the profile to retrieve.
 * @returns {Profile | undefined} The profile object or undefined if not found.
 */
export const getProfile = (id: number): Profile | undefined => {
  return getProfiles().find(profile => profile.id === id);
};

/**
 * Creates a new user profile and saves it to localStorage.
 * This function should only be called on the client side.
 * @param {string} email - The new user's email.
 * @param {string} password - The new user's password.
 * @param {'baby' | 'daddy'} role - The new user's role.
 * @returns {Profile | { error: string }} The new profile object or an error object.
 */
export const createProfile = (email: string, password: string, role: 'baby' | 'daddy'): Profile | { error: string } => {
  if (typeof window === 'undefined') {
    return { error: 'This function can only be called on the client.' };
  }
  try {
    const profiles = getProfiles();
    
    // Check if email already exists
    if (profiles.some(p => p.email && p.email.toLowerCase() === email.toLowerCase())) {
      return { error: 'A user with this email address already exists.' };
    }
    
    const newId = profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
    const name = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const newProfile: Profile = {
      id: newId,
      name: name,
      email: email,
      password: password,
      age: 18,
      location: '',
      imageUrl: role === 'baby' ? 'https://placehold.co/600x750.png' : 'https://placehold.co/600x750.png',
      hint: role === 'baby' ? 'woman smiling' : 'man suit',
      role: role,
      online: true, // log them in as online
      verified: false,
      bio: '',
      wants: [],
      interests: [],
      gallery: [],
      attributes: {},
    };

    const updatedProfiles = [...profiles, newProfile];
    window.localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
    
    window.dispatchEvent(new Event('profileUpdated'));
    
    return newProfile;
  } catch (error) {
    console.error('Failed to create profile in localStorage:', error);
    return { error: 'An unexpected error occurred.' };
  }
};


/**
 * Updates a profile in localStorage.
 * This function should only be called on the client side.
 * @param {Profile} updatedProfile - The profile object with updated data.
 * @returns {boolean} True if the update was successful, false otherwise.
 */
export const updateProfile = (updatedProfile: Profile): boolean => {
  if (typeof window === 'undefined') {
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
    // Notify components that user data might have changed (e.g., in the header)
    window.dispatchEvent(new Event('authChanged')); 
    return true;
  } catch (error) {
    console.error('Failed to update profile in localStorage:', error);
    // Check for QuotaExceededError
    if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.code === 22)) {
      // This is where we could show a more specific message to the user, but for now, we just log it.
      console.error("Storage quota exceeded. Could not save profile.");
    }
    return false;
  }
};

/**
 * Deletes a profile from localStorage.
 * This function should only be called on the client side.
 * @param {number} profileId - The ID of the profile to delete.
 * @returns {boolean} True if the deletion was successful, false otherwise.
 */
export const deleteProfile = (profileId: number): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    let profiles = getProfiles();
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    window.localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));

    window.dispatchEvent(new Event('profileUpdated'));
    return true;
  } catch (error) {
    console.error('Failed to delete profile from localStorage:', error);
    return false;
  }
};


/**
 * Retrieves raw conversations data from localStorage. If not present, seeds localStorage with initial data.
 * This function should only be called on the client side.
 * @returns {any[]} An array of raw conversation data.
 */
const getRawConversationsData = (): any[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedConversations = window.localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
        if (storedConversations) {
            return JSON.parse(storedConversations);
        } else {
            window.localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(rawConversationsData));
            return rawConversationsData;
        }
    } catch (error) {
        console.error('Failed to access localStorage for conversations:', error);
        return [];
    }
};

/**
 * Saves a new message to a conversation in localStorage.
 * This function should only be called on the client side.
 * @param {number} conversationId - The ID of the conversation to update.
 * @param {Message} message - The new message object to add.
 * @returns {boolean} True if the save was successful, false otherwise.
 */
export const saveMessage = (conversationId: number, message: Message): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }
    try {
        const conversations = getRawConversationsData();
        const convoIndex = conversations.findIndex(c => c.id === conversationId);

        if (convoIndex === -1) {
            console.error(`Conversation with id ${conversationId} not found.`);
            return false;
        }

        conversations[convoIndex].messages.push(message);
        window.localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
        return true;
    } catch (error) {
        console.error('Failed to save message to localStorage:', error);
        return false;
    }
};


/**
 * Retrieves all conversations. In a real app, this would be for the logged-in user.
 * This function is client-side only.
 * @returns {Conversation[]} An array of conversation objects.
 */
export const getConversations = (): Conversation[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    const currentConversationsData = getRawConversationsData();

    const conversations: Conversation[] = currentConversationsData.map(convo => {
        const participant = getProfile(convo.participantId);
        // If a participant profile is deleted, we'll filter out the conversation.
        // In a real app, you might want to handle this differently.
        if (!participant) {
            return null;
        }
        return {
            id: convo.id,
            participant: participant,
            messages: convo.messages,
            unreadCount: convo.unreadCount,
        };
    }).filter((c): c is Conversation => c !== null);

    // Sorting by the most recent message
    return conversations.sort((a, b) => {
        const lastMessageA = new Date(a.messages[a.messages.length - 1].timestamp).getTime();
        const lastMessageB = new Date(b.messages[b.messages.length - 1].timestamp).getTime();
        return lastMessageB - lastMessageA;
    });
};
