import { Link, useNavigate, useLocation } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import { PROBLEMS } from "../data/problems";
import ProblemCard from "../components/problemCard.jsx";

export default function ProblemsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const problemsArray = Object.values(PROBLEMS);

  const stats = {
    total: problemsArray.length,
    easy: problemsArray.filter(p => p.difficulty === "Easy").length,
    medium: problemsArray.filter(p => p.difficulty === "Medium").length,
    hard: problemsArray.filter(p => p.difficulty === "Hard").length,
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ===== Navbar ===== */}
      <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300 px-6 lg:px-16">
        {/* Left */}
        <div className="flex-1 flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-primary">
            TalentIQ
          </Link>

          {/* Nav Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className={`btn btn-sm ${
                isActive("/dashboard") ? "btn-primary" : "btn-ghost"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/problems")}
              className={`btn btn-sm ${
                isActive("/problems") ? "btn-primary" : "btn-ghost"
              }`}
            >
              Problems
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
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

      {/* ===== Page Content ===== */}
      <div className="min-h-screen bg-base-100 px-6 lg:px-16 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Practice Problems</h1>
          <p className="text-base-content/70 mt-2">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* Problems List */}
        <div className="space-y-4 mb-10">
          {problemsArray.map(problem => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Problems" value={stats.total} color="text-primary" />
          <StatCard title="Easy" value={stats.easy} color="text-success" />
          <StatCard title="Medium" value={stats.medium} color="text-warning" />
          <StatCard title="Hard" value={stats.hard} color="text-error" />
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body items-center text-center py-6">
        <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
        <p className="text-sm text-base-content/70">{title}</p>
      </div>
    </div>
  );
}
