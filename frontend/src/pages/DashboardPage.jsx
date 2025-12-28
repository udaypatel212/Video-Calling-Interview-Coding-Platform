
import {useUser} from "@clerk/clerk-react";
import Navbar from "../util/Navbar.jsx";
const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* ================= NAVBAR ================= */}
       <Navbar/>

      {/* ================= MAIN ================= */}
      <div className="px-6 lg:px-16 py-8 space-y-8">
        {/* Welcome */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Welcome back, {user?.firstName || "Coder"}!
            </h1>
            <p className="text-sm opacity-70">
              Ready to level up your coding skills?
            </p>
          </div>

          <button className="btn btn-primary gap-2 w-fit">
            ⚡ Create Session
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title">🔥 Active Sessions</h2>
              <p className="text-4xl font-bold mt-2">1</p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title">🏆 Total Sessions</h2>
              <p className="text-4xl font-bold mt-2">6</p>
            </div>
          </div>
        </div>

        {/* Live Sessions */}
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title">🟢 Live Sessions</h2>
              <span className="text-sm text-success">1 active</span>
            </div>

            <div className="mt-4 flex items-center justify-between bg-base-100 p-4 rounded-xl border border-base-300">
              <div>
                <p className="font-semibold">
                  Two Sum
                  <span className="badge badge-success badge-sm ml-2">
                    Easy
                  </span>
                </p>
                <p className="text-sm opacity-70">
                  Host: {user?.firstName || "You"}
                </p>
              </div>

              <button className="btn btn-outline btn-primary btn-sm">
                Rejoin →
              </button>
            </div>
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Past Sessions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Reverse String", level: "Easy" },
              { title: "Valid Palindrome", level: "Easy" },
              { title: "Maximum Subarray", level: "Medium" },
              { title: "Container With Most Water", level: "Medium" },
              { title: "Two Sum", level: "Easy" },
            ].map((session, idx) => (
              <div
                key={idx}
                className="card bg-base-200 border border-base-300 hover:border-primary transition"
              >
                <div className="card-body">
                  <h3 className="font-semibold">
                    💻 {session.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <span
                      className={`badge ${
                        session.level === "Easy"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {session.level}
                    </span>
                    <span className="text-xs opacity-60">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
