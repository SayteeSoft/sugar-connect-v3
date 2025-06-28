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
