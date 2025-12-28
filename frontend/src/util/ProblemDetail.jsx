import React from 'react'

function ProblemDetail({problem}) {
    return (

        <div className="bg-base-200 rounded-xl p-5 shadow overflow-y-auto">
            <div className="flex gap-2">
                <span className="badge badge-success">{problem.difficulty}</span>
                <span className="badge badge-outline">{problem.category}</span>
            </div>

            <p className="mt-4">{problem.description.text}</p>

            <ul className="list-disc list-inside mt-2 text-sm opacity-80">
                {problem.description.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                ))}
            </ul>

            <h3 className="mt-4 font-semibold">Examples</h3>
            {problem.examples.map((ex, i) => (
                <div key={i} className="bg-base-300 p-3 rounded mt-2">
                    <p><b>Input:</b> {ex.input}</p>
                    <p><b>Output:</b> {ex.output}</p>
                    {ex.explanation && (
                        <p className="opacity-70"><b>Explanation:</b> {ex.explanation}</p>
                    )}
                </div>
            ))}

            <h3 className="mt-4 font-semibold">Constraints</h3>
            <ul className="list-disc list-inside text-sm opacity-80">
                {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProblemDetail