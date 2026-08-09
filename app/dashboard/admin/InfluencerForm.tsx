"use client";

import { useState } from "react";

export default function InfluencerForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    instagram: "",
    referralCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/create-influencer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

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
        const data = await res.json().catch(() => null);

        alert(data?.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
        Create Influencer
      </h1>

      <p className="mt-4 font-medium text-stone-500">
        Create influencer accounts for portal access.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5"
      >
        {/* FULL NAME */}
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
          required
          autoComplete="name"
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
        />

        {/* USERNAME */}
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
          required
          autoComplete="username"
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
        />

        {/* PASSWORD */}
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
          required
          autoComplete="new-password"
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
        />

        {/* INSTAGRAM */}
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
          required
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
        />

        {/* REFERRAL CODE */}
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
          required
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 outline-none focus:border-[#4b5f49]"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-[#4b5f49] text-white px-8 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Influencer"}
        </button>
      </form>
    </>
  );
}