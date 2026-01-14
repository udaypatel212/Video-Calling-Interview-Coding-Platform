import { useUser } from "@clerk/clerk-react";
import Navbar from "../util/Navbar.jsx";
import { useEffect, useState } from "react";
import CreateSessionModal from "./CreateSessionModal";
import { useNavigate } from "react-router";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [displayAS, setDisplayAS] = useState([]);
  const [displayRS, setDisplayRS] = useState([]);
  const [countSession, setCountSession] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH ACTIVE SESSIONS ================= */
  const fetchActiveSessions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/sessions/active`);
      setDisplayAS(res.data?.acitveSession || []);
    } catch (err) {
      console.error("Error fetching active sessions:", err);
      setError("Failed to load active sessions");
    }
  };

  /* ================= FETCH RECENT SESSIONS ================= */
  const fetchRecentSessions = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/sessions/my-recent`,
        { withCredentials: true }
      );
      setDisplayRS(res.data?.recentSessions || []);
    } catch (err) {
      console.error("Error fetching recent sessions:", err);
      setError("Failed to load recent sessions");
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await fetchActiveSessions();
      await fetchRecentSessions();
      setLoading(false);
    };

    loadDashboard();
  }, []);

  /* ================= COUNT USER SESSIONS ================= */
  useEffect(() => {
    if (!user?.id) return;

    const activeCount = displayAS.filter(
      (session) =>
        session.host?.clerkId === user.id ||
        session.participant?.clerkId === user.id
    ).length;

    const recentCount = displayRS.filter(
      (session) =>
        session.host?.clerkId === user.id ||
        session.participant?.clerkId === user.id
    ).length;

    setCountSession(activeCount + recentCount);
  }, [displayAS, displayRS, user?.id]);

  /* ================= LOADING / ERROR ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* ================= NAVBAR ================= */}
      <Navbar />

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

          <button
            className="btn btn-primary gap-2 w-fit"
            onClick={() => setOpen(true)}
          >
            ⚡ Create Session
          </button>

          {open && <CreateSessionModal onClose={() => setOpen(false)} />}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title">🔥 Active Sessions</h2>
              <p className="text-4xl font-bold mt-2">{displayAS.length}</p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title">🏆 Total Sessions</h2>
              <p className="text-4xl font-bold mt-2">{countSession}</p>
            </div>
          </div>
        </div>

        {/* Live Sessions */}
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title">🟢 Live Sessions</h2>
              <span className="text-2xl text-amber-700">
                {displayAS.length}
              </span>
            </div>

            <div className="max-h-[360px] overflow-y-auto pr-2">
              {displayAS.length === 0 ? (
                <p className="text-sm opacity-60">No active sessions</p>
              ) : (
                displayAS.map((session) => (
                  <div
                    key={session._id}
                    className="mt-4 flex items-center justify-between bg-base-100 p-4 rounded-xl border border-base-300"
                  >
                    <div>
                      <p className="font-semibold">
                        {session.problem}
                        <span
                          className={`badge badge-sm ml-2 ${session.difficulty === "easy"
                              ? "badge-success"
                              : session.difficulty === "medium"
                                ? "badge-warning"
                                : "badge-error"
                            }`}
                        >
                          {session.difficulty?.toUpperCase()}
                        </span>
                      </p>

                      <p className="text-sm opacity-70">
                        Host: {session.host?.name || "You"}
                      </p>
                    </div>

                    <button
                      className="btn btn-outline btn-primary btn-sm"
                      onClick={() => navigate(`/session/${session._id}`)}
                    >
                      Rejoin →
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Past Sessions
          </h2>

          {displayRS.length === 0 ? (
            <div className="text-center text-sm opacity-60">
              0 recent sessions
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
              {displayRS.map((session) => (
                <div
                  key={session._id}
                  className="card bg-base-200 border bg-emerald-300 border-base-300 hover:border-primary transition"
                >
                  <div className="card-body">
                    <h3 className="font-semibold">
                      💻 {session.problem}
                    </h3>
                    <span className="text-xs  opacity-60">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;





// import { useUser } from "@clerk/clerk-react";
// import Navbar from "../util/Navbar.jsx";
// import { useEffect } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { sessionAPI } from "../api/sessions.js";
// import { useState } from "react";
// import CreateSessionModal from "./CreateSessionModal";
// import { useNavigate } from "react-router";

// const DashboardPage = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);

//   const { data: activeSessiondata } = useQuery({
//     queryKey: ["activeSessions"],
//     queryFn: sessionAPI.getActiveSessions
//   })
//   const displayAS = activeSessiondata?.acitveSession ?? [];

//   const { data: recentSessiondata } = useQuery({
//     queryKey: ["myRecentSessions"],
//     queryFn: sessionAPI.getMyRecentSessions
//   });
//   const displayRS = recentSessiondata?.recentSessions ?? [];

//   const [countSession, setCountSession] = useState(0);

//   useEffect(() => {
//     if (!user?.id) return;

//     const count = displayRS.filter(
//       (session) =>
//         session.host?.clerkId === user.id ||
//         session.participant?.clerkId === user.id
//     ).length;

//     const count2 = displayAS.filter(
//       (session) =>
//         session.host?.clerkId === user.id ||
//         session.participant?.clerkId === user.id
//     ).length;

//     setCountSession(count + count2);
//   }, [displayRS, user?.id]);

//   return (
//     <div className="min-h-screen bg-base-100 text-base-content">
//       {/* ================= NAVBAR ================= */}
//       <Navbar />

//       {/* ================= MAIN ================= */}
//       <div className="px-6 lg:px-16 py-8 space-y-8">
//         {/* Welcome */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-primary">
//               Welcome back, {user?.firstName || "Coder"}!
//             </h1>
//             <p className="text-sm opacity-70">
//               Ready to level up your coding skills?
//             </p>
//           </div>

//           <button
//             className="btn btn-primary gap-2 w-fit"
//             onClick={() => setOpen(true)}
//           >
//             ⚡ Create Session
//           </button>

//           {open && <CreateSessionModal onClose={() => setOpen(false)} />}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="card bg-base-200 border border-base-300">
//             <div className="card-body">
//               <h2 className="card-title">🔥 Active Sessions</h2>
//               <p className="text-4xl font-bold mt-2">{displayAS.length}</p>
//             </div>
//           </div>

//           <div className="card bg-base-200 border border-base-300">
//             <div className="card-body">
//               <h2 className="card-title">🏆 Total Sessions</h2>
//               <p className="text-4xl font-bold mt-2">{countSession}</p>
//             </div>
//           </div>
//         </div>

//         {/* Live Sessions */}
//         <div className="card bg-base-200 border border-base-300">
//           <div className="card-body">

//             {/* Header */}
//             <div className="flex items-center justify-between">
//               <h2 className="card-title">🟢 Live Sessions</h2>
//               <span className="text-2xl text-amber-700">
//                 {displayAS.length}
//               </span>
//             </div>

//             {/* Scrollable List */}
//             <div className="max-h-[360px] overflow-y-auto pr-2">
//               {displayAS.length === 0 ? (
//                 <p className="text-sm opacity-60">No active sessions</p>
//               ) : (
//                 displayAS.map((session) => (
//                   <div
//                     key={session._id}
//                     className="mt-4 flex items-center justify-between bg-base-100 p-4 rounded-xl border border-base-300"
//                   >
//                     <div>
//                       <p className="font-semibold">
//                         {session.problem}
//                         <span
//                           className={`badge badge-sm ml-2 ${session.difficulty === "easy"
//                               ? "badge-success"
//                               : session.difficulty === "medium"
//                                 ? "badge-warning"
//                                 : "badge-error"
//                             }`}
//                         >
//                           {session.difficulty?.toUpperCase()}
//                         </span>
//                       </p>

//                       <p className="text-sm opacity-70">
//                         Host: {session.host?.name || "You"}
//                       </p>
//                     </div>

//                     <button
//                       className="btn btn-outline btn-primary btn-sm"
//                       onClick={() => navigate(`/session/${session._id}`)}
//                     >
//                       Rejoin →
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>

//           </div>
//         </div>

//         {/* Past Sessions */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">
//             Your Past Sessions
//           </h2>

//           {displayRS.length === 0 ? (
//             <div className="col-span-full text-center text-sm opacity-60">
//               0 recent sessions
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {displayRS.map((session, idx) => (
//                 <div
//                   key={idx}
//                   className="card bg-base-200 border border-base-300 hover:border-primary transition"
//                 >
//                   <div className="card-body">
//                     <h3 className="font-semibold">
//                       💻 {session.title}
//                     </h3>

//                     <div className="flex items-center justify-between mt-3">
//                       <span
//                         className={`badge ${session.level === "Easy"
//                           ? "badge-success"
//                           : "badge-warning"
//                           }`}
//                       >
//                         {session.level}
//                       </span>
//                       <span className="text-xs opacity-60">
//                         Completed
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
