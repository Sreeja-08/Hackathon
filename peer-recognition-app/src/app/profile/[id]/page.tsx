"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";

import {
  motion,
} from "framer-motion";

import {
  Award,
  Heart,
  Sparkles,
  Trophy,
  Mail,
  Send,
} from "lucide-react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function fetchProfile() {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          window.location.href =
            "/login";

          return;
        }

        const { id } =
          await params;

        const res = await fetch(
          `/api/users/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        if (!res.ok) {

          setError(
            data.error ||
              "Failed to load profile"
          );

          return;
        }

        setProfile(data);

      } catch (err) {

        setError(
          "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    }

    fetchProfile();

  }, [params]);

  if (loading) {

    return (
      <div className="p-10 text-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (error) {

    return (
      <div className="p-10 text-red-500 text-center">
        {error}
      </div>
    );
  }

  if (!profile || !profile.user) {

    return (
      <div className="p-10 text-center">
        Profile not found
      </div>
    );
  }

  return (
    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* PROFILE HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-[32px] overflow-hidden"
        >

          {/* TOP BANNER */}

          <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

          {/* CONTENT */}

          <div className="p-8 relative">

            {/* AVATAR */}

            <div className="absolute -top-16 left-8 h-32 w-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-5xl font-bold text-indigo-600 border-4 border-white">

              {
                profile.user.name[0]
              }

            </div>

            <div className="pt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* USER INFO */}

              <div>

                <h1 className="text-5xl font-bold text-gray-900">

                  {
                    profile.user.name
                  }

                </h1>

                <div className="flex items-center gap-2 mt-3 text-gray-500">

                  <Mail size={18} />

                  <span>
                    {
                      profile.user.email
                    }
                  </span>

                </div>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-indigo-50 rounded-3xl px-8 py-6 text-center">

                  <p className="text-4xl font-bold text-indigo-600">

                    {
                      profile.givenCount
                    }

                  </p>

                  <p className="text-gray-500 mt-2">
                    Given
                  </p>

                </div>

                <div className="bg-pink-50 rounded-3xl px-8 py-6 text-center">

                  <p className="text-4xl font-bold text-pink-600">

                    {
                      profile.receivedCount
                    }

                  </p>

                  <p className="text-gray-500 mt-2">
                    Received
                  </p>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* ACHIEVEMENT CARDS */}

        <div className="grid md:grid-cols-3 gap-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Recognition Score
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {
                    profile.givenCount +
                    profile.receivedCount
                  }

                </h2>

              </div>

              <div className="bg-yellow-100 p-4 rounded-2xl">

                <Trophy className="text-yellow-600" />

              </div>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.1,
            }}

            className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Team Impact
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  High
                </h2>

              </div>

              <div className="bg-pink-100 p-4 rounded-2xl">

                <Heart className="text-pink-600" />

              </div>

            </div>

          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Culture Champion
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  Yes
                </h2>

              </div>

              <div className="bg-indigo-100 p-4 rounded-2xl">

                <Sparkles className="text-indigo-600" />

              </div>

            </div>

          </motion.div>

        </div>

        {/* TIMELINES */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* GIVEN */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6"
          >

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-indigo-100 p-3 rounded-2xl">

                <Send className="text-indigo-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Recognitions Given
                </h2>

                <p className="text-gray-500">
                  Appreciation shared with teammates
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {profile.givenRecognitions?.map(
                (
                  recognition: any
                ) => (

                  <div
                    key={
                      recognition.id
                    }

                    className="border border-gray-100 bg-gray-50 rounded-2xl p-5"
                  >

                    <div className="flex justify-between items-start">

                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">

                        {
                          recognition.value
                        }

                      </span>

                      <Award
                        size={18}
                        className="text-indigo-500"
                      />

                    </div>

                    <p className="mt-4 text-gray-700 leading-relaxed">

                      {
                        recognition.message
                      }

                    </p>

                  </div>
                )
              )}

            </div>

          </motion.div>

          {/* RECEIVED */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.1,
            }}

            className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6"
          >

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-pink-100 p-3 rounded-2xl">

                <Heart className="text-pink-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Recognitions Received
                </h2>

                <p className="text-gray-500">
                  Appreciation from teammates
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {profile.receivedRecognitions?.map(
                (
                  recognition: any
                ) => (

                  <div
                    key={
                      recognition.id
                    }

                    className="border border-gray-100 bg-gray-50 rounded-2xl p-5"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <p className="font-semibold">

                          From{" "}

                          {
                            recognition
                              .giver
                              .name
                          }

                        </p>

                        <span className="inline-block mt-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">

                          {
                            recognition.value
                          }

                        </span>

                      </div>

                      <Heart
                        size={18}
                        className="text-pink-500"
                      />

                    </div>

                    <p className="mt-4 text-gray-700 leading-relaxed">

                      {
                        recognition.message
                      }

                    </p>

                  </div>
                )
              )}

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}