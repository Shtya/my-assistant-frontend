/**
 * map api for handle the endpoints with axios and this is the base url ( localhost:8081/api/v1/ )
 * 
 * 
 * and also when i make sign correct save his data in the cookies that exist in this app/api/auth/set-cookie (// ✅ الصيغة الصحيحة
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  const userData = JSON.stringify(body);

  const response = new NextResponse(JSON.stringify({ message: 'Cookie set successfully' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  response.cookies.set('user', userData, {
    // httpOnly: true, // إذا كنت تريد رؤيتها في المتصفح اجعلها false أو احذفها مؤقتًا
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // أسبوع
  });

  return response;
}
)


 and when make logout  app/api/auth/remove-cookie on this to remove the cookies (// app/api/auth/remove-cookie/route.js
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Cookie removed successfully' })

  response.cookies.set('user', '', {
    maxAge: 0,
    path: '/',
  })

  return response
}
)

- becasue i depend on them to login on this system  and handle this middleware cannot open any page until he not auth if not auth return it to /auth page
  handle on this i take it form old project check only if auth or no 



* 
 * auth/signup ({
    "fullName": "John Doe",
    "email": "ahmedabdelrhman083@gmail.com",
    "password": "12345",
    "phone": "+20123435890"
  } res : ({
      "message": "Account created successfully",
      "email": "ahmedabdelrhman083@gmail.com",
      "userId": "b2745412-9f77-4dfe-85d5-bd9a74d534dd"
  }) ) ) after make sign up success redirect to sign in to login again and save his data 


 * auth/signin req ( {
  "email": "ahmedabdelrhman083@gmail.com",
  "password": "1234"
}
) res ( {
    "id": "b2745412-9f77-4dfe-85d5-bd9a74d534dd",
    "email": "ahmedabdelrhman083@gmail.com",
    "avatar": null,
    "phone": "+20123435890",
    "address": null,
    "businessDetails": null,
    "fullName": "John Doe",
    "role": "member",
    "status": "active",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMjc0NTQxMi05Zjc3LTRkZmUtODVkNS1iZDlhNzRkNTM0ZGQiLCJlbWFpbCI6ImFobWVkYWJkZWxyaG1hbjA4M0BnbWFpbC5jb20iLCJyb2xlIjoibWVtYmVyIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzUyMjM3NjQzLCJleHAiOjE3NTI4NDI0NDN9.pNXV2gB8ykiN3EZaYLnwFcxPynV0_BtVDxI_cyxIZMA",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMjc0NTQxMi05Zjc3LTRkZmUtODVkNS1iZDlhNzRkNTM0ZGQiLCJlbWFpbCI6ImFobWVkYWJkZWxyaG1hbjA4M0BnbWFpbC5jb20iLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzUyMjM3NjQzLCJleHAiOjE3NTI4NDI0NDN9.UL2jD9sdsj3gvCc7upzR8VGgWbJQ7ouMZBViEyj9qv4"
})



 * forget password : auth/forgot-password  -> req ({
    "email": "ahmedabdelrhman083@gmail.com"
}) -> res ({
    "message": "If this email exists, a reset link has been sent"
})


 * verify OTP : verify-reset-otp -> req ({
  "email": "ahmedabdelrhman083@gmail.com",
  "otp": "320749"
}
) res -> ({
    "message": "OTP verified successfully",
    "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMjc0NTQxMi05Zjc3LTRkZmUtODVkNS1iZDlhNzRkNTM0ZGQiLCJlbWFpbCI6ImFobWVkYWJkZWxyaG1hbjA4M0BnbWFpbC5jb20iLCJwdXJwb3NlIjoicGFzc3dvcmRfcmVzZXQiLCJpYXQiOjE3NTIyMzc3MDMsImV4cCI6MTc1MjIzODAwM30.qQiET17DGzc0CbuwvZ2zSwOXZELSK1etp6K056r8jjY"
})


 * Reset password : auth/reset-password -> req ({
  "email": "ahmedabdelrhman083@gmail.com",
  "otp": "320749",
  "newPassword": "1234",
  "confirmPassword": "1234"
}) -> res ({
    "message": "Password reset successfully"
})


 * Refresh token : auth/refresh-token -> req ({
    "refreshToken" : "{{refreshToken}}"
}) -> res ({
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMjc0NTQxMi05Zjc3LTRkZmUtODVkNS1iZDlhNzRkNTM0ZGQiLCJlbWFpbCI6ImFobWVkYWJkZWxyaG1hbjA4M0BnbWFpbC5jb20iLCJyb2xlIjoibWVtYmVyIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzUyMjQyNDM4LCJleHAiOjE3NTI4NDcyMzh9.Sz3UOGnCid46k3ZkPQmO4vXI8INkydTvqBjfFyXogKI"
})
 * 
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/helper/api';



// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.4, ease: 'easeIn' } },
};

export default function AuthForm() {
  const router = useRouter();
  const [view, setView] = useState('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { fullName, email, password, phone } = formData;
      const response = await api.post('auth/signup', {
        fullName,
        email,
        password,
        phone
      });
      
      toast.success(response.data.message);
      setView('login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { email, password } = formData;
      const response = await api.post('auth/signin', {
        email,
        password
      });
      
      // Save user data and tokens in cookies
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: response.data,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        }),
      });
      
      toast.success('Login successful');
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const { email } = formData;
      const response = await api.post('auth/forgot-password', { email });
      toast.success(response.data.message);
      setView('verify-otp');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const { email, otp } = formData;
      const response = await api.post('auth/verify-reset-otp', { email, otp });
      toast.success(response.data.message);
      setView('reset-password');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const { email, otp, newPassword, confirmPassword } = formData;
      const response = await api.post('auth/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword
      });
      
      toast.success(response.data.message);
      setView('login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className='min-h-screen w-screen relative flex items-center justify-center px-4 overflow-hidden'>
      <Toaster position="top-center" />
      
      {/* Background under the card */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-gray-900 opacity-90 -z-10' />
      <img src='/bg-2.jpeg' className='fixed w-full h-full inset-0 ' />
      <div className=' bg-black/40 backdrop-blur-sm fixed w-full h-full inset-0 ' />

      {/* Auth Card */}
      <div className='grid md:grid-cols-[1fr,400px] gap-2 overflow-hidden w-full max-w-5xl relative z-10'>
        <div className='rounded-[20px_0_0_20px] rtl:rounded-[0_20px_20px_0] border border-[#111] shadow-inner flex flex-col justify-center p-10 space-y-4 bg-black/90'>
          <h2 className='text-3xl font-bold text-white/90'>
            <span className='text-primary-dark'>Barakah </span> — Your All-in-One Life & Productivity Platform
          </h2>
          <p className='text-gray-300 text-base'>Barakah brings together focus tools, habit tracking, notes, learning, fitness, and task management in one smart, multilingual, and fully customizable platform — helping you live a more productive and balanced life.</p>
        </div>

        <div className='rounded-[0_20px_20px_0] rtl:rounded-[20px_0_0_20px] border border-white/30 shadow-inner relative bg-white/20 backdrop-blur-[10px] text-black p-8' style={{ perspective: 1000, transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode='wait'>
            {view === 'login' && (
              <motion.div key='login' variants={cardVariants} initial='hidden' animate='visible' exit='exit' className='space-y-5'>
                <h3 className='text-xl font-semibold text-gray-100'>Hello!</h3>
                <p className='text-sm text-gray-200'>We are really happy to see you again!</p>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className='bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center'
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div className='text-sm text-center text-gray-200 mt-2'>
                  Don't have an account?{' '}
                  <button onClick={() => setView('signup')} className='underline text-primary-dark hover:text-blue-800'>
                    Sign up
                  </button>
                </div>
                <div className='text-sm text-center text-gray-200'>
                  <button onClick={() => setView('forgot')} className='underline text-primary-dark hover:text-blue-800'>
                    Forgot password?
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'signup' && (
              <motion.div key='signup' variants={cardVariants} initial='hidden' animate='visible' exit='exit' className='md:py-12 space-y-5'>
                <h3 className='text-xl font-semibold text-gray-100'>Create Account</h3>
                <input
                  type='text'
                  name='fullName'
                  placeholder='Full Name'
                  value={formData.fullName}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <input
                  type='text'
                  name='phone'
                  placeholder='Phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <button
                  onClick={handleSignUp}
                  disabled={loading}
                  className='bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center'
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </button>
                <p className='text-sm text-center text-gray-200'>
                  Already have an account?{' '}
                  <button onClick={() => setView('login')} className='underline text-green-700 hover:text-green-900'>
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}

            {view === 'forgot' && (
              <motion.div key='forgot' variants={cardVariants} initial='hidden' animate='visible' exit='exit' className='md:py-12 space-y-5'>
                <h3 className='text-xl font-semibold text-gray-100'>Reset Password</h3>
                <p className='text-sm text-gray-200'>Enter your email and we'll send you a reset link</p>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className='bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center'
                >
                  {loading ? 'Sending link...' : 'Send Link'}
                </button>
                <div className='text-sm text-center text-gray-200'>
                  <button onClick={() => setView('login')} className='underline text-yellow-600 hover:text-yellow-800'>
                    Back to login
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'verify-otp' && (
              <motion.div key='verify-otp' variants={cardVariants} initial='hidden' animate='visible' exit='exit' className='md:py-12 space-y-5'>
                <h3 className='text-xl font-semibold text-gray-100'>Verify OTP</h3>
                <p className='text-sm text-gray-200'>Enter the OTP sent to your email</p>
                <input
                  type='text'
                  name='otp'
                  placeholder='OTP'
                  value={formData.otp}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className='bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center'
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <div className='text-sm text-center text-gray-200'>
                  <button onClick={() => setView('login')} className='underline text-blue-600 hover:text-blue-800'>
                    Back to login
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'reset-password' && (
              <motion.div key='reset-password' variants={cardVariants} initial='hidden' animate='visible' exit='exit' className='md:py-12 space-y-5'>
                <h3 className='text-xl font-semibold text-gray-100'>Reset Password</h3>
                <input
                  type='password'
                  name='newPassword'
                  placeholder='New Password'
                  value={formData.newPassword}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='bg-[#c7c8cc]/60 backdrop-blur-[9px] outline-none placeholder:text-gray-800 text-black border border-gray-300 px-4 py-2 rounded w-full'
                />
                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className='bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded disabled:opacity-70 flex items-center justify-center'
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                <div className='text-sm text-center text-gray-200'>
                  <button onClick={() => setView('login')} className='underline text-green-600 hover:text-green-800'>
                    Back to login
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}