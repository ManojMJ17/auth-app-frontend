import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Services from './pages/Services.tsx';
import About from './pages/About.tsx';
import RootLayout from './pages/RootLayout.tsx';
import SignUp from './pages/Signup.tsx';
import { ThemeProvider } from './components/theme/theme-provider.tsx';
import UserLayout from './pages/user/UserLayout.tsx';
import UserHome from './pages/user/UserHome.tsx';
import UserProfile from './pages/user/UserProfile.tsx';
import OAuthSuccess from './pages/OAuthSuccess.tsx';
import OAuthFailure from './pages/OAuthFailure.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<UserLayout />}>
            <Route index element={<UserHome />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>
          <Route path='/oauth/success' element={<OAuthSuccess />} />
          <Route path='/oauth/failure' element={<OAuthFailure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
);
