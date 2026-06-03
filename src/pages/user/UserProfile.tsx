import { useState } from 'react';
import { Calendar, Shield, User as UserIcon, Camera } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import useAuth from '@/auth/store';

const UserProfile = () => {
  const user = useAuth((state) => state.user);

  const [name, setName] = useState(user?.name ?? '');

  if (!user) return null;

  return (
    <div className='space-y-8 p-7'>
      {/* Header */}
      <div>
        <h1 className='text-4xl font-bold'>Profile Settings</h1>

        <p className='mt-2 text-muted-foreground'>
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Photo */}
      <Card>
        <CardContent className='flex flex-col items-center gap-6 p-8'>
          <Avatar className='h-32 w-32'>
            <AvatarImage src={user.image} />

            <AvatarFallback className='text-3xl'>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <Button variant='outline'>
            <Camera className='mr-2 h-4 w-4' />
            Change Photo
          </Button>
        </CardContent>
      </Card>

      {/* Editable Form */}
      <Card>
        <CardContent className='space-y-6 p-8'>
          <h2 className='text-xl font-semibold'>Personal Information</h2>

          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>

            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>

            <Input id='email' value={user.email} disabled />
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardContent className='p-8'>
          <h2 className='mb-6 text-xl font-semibold'>Account Information</h2>

          <div className='grid gap-6 md:grid-cols-2'>
            <div className='flex gap-3'>
              <UserIcon className='h-5 w-5 text-primary' />

              <div>
                <p className='text-sm text-muted-foreground'>User ID</p>

                <p>{user.id}</p>
              </div>
            </div>

            <div className='flex gap-3'>
              <Shield className='h-5 w-5 text-primary' />

              <div>
                <p className='text-sm text-muted-foreground'>Role</p>

                <Badge>{user.role ?? 'USER'}</Badge>
              </div>
            </div>

            <div className='flex gap-3'>
              <Shield className='h-5 w-5 text-primary' />

              <div>
                <p className='text-sm text-muted-foreground'>Provider</p>

                <Badge variant='secondary'>{user.provider}</Badge>
              </div>
            </div>

            <div className='flex gap-3'>
              <Shield className='h-5 w-5 text-primary' />

              <div>
                <p className='text-sm text-muted-foreground'>Account Status</p>

                <Badge variant={user.enable ? 'default' : 'destructive'}>
                  {user.enable ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>

            <div className='flex gap-3'>
              <Calendar className='h-5 w-5 text-primary' />

              <div>
                <p className='text-sm text-muted-foreground'>Created At</p>

                <p>{user.createdAt ?? 'Not Available'}</p>
              </div>
            </div>

            <div className='flex gap-3'>
              <Calendar className='h-5 w-5 text-primary' />

              <div>
                <p className='text-sm text-muted-foreground'>Updated At</p>

                <p>{user.updatedAt ?? 'Not Available'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
