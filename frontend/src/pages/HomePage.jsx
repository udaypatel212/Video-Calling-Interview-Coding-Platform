import React from "react";
import { Link } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-base-100">

      {/* Sticky Navbar */}
      <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300 px-6 lg:px-16">
        <div className="flex-1">
          {/* Logo / Home Link */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:opacity-80 transition"
          >
            TalentIQ
          </Link>
        </div>

        <div className="flex gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-outline btn-primary">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <span className="badge badge-success badge-outline mb-4">
              Real-time Collaboration
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Code Together,</span>
              <br />
              Learn Together
            </h1>

            <p className="mt-6 text-base-content/70 max-w-xl">
              The ultimate platform for collaborative coding interviews and
              pair programming. Connect face-to-face, code in real-time,
              and ace your technical interviews.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="badge badge-outline">Live Video Chat</div>
              <div className="badge badge-outline">Code Editor</div>
              <div className="badge badge-outline">Multi-Language</div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn btn-primary">
                    Start Coding Now →
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link to="/dashboard">
                  <button className="btn btn-primary">
                    Start Coding Now →
                  </button>
                </Link>
              </SignedIn>

              <button className="btn btn-ghost">
                Watch Demo
              </button>
            </div>


            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <h3 className="text-2xl font-bold text-primary">10K+</h3>
                <p className="text-sm text-base-content/60">Active Users</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">50K+</h3>
                <p className="text-sm text-base-content/60">Sessions</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">99.9%</h3>
                <p className="text-sm text-base-content/60">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>

            <img
              src="hero.png"
              alt="Coding Illustration"
              className="relative z-10 rounded-2xl shadow-xl"
            />
          </div>

        </div>
      </section>
      {/* Features Section */}
      <section className="px-6 lg:px-16 py-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Everything You Need to{" "}
            <span className="text-primary">Succeed</span>
          </h2>
          <p className="mt-4 text-base-content/60">
            Powerful features designed to make your coding interviews seamless
            and productive.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="card bg-base-200/60 backdrop-blur border border-base-300 hover:border-primary transition">
            <div className="card-body items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m-6 0H5a2 2 0 01-2-2V9a2 2 0 012-2h4m6 7v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1"
                  />
                </svg>
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-sm text-base-content/60">
                Crystal clear video and audio for seamless communication
                during interviews.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-200/60 backdrop-blur border border-base-300 hover:border-primary transition">
            <div className="card-body items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                  />
                </svg>
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-sm text-base-content/60">
                Collaborate in real-time with syntax highlighting and
                multi-language support.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-200/60 backdrop-blur border border-base-300 hover:border-primary transition">
            <div className="card-body items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a3 3 0 110-6 3 3 0 010 6zM9 11a3 3 0 110-6 3 3 0 010 6z"
                  />
                </svg>
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-sm text-base-content/60">
                Share your screen, discuss solutions, and learn from
                each other in real-time.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default HomePage;
