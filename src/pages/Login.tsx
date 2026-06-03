import { AlertCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import type LoginData from '@/models/LoginData';
import toast from 'react-hot-toast';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import useAuth from '@/auth/store';
import OAuthButtons from '@/components/OAuthButtons';

const Login = () => {
  const [data, setData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // state management by zustand
  const login = useAuth((state) => state.login);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    // console.log(data);

    if (data.email.trim() == '') {
      toast.error('Email is required');
      return;
    }

    if (data.password.trim() == '') {
      toast.error('Password is required');
      return;
    }

    setLoading(true);

    try {
      // const response = await loginUser(data);
      await login(data);
      toast.success('Login successfull');
      navigate('/dashboard');

      // store user information
      // local storage tokens
    } catch (error: any) {
      if (error.response) {
        setError(error);
        // toast.error(error.response.data.message);
      } else {
        setError(error);
        // toast.error(error.message);
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container flex min-h-screen items-center justify-center px-6'>
        <Card className='w-full max-w-md border-border bg-card/80 backdrop-blur-xl'>
          <CardHeader className='space-y-2 text-center'>
            <CardTitle className='text-3xl font-bold'>Welcome Back</CardTitle>

            <CardDescription>Sign in to your account</CardDescription>
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
            <div className='relative'>
              <Separator />

              <span
                className='
                  bg-background
                  text-muted-foreground
                  absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  px-2 text-xs
                '
              >
                OR CONTINUE WITH
              </span>
            </div>

            {/* Form */}
            <form className='space-y-4' onSubmit={handleFormSubmit}>
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
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>

                  <button
                    type='button'
                    className='
                      text-sm
                      text-primary
                      hover:underline
                    '
                  >
                    Forgot Password?
                  </button>
                </div>

                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  name='password'
                  value={data.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button disabled={loading} className='w-full cursor-pointer'>
                {loading ? (
                  <>
                    <Spinner />
                    <span>Please wait...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <p className='text-center text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <span className='cursor-pointer text-primary hover:underline'>
                <Link to={'/signup'}>Sign Up</Link>
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
