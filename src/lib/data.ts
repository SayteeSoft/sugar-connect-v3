
export type Profile = {
  id: number;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  role: 'baby' | 'daddy';
  online: boolean;
  hint: string;
};

export const featuredProfiles: Profile[] = [
  {
    id: 1,
    name: 'Jessica',
    age: 24,
    location: 'London, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait woman',
    role: 'baby',
    online: true,
  },
  {
    id: 2,
    name: 'David',
    age: 45,
    location: 'Manchester, UK',
    imageUrl: 'https://placehold.co/600x400',
    hint: 'portrait man',
    role: 'daddy',
    online: false,
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
];

const PROFILES_STORAGE_KEY = 'sugarconnect_profiles';

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
