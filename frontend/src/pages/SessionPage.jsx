import { useParams, Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../util/Navbar.jsx";
import ProblemDetail from "../util/ProblemDetail.jsx";
import CodeEditor from "../util/CodeEditor.jsx";
import VideoCall from "../util/VideoCall.jsx";
import { PROBLEMS } from "../data/problems.js";
import { executeCode } from "../lib/piston.js";

const BASE_URL = "http://localhost:3000/api";

const SessionPage = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(null);
  const [running, setRunning] = useState(false);

  /* ================= FETCH SESSION ================= */
  useEffect(() => {
    if (!pid) return;

    const fetchSession = async () => {
      try {
        setPageLoading(true);
        const res = await axios.get(
          `${BASE_URL}/sessions/${pid}`,
          { withCredentials: true }
        );
        setSession(res.data?.session || null);
      } catch {
        setError("Unable to load session");
      } finally {
        setPageLoading(false);
      }
    };

    fetchSession();
  }, [pid]);

  /* ================= FIND PROBLEM ================= */
  const problem = session
    ? Object.values(PROBLEMS).find(
      (p) => p.title === session.problem
    )
    : null;

  /* ================= SET STARTER CODE ================= */
  useEffect(() => {
    if (!problem) return;
    setCode(problem.starterCode[language]);
  }, [problem, language]);

  /* ================= END SESSION ================= */
  const handleEndSession = async () => {
    try {
      await axios.post(
        `${BASE_URL}/sessions/${pid}/end`,
        {},
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch {
      alert("Failed to end session");
    }
  };

  /* ================= RUN CODE ================= */
  const runCode = async () => {
    if (!problem) return;

    setRunning(true);
    setOutput("Running...");
    setStatus(null);

    const result = await executeCode(language, code);

    if (!result.success) {
      setOutput(result.error || "Execution error");
      setStatus("error");
      setRunning(false);
      return;
    }

    const userOutput = result.output.trim();
    const expected = problem.expectedOutput[language].trim();

    setOutput(userOutput);
    setStatus(userOutput === expected ? "success" : "wrong");
    setRunning(false);
  };

  /* ================= SAFE RETURNS ================= */
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error || !session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />

      <div className="px-6 lg:px-16 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: PROBLEM + CODE */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{session.problem}</h1>

            <span
              className={`badge ${session.difficulty === "easy"
                  ? "badge-success"
                  : session.difficulty === "medium"
                    ? "badge-warning"
                    : "badge-error"
                }`}
            >
              {session.difficulty.toUpperCase()}
            </span>

            {session.host && (
              <button
                className="btn btn-sm btn-error ml-auto"
                onClick={handleEndSession}
              >
                End Session
              </button>
            )}
          </div>

          {problem && <ProblemDetail problem={problem} />}

          <CodeEditor
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            output={output}
            setOutput={setOutput}
            status={status}
            setStatus={setStatus}
            runCode={runCode}
            loading={running}
          />
        </div>

        {/* RIGHT: VIDEO CALL */}
        <div className="bg-gray-700 border sticky top-0 z-50 border-base-300 rounded-xl h-[600px]">
          <VideoCall callId={pid} />
        </div>

      </div>
    </div>
  );
};

export default SessionPage;