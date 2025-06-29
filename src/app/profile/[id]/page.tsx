'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { getProfile, updateProfile, type Profile, wantsOptions, interestsOptions, attributeKeys, deleteProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import {
  BadgeCheck,
  Pencil,
  Flag,
  Mail,
  Camera,
  Loader2,
  Heart,
  Ban,
  MessageSquare,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { MultiSelect, type MultiSelectOption } from '@/components/ui/multi-select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GalleryModal } from '@/components/gallery-modal';
import imageCompression from 'browser-image-compression';

const ProfileView = ({ profile, onEdit, isOwnProfile, canEdit, onMessage, onFavorite, onReport, onBlock, loggedInUser, isAdmin, onOpenGallery }: { 
  profile: Profile; 
  onEdit: () => void; 
  isOwnProfile: boolean; 
  canEdit: boolean; 
  onMessage: (profileId: number) => void;
  onFavorite: (profileName: string) => void;
  onReport: (profileName: string) => void;
  onBlock: (profileId: number, profileName: string) => void;
  loggedInUser?: Profile;
  isAdmin: boolean;
  onOpenGallery: (index: number) => void;
}) => {
    const canMessage = !isOwnProfile && loggedInUser && (isAdmin || profile.role !== loggedInUser.role);

    return (
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
    {/* Left Column */}
    <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative group cursor-pointer" onClick={() => onOpenGallery(-1)}>
          <Image
            key={profile.imageUrl}
            src={profile.imageUrl ?? 'https://placehold.co/600x600'}
            alt={`Profile of ${profile.name}`}
            width={600}
            height={600}
            className="w-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={profile.hint}
            priority
          />
           <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          {profile.verified && (
            <Badge className="absolute top-4 left-4 border-2 border-white/50 bg-primary text-primary-foreground">
              <BadgeCheck className="mr-1 h-4 w-4" />
              Verified
            </Badge>
          )}
           {canEdit && <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <Pencil className="h-4 w-4" />
          </Button>}
        </div>
        <CardContent className="p-6 space-y-4">
           <div>
            <h1 className="text-3xl font-bold font-headline">{profile.name}</h1>
            <div className="flex items-center gap-4 mt-2">
                <Badge variant={profile.role === 'daddy' ? 'secondary' : 'outline'}>
                    {profile.role === 'daddy' ? 'Sugar Daddy' : 'Sugar Baby'}
                </Badge>
                <p className="text-muted-foreground text-lg">{profile.age}, {profile.location}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {canMessage && <Button size="lg" onClick={() => onMessage(profile.id)}><Mail className="mr-2" /> Message</Button>}
            {canEdit && <Button variant="secondary" onClick={onEdit}><Pencil className="mr-2" /> Edit Profile</Button>}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Right Column */}
    <div className="w-full lg:w-2/3 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>About {profile.name}</CardTitle>
          {!isOwnProfile && (
            <TooltipProvider>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onFavorite(profile.name)}>
                      <Heart className="h-5 w-5 text-muted-foreground" />
                      <span className="sr-only">Add to Favorites</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Favorites</p>
                  </TooltipContent>
                </Tooltip>
                {canMessage && (
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onMessage(profile.id)}>
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <span className="sr-only">Send Message</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Send Message</p>
                    </TooltipContent>
                    </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onReport(profile.name)}>
                      <Flag className="h-5 w-5 text-muted-foreground" />
                      <span className="sr-only">Report Profile</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Report Profile</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onBlock(profile.id, profile.name)}>
                      <Ban className="h-5 w-5 text-muted-foreground" />
                      <span className="sr-only">Block User</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Block User</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{profile.bio}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wants & Interests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-sm">Wants</h3>
            <div className="flex flex-wrap gap-2">
              {profile.wants?.map(item => <Badge key={item} variant="secondary" className="rounded-full px-3 py-1">{item}</Badge>)}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests?.map(item => <Badge key={item} variant="secondary" className="rounded-full px-3 py-1">{item}</Badge>)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.gallery && profile.gallery.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {profile.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square cursor-pointer group" onClick={() => onOpenGallery(i)}>
                  <Image src={img} alt={`Gallery image ${i + 1}`} fill className="rounded-md object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">This user hasn't added any photos to their gallery yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {attributeKeys.map((key) => (
              <React.Fragment key={key}>
                <dt className="font-medium text-foreground">{key}</dt>
                <dd className="text-muted-foreground">{profile.attributes?.[key] || 'N/A'}</dd>
              </React.Fragment>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  </div>
)};

const ProfileEdit = ({ profile, onSave, onCancel }: { profile: Profile; onSave: (p: Profile) => void; onCancel: () => void }) => {
    const [editedProfile, setEditedProfile] = useState(profile);
    const profileImageInputRef = useRef<HTMLInputElement>(null);
    const galleryImageInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    
    const wantsSelectOptions: MultiSelectOption[] = wantsOptions.map(o => ({ value: o, label: o }));
    const interestsSelectOptions: MultiSelectOption[] = interestsOptions.map(o => ({ value: o, label: o }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({...prev, [name]: name === 'age' ? parseInt(value) : value}));
    };

    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            toast({
                title: "Compressing Image...",
                description: "Please wait while we optimize your photo.",
            });
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            }
            try {
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    const dataUrl = reader.result as string;
                    setEditedProfile(prev => ({ ...prev, imageUrl: dataUrl }));
                    toast({
                        title: "Image Preview Updated",
                        description: "Your compressed profile picture is ready. Remember to save your profile.",
                    });
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Compression Failed',
                    description: 'Could not compress the image. Please try a different one.',
                });
                console.error(error);
            }
        }
    };

    const handleGalleryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const currentGallery = editedProfile.gallery || [];
        const spaceAvailable = 5 - currentGallery.length;

        if (spaceAvailable <= 0) {
            toast({
                variant: 'destructive',
                title: 'Gallery Full',
                description: 'You have already uploaded the maximum of 5 photos.',
            });
            return;
        }
        
        const filesToProcess = Array.from(files).slice(0, spaceAvailable);

        if (files.length > spaceAvailable) {
            toast({
                title: 'Upload Limit Reached',
                description: `You can only add ${spaceAvailable} more photo(s). The first ${spaceAvailable} have been added.`,
            });
        }

        toast({
            title: `Compressing ${filesToProcess.length} Image(s)...`,
            description: 'Please wait while we optimize your photos.',
        });
        
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        }

        const newImagePromises = filesToProcess.map(async (file) => {
            try {
                const compressedFile = await imageCompression(file, options);
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                    reader.readAsDataURL(compressedFile);
                });
            } catch (error) {
                console.error(error);
                toast({
                    variant: 'destructive',
                    title: 'Compression Failed',
                    description: `Could not compress ${file.name}. Please try a different one.`,
                });
                return null;
            }
        });
        
        const newImageUrls = (await Promise.all(newImagePromises)).filter((url): url is string => url !== null);
        
        if (newImageUrls.length > 0) {
            setEditedProfile(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...newImageUrls]
            }));
            
            toast({
                title: "Gallery Preview Updated",
                description: `${newImageUrls.length} photo(s) were added to your gallery preview. Remember to save.`,
            });
        }
    };

    const handleRemoveGalleryImage = (indexToRemove: number) => {
        setEditedProfile(prev => ({
            ...prev,
            gallery: prev.gallery?.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const { value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            attributes: { ...(prev.attributes || {}), [key]: value }
        }));
    };

    const handleSave = () => {
        onSave(editedProfile);
    };

    return (
        <>
            <input type="file" ref={profileImageInputRef} onChange={handleProfileImageChange} accept="image/*" className="hidden" />
            <input type="file" ref={galleryImageInputRef} onChange={handleGalleryImageChange} accept="image/*" className="hidden" multiple />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-24">
                    <Card className="overflow-hidden shadow-lg">
                        <div className="relative">
                            <Image
                                key={editedProfile.imageUrl}
                                src={editedProfile.imageUrl ?? 'https://placehold.co/600x600'}
                                alt={`Profile of ${editedProfile.name}`}
                                width={600}
                                height={600}
                                className="w-full object-cover aspect-square"
                                data-ai-hint={editedProfile.hint}
                            />
                            <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 rounded-full" onClick={() => profileImageInputRef.current?.click()}>
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={editedProfile.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" name="age" type="number" value={editedProfile.age} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={editedProfile.location} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                              <Label>Role</Label>
                              <Select 
                                onValueChange={(value: 'baby' | 'daddy') => setEditedProfile(prev => ({...prev, role: value}))} 
                                defaultValue={editedProfile.role}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="baby">Sugar Baby</SelectItem>
                                  <SelectItem value="daddy">Sugar Daddy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex space-x-2 pt-4">
                                <Button size="lg" className="flex-1" onClick={handleSave}>Save Profile</Button>
                                <Button size="lg" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-2/3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About {profile.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea 
                                name="bio"
                                value={editedProfile.bio} 
                                onChange={handleChange}
                                className="min-h-[120px]" 
                                placeholder="Tell us about yourself..."
                            />
                        </CardContent>
                    </Card>
                    
                     <Card>
                        <CardHeader>
                            <CardTitle>Wants & Interests</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="wants">Wants</Label>
                                <MultiSelect
                                    options={wantsSelectOptions}
                                    selected={editedProfile.wants || []}
                                    onChange={(selected) => setEditedProfile(prev => ({...prev, wants: selected}))}
                                    placeholder="Select what you want..."
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="interests">Interests</Label>
                                <MultiSelect
                                    options={interestsSelectOptions}
                                    selected={editedProfile.interests || []}
                                    onChange={(selected) => setEditedProfile(prev => ({...prev, interests: selected}))}
                                    placeholder="Select your interests..."
                                    className="mt-2"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Gallery</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {(editedProfile.gallery || []).map((img, i) => (
                                <div key={img || i} className="relative aspect-square group">
                                    <img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-full rounded-md object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="sm" variant="destructive" onClick={() => handleRemoveGalleryImage(i)}>Remove</Button>
                                    </div>
                                </div>
                            ))}
                            {(editedProfile.gallery || []).length < 5 && (
                              <div className="relative aspect-square border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent hover:border-primary transition">
                                  <Button variant="ghost" className="w-full h-full" onClick={() => galleryImageInputRef.current?.click()}><Camera className="mr-2 h-4 w-4" />Add Photo</Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Attributes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                                {attributeKeys.map((key) => (
                                    <div key={key} className="space-y-1">
                                        <Label htmlFor={`attr-${key}`}>{key}</Label>
                                        <Input id={`attr-${key}`} value={editedProfile.attributes?.[key] || ''} onChange={(e) => handleAttributeChange(e, key)} />
                                    </div>
                                ))}
                            </dl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};


export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<Profile | undefined>();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const profileId = parseInt(params.id, 10);
  const isOwnProfile = profileId === loggedInUserId;
  const isAdmin = loggedInUserId === 1;
  const canEdit = isOwnProfile || isAdmin;

  const allImages = [profileData?.imageUrl, ...(profileData?.gallery || [])].filter((url): url is string => !!url);

  useEffect(() => {
    const loggedInStatus = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    if (!loggedInStatus) {
      router.replace('/login');
    } else {
      // For demo, hardcoding logged in user ID
      const currentUserId = 1;
      setLoggedInUserId(currentUserId); 
      const currentUser = getProfile(currentUserId);
      setLoggedInUser(currentUser);
      const targetProfile = getProfile(profileId);

      // Check if user is allowed to view this profile
      const isViewingOwnProfile = targetProfile?.id === currentUser?.id;
      const userIsAdmin = currentUser?.id === 1;
      
      if (
        !isViewingOwnProfile &&
        !userIsAdmin &&
        currentUser &&
        targetProfile &&
        currentUser.role === targetProfile.role
      ) {
        // Block view by setting profile data to undefined
        setProfileData(undefined);
      } else {
        setProfileData(targetProfile);
      }
      
      setIsLoading(false);
    }
  }, [router, profileId]);

  const openGallery = (index: number) => {
    // If index is -1, it's the profile pic (index 0 in allImages).
    // Otherwise, it's a gallery pic, so its index in allImages is index + 1.
    setSelectedImageIndex(index < 0 ? 0 : index + 1);
    setIsGalleryOpen(true);
  };
  
  const closeGallery = () => {
      setIsGalleryOpen(false);
  };

  const handleMessage = (profileId: number) => {
    router.push(`/messages?chatWith=${profileId}`);
  };

  const handleFavorite = (profileName: string) => {
    toast({
      title: 'Added to Favorites',
      description: `${profileName} has been added to your favorites.`,
    });
  };

  const handleReport = (profileName: string) => {
    toast({
      title: 'Profile Reported',
      description: `Thank you for your feedback. We will review ${profileName}'s profile.`,
    });
  };
  
  const handleBlock = (profileId: number, profileName: string) => {
    deleteProfile(profileId);
    toast({
      variant: 'destructive',
      title: 'User Blocked',
      description: `You have blocked ${profileName}. You will no longer see their profile or receive messages from them.`,
    });
    router.push('/search');
  };
  
  if (isLoading) {
    return (
     <>
       <Header />
       <main className="flex-grow container mx-auto p-4 md:p-6 flex justify-center items-center">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </main>
     </>
   );
 }

  if (!profileData) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This profile is not available or you do not have permission to view it.</p>
              <Button onClick={() => router.push('/search')} className="mt-4">Back to Search</Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }
  
  const handleSaveProfile = (updatedProfile: Profile) => {
    const success = updateProfile(updatedProfile);
    if (success) {
      // After saving, we get the fresh data from storage.
      setProfileData(getProfile(profileId));
      setIsEditMode(false);
      window.dispatchEvent(new Event('profileUpdated'));
      toast({
        title: "Profile Saved",
        description: "Your changes have been saved successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your profile. This might be due to storage limits if images are too large.",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {isEditMode && canEdit && profileData ? (
          <ProfileEdit 
            profile={profileData} 
            onSave={handleSaveProfile} 
            onCancel={() => setIsEditMode(false)} 
          />
        ) : profileData ? (
          <ProfileView 
            profile={profileData} 
            onEdit={() => setIsEditMode(true)}
            isOwnProfile={isOwnProfile}
            canEdit={canEdit}
            onMessage={handleMessage}
            onFavorite={handleFavorite}
            onReport={handleReport}
            onBlock={handleBlock}
            loggedInUser={loggedInUser}
            isAdmin={isAdmin}
            onOpenGallery={openGallery}
          />
        ) : null}
      </main>
      {profileData && allImages.length > 0 && (
        <GalleryModal
            images={allImages}
            startIndex={selectedImageIndex}
            isOpen={isGalleryOpen}
            onClose={closeGallery}
        />
      )}
    </>
  );
}
