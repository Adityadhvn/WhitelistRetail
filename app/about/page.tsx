"use client";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-stone-900">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          

          <h1 className="mt-4 text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.95] text-stone-950">
            About Us
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-5 md:px-10 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">

          {/* INTRODUCTION */}
          <div className="space-y-6 text-[16px] md:text-[17px] leading-8 text-stone-600">
            <p>
              Whitelist is a retail real estate sourcing and expansion platform
              built to simplify how brands discover commercial retail spaces
              and how property owners connect with the right retail tenants.
            </p>

            <p>
              We believe that retail expansion should not depend on fragmented
              broker networks, endless follow-ups, or unverified property
              information. Instead, it should be driven by accurate data,
              verified opportunities, and a structured process that benefits
              everyone involved.
            </p>

            <p>
              Whitelist brings together commercial property owners, retail
              brands, and a nationwide network of on-ground scouts onto a single
              platform designed specifically for offline retail expansion.
            </p>
          </div>

          {/* WHAT WE DO */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-stone-950">
              What We Do
            </h2>

            <div className="mt-6 space-y-6 text-[16px] md:text-[17px] leading-8 text-stone-600">
              <p>
                Our platform enables commercial property owners to showcase
                their retail spaces to expanding brands while giving retail
                expansion teams access to verified, expansion-ready commercial
                properties across multiple cities.
              </p>

              <p>
                Every property submitted through Whitelist undergoes a review
                process before being evaluated against active brand
                requirements. Our team manages sourcing, verification,
                communication, and coordination to ensure both brands and
                property owners experience a smooth and transparent leasing
                journey.
              </p>

              <p>
                Whether you're opening your next flagship store or looking for
                the right tenant for your commercial property, Whitelist helps
                make the process more efficient.
              </p>
            </div>
          </div>

          {/* THREE COMMUNITIES */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-stone-950">
              Built Around Three Communities
            </h2>

            <div className="mt-10 space-y-10">

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Property Owners
                </h3>

                <p className="mt-4 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  Commercial property owners can submit their retail spaces
                  through Whitelist and connect with brands actively searching
                  for new locations. Rather than marketing properties
                  individually to multiple businesses, landlords gain access to
                  a structured network focused exclusively on retail leasing.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Retail Brands
                </h3>

                <p className="mt-4 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  Brands share their expansion requirements, preferred cities,
                  store specifications, frontage, size requirements, and
                  location preferences. Whitelist then sources suitable
                  commercial opportunities through its verified network of
                  scouts and property owners, reducing the time and effort
                  involved in expansion.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Whitelist Scouts
                </h3>

                <p className="mt-4 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  Our nationwide scout network plays an important role in
                  discovering commercial retail opportunities across different
                  cities. Scouts identify suitable properties, submit verified
                  information through the platform, and contribute to building
                  India's growing retail infrastructure.
                </p>
              </div>

            </div>
          </div>

          {/* WHY BUSINESSES CHOOSE WHITELIST */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-stone-950">
              Why Businesses Choose Whitelist
            </h2>

            <ul className="mt-7 space-y-4 text-[16px] md:text-[17px] leading-7 text-stone-600 list-disc pl-5">
              <li>Verified commercial property sourcing</li>
              <li>Dedicated retail expansion support</li>
              <li>Faster access to expansion-ready locations</li>
              <li>Centralized communication between stakeholders</li>
              <li>Structured property verification process</li>
              <li>Nationwide sourcing network</li>
              <li>Transparent coordination throughout the leasing process</li>
            </ul>
          </div>

          {/* MISSION */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-stone-950">
              Our Mission
            </h2>

            <p className="mt-6 text-[16px] md:text-[17px] leading-8 text-stone-600">
              To build India's most trusted retail expansion infrastructure by
              creating a transparent ecosystem where brands, property owners,
              and local sourcing partners work together through one organized
              platform.
            </p>
          </div>

          {/* VISION */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-stone-950">
              Our Vision
            </h2>

            <p className="mt-6 text-[16px] md:text-[17px] leading-8 text-stone-600">
              We envision a future where finding the right commercial property
              is no longer based on chance or disconnected local networks. By
              combining technology with strong on-ground relationships,
              Whitelist aims to become the preferred retail expansion partner
              for brands across India while helping commercial property owners
              maximize the potential of their real estate assets.
            </p>
          </div>

          {/* VALUES */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-stone-950">
              Our Values
            </h2>

            <div className="mt-10 space-y-10">

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Transparency
                </h3>
                <p className="mt-3 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  We believe clear communication and honest processes build
                  long-term relationships.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Quality
                </h3>
                <p className="mt-3 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  Every property submitted is reviewed before being introduced
                  to suitable brands.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Efficiency
                </h3>
                <p className="mt-3 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  Our goal is to simplify retail expansion and reduce the time
                  required to discover quality locations.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900">
                  Partnership
                </h3>
                <p className="mt-3 text-[16px] md:text-[17px] leading-8 text-stone-600">
                  We work closely with brands, landlords, and scouts because
                  successful retail expansion depends on collaboration.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}