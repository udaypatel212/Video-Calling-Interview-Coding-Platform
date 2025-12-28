import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import toast from "react-hot-toast";
import { useEffect } from "react";


function CodeEditor({
    language,
    setLanguage,
    code,
    setCode,
    output,
    status,
    runCode,
    loading,
}) {
    
    useEffect(() => {
      if (status === "success") {
        toast.success("Accepted ✅ All test cases passed!");
      }
      if (status === "wrong") {
        toast.error("Wrong Answer ❌");
      }
      if (status === "error") {
        toast.error("Runtime Error ⚠");
      }
    }, [status]);

    const getLanguageExtension = () => {
        switch (language) {
            case "python":
                return python();
            case "java":
                return java();
            default:
                return javascript();
        }
    };

    return (
        <div className="bg-base-200 rounded-xl p-5 shadow flex flex-col">
            {/* Header */}
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

            {/* Code Editor */}
            <div className="border rounded-md overflow-hidden">
                <CodeMirror
                    value={code}
                    height="300px"
                    theme={oneDark}
                    extensions={[getLanguageExtension()]}
                    onChange={(value) => setCode(value)}
                    editable={!loading}
                />
            </div>

            {/* Output */}
            <div className="mt-3 bg-black text-green-400 p-3 rounded h-32 overflow-auto text-sm">
                {output || "➡️ Click Run Code to see output..."}
            </div>

            {/* Status */}
            {status === "success" && (
                <div className="alert alert-success mt-2">✅ Accepted</div>
            )}
            {status === "wrong" && (
                <div className="alert alert-warning mt-2" >❌ Wrong Answer</div>
            )}
            {status === "error" && (
                <div className="alert alert-error mt-2">⚠ Runtime Error</div>
            )}
        </div>
    );
}

export default CodeEditor;
