import React from 'react'

function CodeEditor({language, setLanguage, code, setCode, output, setOutput, status, setStatus, runCode, loading}) {
    return (
        <div className="bg-base-200 rounded-xl p-5 shadow flex flex-col">
            <div className="flex justify-between mb-2">
                <select
                    className="select select-bordered select-sm"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>

                <button
                    onClick={runCode}
                    disabled={loading}
                    className="btn btn-success btn-sm"
                >
                    {loading ? "Running..." : "▶ Run Code"}
                </button>
            </div>

            <textarea
                className="textarea textarea-bordered flex-1 font-mono text-sm resize"
                style={{ minHeight: "300px", width: "680px" }}
                value={code}
                disabled={loading}
                onChange={(e) => setCode(e.target.value)}
            />


            <div className="mt-3 bg-black text-green-400 p-3 rounded h-32 overflow-auto text-sm">
                {output || "Click Run Code to see output..."}
            </div>

            {status === "success" && (
                <div className="alert alert-success mt-2">✅ Accepted</div>
            )}
            {status === "wrong" && (
                <div className="alert alert-warning mt-2">❌ Wrong Answer</div>
            )}
            {status === "error" && (
                <div className="alert alert-error mt-2">⚠ Runtime Error</div>
            )}
        </div>
    )
}

export default CodeEditor