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
  Trophy,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function StatsPage() {

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {

    async function fetchStats() {

      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        "/api/stats",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      setStats(data);
    }

    fetchStats();

  }, []);

  if (!stats) {
    return (
      <div className="p-10 text-center text-xl">
        Loading dashboard...
      </div>
    );
  }

  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f97316",
  ];

  return (
    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >

          <div>

            <h1 className="text-5xl font-bold text-gray-900">
              Recognition Analytics
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Insights into team appreciation and engagement
            </p>

          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl px-6 py-4">

            <div className="flex items-center gap-3">

              <div className="bg-indigo-100 p-3 rounded-2xl">

                <TrendingUp className="text-indigo-600" />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Activity Window
                </p>

                <p className="font-bold">
                  Last 30 Days
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* TOP CARDS */}

        <div className="grid md:grid-cols-3 gap-6">

          {/* GIVERS */}

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

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-gray-500">
                  Top Giver
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {
                    stats.topGivers?.[0]
                      ?.name || "-"
                  }
                </h2>

              </div>

              <div className="bg-indigo-100 p-4 rounded-2xl">

                <Trophy className="text-indigo-600" />

              </div>

            </div>

            <p className="text-4xl font-bold text-indigo-600">

              {
                stats.topGivers?.[0]
                  ?.count || 0
              }

            </p>

            <p className="text-gray-500 mt-2">
              recognitions given
            </p>

          </motion.div>

          {/* RECIPIENT */}

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

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-gray-500">
                  Most Recognized
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {
                    stats
                      .topRecipients?.[0]
                      ?.name || "-"
                  }
                </h2>

              </div>

              <div className="bg-pink-100 p-4 rounded-2xl">

                <Users className="text-pink-600" />

              </div>

            </div>

            <p className="text-4xl font-bold text-pink-600">

              {
                stats
                  .topRecipients?.[0]
                  ?.count || 0
              }

            </p>

            <p className="text-gray-500 mt-2">
              recognitions received
            </p>

          </motion.div>

          {/* VALUE */}

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

            <div className="flex items-center justify-between mb-6">

              <div>

                <p className="text-gray-500">
                  Most Used Value
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {
                    stats
                      .mostUsedValues?.[0]
                      ?.value || "-"
                  }
                </h2>

              </div>

              <div className="bg-yellow-100 p-4 rounded-2xl">

                <Sparkles className="text-yellow-600" />

              </div>

            </div>

            <p className="text-4xl font-bold text-yellow-600">

              {
                stats
                  .mostUsedValues?.[0]
                  ?.count || 0
              }

            </p>

            <p className="text-gray-500 mt-2">
              total usage
            </p>

          </motion.div>

        </div>

        {/* CHARTS */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* BAR CHART */}

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

            <h2 className="text-2xl font-bold mb-6">
              Top Givers
            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={
                    stats.topGivers
                  }
                >

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    radius={[
                      12,
                      12,
                      0,
                      0,
                    ]}
                    fill="#6366f1"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* PIE CHART */}

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

            <h2 className="text-2xl font-bold mb-6">
              Company Values Distribution
            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={
                      stats.mostUsedValues
                    }

                    dataKey="count"

                    nameKey="value"

                    outerRadius={120}

                    label
                  >

                    {stats.mostUsedValues.map(
                      (
                        _: any,
                        index: number
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}