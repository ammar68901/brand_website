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
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
        phoneNumber,
      });

      if (res.status === 201) {
        toast.success("Registration successful!");
        router.push("/login");
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
    </div>
  );
}
