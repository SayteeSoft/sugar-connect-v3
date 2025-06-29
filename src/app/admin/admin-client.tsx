
'use client';

import React, { useState, useEffect } from 'react';
import type { Profile } from '@/lib/data';
import { getProfiles } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from '@/components/ui/card';

export function AdminClient({ initialProfiles }: { initialProfiles: Profile[] }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setProfiles(getProfiles());
  }, []);

  const handleView = (id: number) => {
    router.push(`/profile/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/profile/${id}`); // The profile page has an edit mode
  };

  const handleDelete = (id: number) => {
    const profileToDelete = profiles.find(p => p.id === id);
    setProfiles(profiles.filter(p => p.id !== id));
    toast({
        title: "Profile Deleted",
        description: `${profileToDelete?.name || 'User'} has been removed.`,
        variant: "destructive"
    });
    // In a real app, you would also make an API call to delete the profile from the database.
  };

  // A fake email generator for display purposes
  const getEmailFromName = (name: string) => {
      if (name === 'saytee.software') return 'saytee.software@gmail.com';
      return `${name.toLowerCase().replace(/ /g, '.')}@example.com`;
  }

  return (
    <Card>
      <CardContent className="p-0">
          <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Age</TableHead>
                    <TableHead className="hidden lg:table-cell">Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map(profile => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={profile.imageUrl ?? 'https://placehold.co/100x100'} alt={profile.name} data-ai-hint={profile.hint}/>
                          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {profile.name}
                           {profile.id === 1 ? (
                            <Badge>Admin</Badge>
                          ) : profile.role === 'daddy' ? (
                            <Badge variant="secondary">Daddy</Badge>
                          ) : (
                            <Badge variant="outline">Baby</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getEmailFromName(profile.name)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{profile.age}</TableCell>
                      <TableCell className="hidden lg:table-cell">{profile.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleView(profile.id)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(profile.id)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <AlertDialog>
                              <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={profile.id === 1}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                  <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the user account
                                          and remove their data from our servers.
                                      </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(profile.id)} className="bg-destructive hover:bg-destructive/90">
                                          Delete
                                      </AlertDialogAction>
                                  </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
        </CardContent>
    </Card>
  );
}
