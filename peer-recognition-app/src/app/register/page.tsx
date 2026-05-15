"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  motion,
} from "framer-motion";

import {
  Trophy,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {

  const router =
    useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const res = await fetch(
        "/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        setError(
          data.error
        );

        return;
      }

      router.push("/login");

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT */}

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white p-16 relative overflow-hidden">

        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="relative z-10 max-w-lg"
        >

          <div className="bg-white/20 backdrop-blur-lg h-20 w-20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">

            <Trophy size={40} />

          </div>

          <h1 className="text-6xl font-bold leading-tight">

            Join The
            <br />
            Recognition Culture

          </h1>

          <p className="mt-8 text-xl text-white/90 leading-relaxed">

            Encourage collaboration, celebrate achievements, and appreciate teammates in a modern recognition platform.

          </p>

        </motion.div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center p-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8"
        >

          <div className="text-center mb-8">

            <div className="mx-auto h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg mb-4">

              <Trophy size={28} />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Start recognizing teammates
            </p>

          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleRegister
            }
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Name
              </label>

              <div className="mt-2 relative">

                <User
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Enter your name"

                  className="w-full border border-gray-200 bg-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-400"

                  value={name}

                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <div className="mt-2 relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"

                  className="w-full border border-gray-200 bg-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-400"

                  value={email}

                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-2 relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Create password"

                  className="w-full border border-gray-200 bg-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-400"

                  value={password}

                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"

              disabled={loading}

              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2"
            >

              {loading
                ? "Creating..."
                : (
                  <>
                    Register
                    <ArrowRight size={18} />
                  </>
                )}

            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">

            Already have an account?{" "}

            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </a>

          </p>

        </motion.div>

      </div>

    </div>
  );
}