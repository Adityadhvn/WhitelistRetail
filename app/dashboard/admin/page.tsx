import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import InfluencerForm from "./InfluencerForm";
import Navbar from "@/components/Navbar";
import ManageInfluencers from "./ManageInfluencers";

export default async function InfluencerAdminPage() {
  const { sessionClaims } = await auth();

  // ADMIN ONLY
  const metadata = sessionClaims?.metadata as {
    role?: string;
  };
  
  if (metadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <>
    <Navbar />


    <main className="mt-12 min-h-screen bg-[#F8F6F2] px-5 py-10 md:px-10">
      <div className="mx-auto max-w-2xl">
        <InfluencerForm />
        <ManageInfluencers />
      </div>
    </main>
    </>
  );
}