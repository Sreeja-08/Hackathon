"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Trophy,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(
          storedUser
        )
      );
    }

  }, []);

  function logout() {

    localStorage.clear();

    window.location.href =
      "/login";
  }

  if (!user) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-white/40 dark:border-gray-800 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SECTION */}

        <div className="flex items-center gap-10">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg">

              <Trophy size={20} />

            </div>

            <div>

              <h1 className="font-bold text-xl text-gray-900 dark:text-white">
                Peer Recognition
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Appreciation Platform
              </p>

            </div>

          </div>

          {/* NAV LINKS */}

          <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-300">

            <a
              href="/feed"
              className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >

              <Trophy size={18} />

              <span>
                Feed
              </span>

            </a>

            <a
              href={`/profile/${user.id}`}
              className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >

              <User size={18} />

              <span>
                Profile
              </span>

            </a>

            <a
              href="/stats"
              className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >

              <BarChart3 size={18} />

              <span>
                Stats
              </span>

            </a>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="flex items-center gap-4">

          {/* THEME TOGGLE */}

          <ThemeToggle />

          {/* USER INFO */}

          <div className="hidden sm:block text-right">

            <p className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Team Member
            </p>

          </div>

          {/* USER AVATAR */}

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg">

            {user.name?.[0] || "U"}

          </div>

          {/* LOGOUT BUTTON */}

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-2xl shadow-lg"
          >

            <LogOut size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}