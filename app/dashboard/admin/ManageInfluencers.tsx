"use client";

import { useState } from "react";

export default function ManageInfluencers() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isResetting, setIsResetting] =
    useState(false);

  async function handleResetPassword(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (isResetting) return;

    setIsResetting(true);

    try {
      const res = await fetch(
        "/api/reset-influencer-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successfully");

        setUsername("");
        setNewPassword("");
      } else {
        alert(
          data.error ||
            "Something went wrong"
        );
      }

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );

    } finally {
      setIsResetting(false);
    }
  }

  return (
    <section className="mt-12 rounded-3xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-2xl md:text-3xl font-serif text-stone-900">
          Manage Influencers
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Manage influencer account credentials.
        </p>

      </div>

      {/* RESET PASSWORD */}

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 md:p-6">

        <h3 className="text-lg font-semibold text-stone-900">
          Reset Password
        </h3>

        <p className="mt-1 text-sm text-stone-500">
          Set a new password for an influencer account.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="mt-6 space-y-4"
        >

          {/* USERNAME */}

          <input
            type="text"
            placeholder="Influencer Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
            autoComplete="off"
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
          />

          {/* NEW PASSWORD */}

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={isResetting}
            className="w-full md:w-auto rounded-2xl bg-black px-8 py-4 text-white font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResetting
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </section>
  );
}