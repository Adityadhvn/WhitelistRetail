"use client";

import { useState } from "react";

export default function InfluencerAdminPage() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    instagram: "",
    referralCode: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/create-influencer",
      {
        method: "POST",
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      alert("Influencer created");

      setForm({
        username: "",
        password: "",
        name: "",
        instagram: "",
        referralCode: "",
      });

    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5] p-8">

      <div className="max-w-2xl">

        <h1 className="text-5xl font-serif text-stone-900">
          Create Influencer
        </h1>

        <p className="mt-4 text-stone-500">
          Create influencer accounts for portal access.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Instagram"
            value={form.instagram}
            onChange={(e) =>
              setForm({
                ...form,
                instagram: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Referral Code"
            value={form.referralCode}
            onChange={(e) =>
              setForm({
                ...form,
                referralCode: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none"
          />

          <button
            type="submit"
            className="bg-[#4b5f49] text-white px-8 py-4 rounded-2xl"
          >
            Create Influencer
          </button>

        </form>
      </div>
    </div>
  );
}