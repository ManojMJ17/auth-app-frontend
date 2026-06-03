import useAuth from '@/auth/store';
import { Spinner } from '@/components/ui/spinner';
import { refreshToken } from '@/services/AuthService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const OAuthSuccess = () => {
  const [loading, setLoading] = useState(true);

  const changeLocalLoginData = useAuth((state) => state.changeLocalLogin);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAccessToken() {
      try {
        const loginResponseData = await refreshToken();

        changeLocalLoginData(
          loginResponseData.accessToken,
          loginResponseData.user,
          true,
        );

        toast.success('Login success');

        navigate('/dashboard');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }

        toast.error('Failed to login');
      } finally {
        setLoading(false);
      }
    }

    getAccessToken();
  }, []);

  return loading ? (
    <div className='flex items-center justify-center gap-2 p-10'>
      <Spinner />
      <h1>Please Wait...</h1>
    </div>
  ) : null;
};

export default OAuthSuccess;
