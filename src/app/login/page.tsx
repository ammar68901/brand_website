'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);  
  const {setEmailUser} = useUser()
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setIsLoading(true);

    try {
      // dynamic import so you don't need to add top-level imports
      const [{ default: axios }, { toast }] = await Promise.all([
        import('axios'),
        import('react-hot-toast'),
      ]);

      // use relative API path in Next.js
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });

      // success feedback + navigate
      toast.success('Logged in successfully');
      router.back();
      
    } catch (err: any) {
      const { toast } = await import('react-hot-toast');
      let message = 'Login failed';
      if (err?.response?.data) {
        message = err.response?.data?.error || JSON.stringify(err.response.data);
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(()=> {
    const fetchUserDetail = async ()=> {
      try {
        const res = await axios.get('http://localhost:3000/api/me')
        setEmailUser(res.data.email)
      } catch (error:any) {
        toast.error("error",error.message)
      }
    }

    fetchUserDetail()
  },[handleSubmit])


  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        {isLoading ? (<>
         <button disabled  className="flex items-center justify-center gap-6 text-zinc-300 w-full bg-black  p-2 rounded">
          Login <Loader width={20} height={20} className='text-zinc-300 animate-spin'/>
        </button>
        </>):(<>
         <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Login
        </button>
        </>)}
       
      </form>
      <p className="mt-4">
        Don't have an account?  <Link href={'/register'}>Register</Link>
      </p>
    </div>
  );
}