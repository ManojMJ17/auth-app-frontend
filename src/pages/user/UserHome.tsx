import {
  Activity,
  BadgeCheck,
  Calendar,
  Lock,
  Mail,
  Shield,
  User,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useAuth from '@/auth/store';
import { getUserByEmail } from '@/services/AuthService';
import { useState } from 'react';
import type { User as USERT } from '@/models/User';
import toast from 'react-hot-toast';
import axios from 'axios';

const UserHome = () => {
  const [user1, setUser1] = useState<USERT | null>(null);
  const user = useAuth((state) => state.user);

  if (!user) return null;

  const getUser = async () => {
    try {
      const user1 = await getUserByEmail(user.email);
      setUser1(user1);
      toast.success('you are able to access secured apis');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };

  return (
    <div className='space-y-8 p-7'>
      {/* Welcome */}
      <section>
        <h1 className='text-4xl font-bold'>Welcome Back, {user.name} 👋</h1>

        <p className='mt-2 text-muted-foreground'>
          Monitor your account and security activity.
        </p>
      </section>

      {/* Top Cards */}
      <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardContent className='p-6'>
            <p className='text-sm text-muted-foreground'>Account</p>

            <h3 className='mt-2 text-2xl font-bold'>Active</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <p className='text-sm text-muted-foreground'>Provider</p>

            <h3 className='mt-2 text-2xl font-bold'>{user.provider}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <p className='text-sm text-muted-foreground'>Role</p>

            <h3 className='mt-2 text-2xl font-bold'>{user?.role}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <p className='text-sm text-muted-foreground'>Status</p>

            <h3 className='mt-2 text-2xl font-bold'>
              {user.enable ? 'Enabled' : 'Disabled'}
            </h3>
          </CardContent>
        </Card>
      </section>

      {/* Overview */}
      <section className='grid gap-6 lg:grid-cols-2'>
        <Card>
          <CardContent className='p-6'>
            <h2 className='mb-6 text-xl font-semibold'>Account Overview</h2>

            <div className='space-y-5'>
              <div className='flex gap-3'>
                <User className='h-5 w-5 text-primary' />

                <div>
                  <p className='text-sm text-muted-foreground'>Full Name</p>

                  <p>{user.name}</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <Mail className='h-5 w-5 text-primary' />

                <div>
                  <p className='text-sm text-muted-foreground'>Email</p>

                  <p>{user.email}</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <BadgeCheck className='h-5 w-5 text-primary' />

                <div>
                  <p className='text-sm text-muted-foreground'>Provider</p>

                  <p>{user.provider}</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <Calendar className='h-5 w-5 text-primary' />

                <div>
                  <p className='text-sm text-muted-foreground'>Member Since</p>

                  <p>{user.createdAt}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h2 className='mb-6 text-xl font-semibold'>Security Overview</h2>

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <Shield className='h-4 w-4 text-primary' />
                <span>Account Enabled</span>
              </div>

              <div className='flex items-center gap-3'>
                <Shield className='h-4 w-4 text-primary' />
                <span>Authentication Active</span>
              </div>

              <div className='flex items-center gap-3'>
                <Shield className='h-4 w-4 text-primary' />
                <span>OAuth Provider Connected</span>
              </div>

              <div className='flex items-center gap-3'>
                <Lock className='h-4 w-4 text-primary' />
                <span>Protected Session</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Activity */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='mb-6 text-xl font-semibold'>Recent Activity</h2>

          <div className='space-y-4'>
            <div className='flex gap-3'>
              <Activity className='h-4 w-4 text-primary' />
              <span>Successful Login</span>
            </div>

            <div className='flex gap-3'>
              <Activity className='h-4 w-4 text-primary' />
              <span>Account Authenticated</span>
            </div>

            <div className='flex gap-3'>
              <Activity className='h-4 w-4 text-primary' />
              <span>Session Created</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='mb-6 text-xl font-semibold'>Quick Access</h2>

          <div className='flex flex-wrap gap-3'>
            <Button variant='outline'>Profile</Button>

            <Button variant='outline'>Security</Button>

            <Button variant='outline'>Settings</Button>

            <Button variant='outline' onClick={() => getUser()}>
              Get current User
            </Button>
            <p>{user1?.name}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserHome;
