import { useParams, Navigate } from "react-router";
import { useState, useEffect } from "react";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston.js";
import Navbar from "../util/Navbar.jsx";
import ProblemDetail from "../util/ProblemDetail.jsx";
import CodeEditor from "../util/CodeEditor.jsx";

export default function ProblemPage() {
    const { id } = useParams();          // dynamic id
    const problem = PROBLEMS[id];        // fetch problem dynamically

    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load starter code when problem OR language changes
    useEffect(() => {
        if (problem) {
            setCode(problem.starterCode[language]);
            setOutput("");
            setStatus(null);
        }
    }, [problem, language]);

    // Invalid problem id
    if (!problem) {
        return <Navigate to="/dashboard" replace />;
    }

    const runCode = async () => {
        setLoading(true);
        setOutput("Running...");
        setStatus(null);

        const result = await executeCode(language, code);

        if (!result.success) {
            setOutput(result.error || "Execution error");
            setStatus("error");
            setLoading(false);
            return;
        }

        const userOutput = result.output.trim();
        const expected = problem.expectedOutput[language].trim();

        setOutput(userOutput);
        setStatus(userOutput === expected ? "success" : "wrong");
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-base-100 px-6 py-4">
            {/* ===== Navbar ===== */}
            <Navbar />
            {/* ✅ Page Content */}


            <h1 className="text-3xl font-bold text-success mb-4">
                {problem.title}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT – PROBLEM DETAILS */}
                <ProblemDetail problem={problem} />

                {/* RIGHT – CODE EDITOR */}
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
                    loading={loading}
                />

            </div>
        </div>
    );
}
