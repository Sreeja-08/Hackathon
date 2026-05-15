"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";

import {
  Heart,
  Flame,
  MessageCircle,
  Sparkles,
  Send,
  Trash2,
 Award,
} from "lucide-react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

const VALUES = [
  "Teamwork",
  "Innovation",
  "Ownership",
  "Customer Obsession",
];

const REACTIONS = [
  {
    type: "heart",
    icon: Heart,
    color: "text-pink-500",
  },

  {
    type: "clap",
    icon: Sparkles,
    color: "text-yellow-500",
  },

  {
    type: "fire",
    icon: Flame,
    color: "text-orange-500",
  },
];

export default function FeedPage() {

  const [recognitions, setRecognitions] =
    useState<any[]>([]);

  const [users, setUsers] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  const [value, setValue] =
    useState(VALUES[0]);

  const [
    selectedRecipients,
    setSelectedRecipients,
  ] = useState<string[]>([]);

  const [
    commentInputs,
    setCommentInputs,
  ] = useState<any>({});

  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        )
      : {};

  async function fetchFeed() {

    const res = await fetch(
      "/api/recognitions"
    );

    const data =
      await res.json();

    setRecognitions(
      data.recognitions || []
    );
  }

  async function fetchUsers() {

    const res = await fetch(
      "/api/users"
    );

    const data =
      await res.json();

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "{}"
      );

    setUsers(
      data.filter(
        (user: any) =>
          user.id !== currentUser.id
      )
    );
  }

  useEffect(() => {

    fetchFeed();

    fetchUsers();

  }, []);

  async function createRecognition() {

    const token =
      localStorage.getItem(
        "token"
      );

    if (
      !message.trim() ||
      selectedRecipients.length === 0
    ) {

      toast.error(
        "Please complete all fields"
      );

      return;
    }

    const res = await fetch(
      "/api/recognitions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          recipients:
            selectedRecipients,

          value,
          message,
        }),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {

      toast.error(
        data.error ||
          "Failed to post recognition"
      );

      return;
    }

    toast.success(
      "Recognition posted successfully"
    );

    setMessage("");

    setSelectedRecipients([]);

    fetchFeed();
  }

  async function react(
    recognitionId: string,
    type: string
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    const res = await fetch(
      "/api/reactions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          recognitionId,
          type,
        }),
      }
    );

    if (res.ok) {

      toast.success(
        "Reaction updated"
      );

      fetchFeed();
    }
  }

  async function addComment(
    recognitionId: string
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    const body =
      commentInputs[
        recognitionId
      ];

    if (!body?.trim()) {

      toast.error(
        "Comment cannot be empty"
      );

      return;
    }

    const res = await fetch(
      "/api/comments",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          recognitionId,
          body,
        }),
      }
    );

    if (res.ok) {

      toast.success(
        "Comment added"
      );

      setCommentInputs({
        ...commentInputs,

        [recognitionId]: "",
      });

      fetchFeed();
    }
  }

  async function deleteComment(
    commentId: string
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    const res = await fetch(
      `/api/comments/${commentId}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {

      toast.success(
        "Comment deleted"
      );

      fetchFeed();
    }
  }

  async function deleteRecognition(
    recognitionId: string
  ) {

    const token =
      localStorage.getItem(
        "token"
      );

    const res = await fetch(
      `/api/recognitions/${recognitionId}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {

      toast.success(
        "Recognition deleted"
      );

      fetchFeed();
    }
  }

  function getReactionCount(
    reactions: any[],
    type: string
  ) {

    return reactions.filter(
      (r) => r.type === type
    ).length;
  }

  return (
    <div>

      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-8">

        {/* HERO */}

        <div className="text-center py-6">

          <h1 className="text-5xl font-bold text-gray-900">

            Celebrate Great Work

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            Recognize teammates and build a culture of appreciation

          </p>

        </div>

        {/* CREATE FORM */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6 space-y-5"
        >

          <div className="flex items-center gap-3">

            <div className="bg-indigo-100 p-3 rounded-2xl">

              <Award className="text-indigo-600" />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Give Recognition
              </h2>

              <p className="text-gray-500">
                Appreciate your teammates publicly
              </p>

            </div>

          </div>

          <textarea
            placeholder="Write appreciation message..."
            className="w-full border border-gray-200 bg-white rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-indigo-400"

            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
          />

          <div className="grid md:grid-cols-2 gap-4">

            <select
              className="border border-gray-200 bg-white rounded-2xl p-4"

              value={value}

              onChange={(e) =>
                setValue(
                  e.target.value
                )
              }
            >

              {VALUES.map((v) => (
                <option
                  key={v}
                  value={v}
                >
                  {v}
                </option>
              ))}

            </select>

            <select
              className="border border-gray-200 bg-white rounded-2xl p-4"

              value={
                selectedRecipients[0] || ""
              }

              onChange={(e) =>
                setSelectedRecipients([
                  e.target.value,
                ])
              }
            >

              <option value="">
                Select Recipient
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}

            </select>

          </div>

          <button
            onClick={
              createRecognition
            }

            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg"
          >

            <Send size={18} />

            Post Recognition

          </button>

        </motion.div>

        {/* EMPTY STATE */}

        {recognitions.length === 0 && (

          <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-16 text-center">

            <div className="mx-auto h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6">

              <Award
                size={40}
                className="text-indigo-600"
              />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">

              No Recognitions Yet

            </h2>

            <p className="text-gray-500 mt-4 text-lg">

              Start appreciating teammates and build a positive culture.

            </p>

          </div>
        )}

        {/* FEED */}

        <div className="space-y-6">

          {recognitions.map(
            (recognition, index) => (

              <motion.div
                key={
                  recognition.id
                }

                whileHover={{
                  y: -4,
                }}

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index * 0.05,
                }}

                className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6 space-y-5"
              >

                {/* HEADER */}

                <div className="flex justify-between items-start">

                  <div className="flex gap-4">

                    {/* AVATAR */}

                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">

                      {
                        recognition
                          .giver.name[0]
                      }

                    </div>

                    <div>

                      <h3 className="font-bold text-lg">

                        {
                          recognition
                            .giver.name
                        }

                      </h3>

                      <p className="text-gray-500">

                        recognized{" "}

                        {recognition.recipients
                          .map(
                            (
                              r: any
                            ) =>
                              r.user
                                .name
                          )
                          .join(", ")}

                      </p>

                      <span className="inline-block mt-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">

                        {
                          recognition.value
                        }

                      </span>

                    </div>

                  </div>

                  {currentUser.id ===
                    recognition.giverId && (

                    <button
                      onClick={() =>
                        deleteRecognition(
                          recognition.id
                        )
                      }

                      className="text-red-500 hover:bg-red-50 p-2 rounded-xl"
                    >

                      <Trash2 size={18} />

                    </button>
                  )}

                </div>

                {/* MESSAGE */}

                <p className="text-gray-700 leading-relaxed text-lg">

                  {
                    recognition.message
                  }

                </p>

                {/* REACTIONS */}

                <div className="flex gap-4">

                  {REACTIONS.map(
                    (reaction) => {

                      const Icon =
                        reaction.icon;

                      return (
                        <button
                          key={
                            reaction.type
                          }

                          onClick={() =>
                            react(
                              recognition.id,
                              reaction.type
                            )
                          }

                          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-2xl border"
                        >

                          <Icon
                            size={18}
                            className={
                              reaction.color
                            }
                          />

                          <span>
                            {getReactionCount(
                              recognition.reactions,
                              reaction.type
                            )}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                {/* COMMENTS */}

                <div className="space-y-4">

                  <div className="flex items-center gap-2">

                    <MessageCircle
                      size={18}
                    />

                    <h4 className="font-semibold">
                      Comments
                    </h4>

                  </div>

                  {recognition.comments.map(
                    (comment: any) => (

                      <div
                        key={comment.id}
                        className="bg-gray-50 rounded-2xl p-4 flex justify-between"
                      >

                        <div>

                          <p className="font-semibold">
                            {
                              comment
                                .author
                                .name
                            }
                          </p>

                          <p className="text-gray-600 mt-1">
                            {
                              comment.body
                            }
                          </p>

                        </div>

                        {currentUser.id ===
                          comment.authorId && (

                          <button
                            onClick={() =>
                              deleteComment(
                                comment.id
                              )
                            }

                            className="text-red-500"
                          >

                            <Trash2
                              size={18}
                            />

                          </button>
                        )}

                      </div>
                    )
                  )}

                  {/* ADD COMMENT */}

                  <div className="flex gap-3">

                    <input
                      placeholder="Write comment..."
                      className="flex-1 border border-gray-200 bg-white rounded-2xl p-4"

                      value={
                        commentInputs[
                          recognition.id
                        ] || ""
                      }

                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,

                          [recognition.id]:
                            e.target
                              .value,
                        })
                      }
                    />

                    <button
                      onClick={() =>
                        addComment(
                          recognition.id
                        )
                      }

                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-2xl"
                    >

                      Add

                    </button>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>

    </div>
  );
}