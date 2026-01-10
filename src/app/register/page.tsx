"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsloading(true);
      const res = await axios.post("/api/auth/register", {
        email,
        password,
        phoneNumber,
        username: userName,
      });

      if (res.status === 201) {
        toast.success("Registration successful!");
        router.back()
        // window.location.reload();
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsloading(false);
    }
  };

  return (
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
    </div>
  );
}
