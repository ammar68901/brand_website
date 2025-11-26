'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
<<<<<<< HEAD
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", {
=======
      setIsloading(true);
      const res = await axios.post("/api/auth/register", {
>>>>>>> d74d5f0e53a521b361805a3d74af738e5440f646
        email,
        password,
        phoneNumber,
        username: userName,
      });

      if (res.status === 201) {
        toast.success("Registration successful!");
        router.push("/");
        window.location.reload();
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Register</h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg font-semibold transition 
              ${isLoading ? 'bg-gray-300 cursor-not-allowed text-gray-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
          >
            {isLoading ? <>Registering <Loader className="animate-spin" size={20} /></> : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Do you have an account?{' '}
          <Link href="/login" className="text-gray-900 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
=======
    <div className="max-w-md mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
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
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
        {isLoading ? (
          <>
            <button className="w-full bg-black  p-2 rounded flex items-center justify-center gap-3 text-zinc-400">
              Register{" "}
              <LoaderIcon width={30} height={30} className="animate-spin text-zinc-400" />
            </button>
          </>
        ) : (   
          <>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded"
            >
              Register
            </button>
          </>
        )}
      </form>
      <p className="mt-4">
        Do you have an account? <Link href={"/login"}>Login</Link>
      </p>
>>>>>>> d74d5f0e53a521b361805a3d74af738e5440f646
    </div>
  );
}
