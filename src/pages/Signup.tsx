import { AlertCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type RegisterData from '@/models/RegisterData';
import { registerUser } from '@/services/AuthService';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertTitle } from '@/components/ui/alert';
import OAuthButtons from '@/components/OAuthButtons';

const SignUp = () => {
  const [data, setData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);

    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    // console.log(data);

    if (data.name.trim() === '') {
      toast.error('Name is required');
      return;
    }

    if (data.email.trim() === '') {
      toast.error('Email is required');
      return;
    }

    if (data.password.trim() === '') {
      toast.error('Password is required');
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser(data);
      console.log(result);
      toast.success('User register successfully');
      setData({
        name: '',
        email: '',
        password: '',
      });
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      toast.error('Error!');
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container flex min-h-screen items-center justify-center px-6'>
        <Card className='w-full max-w-md border-border bg-card/80 backdrop-blur-xl'>
          <CardHeader className='space-y-2 text-center'>
            <CardTitle className='text-3xl font-bold'>Create Account</CardTitle>

            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          {error && (
            <Alert variant='destructive' className='border-none bg-none'>
              <div className='flex items-center justify-center gap-2 text-center'>
                <AlertCircleIcon className='h-4 w-4' />
                <AlertTitle className=''>
                  {error.response ? error.response.data.message : error.message}
                </AlertTitle>
              </div>
            </Alert>
          )}

          <CardContent className='space-y-6'>
            {/* OAuth Buttons */}
            <OAuthButtons />

            {/* Divider */}
            <div className='relative'>
              <Separator />

              <span
                className='
                  absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  bg-background px-2
                  text-xs text-muted-foreground
                '
              >
                OR CONTINUE WITH
              </span>
            </div>

            {/* Signup Form */}
            <form className='space-y-4' onSubmit={handleFormSubmit}>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>

                <Input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  value={data.name}
                  name='name'
                  onChange={handleInputChange}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>

                <Input
                  id='email'
                  type='email'
                  placeholder='john@example.com'
                  name='email'
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>

                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  name='password'
                  value={data.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button className='w-full cursor-pointer'>
                {loading ? (
                  <>
                    <Spinner /> <span>Please wait...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <span className='cursor-pointer text-primary hover:underline'>
                <Link to={'/login'}>Sign In</Link>
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
