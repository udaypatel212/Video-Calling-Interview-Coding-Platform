import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionAPI } from "../api/sessions";
import { PROBLEMS } from "../data/problems";
import { useNavigate } from "react-router";

const PROBLEM_LIST = Object.values(PROBLEMS);

export default function CreateSessionModal({ onClose }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [selectedProblemId, setSelectedProblemId] = useState(
        PROBLEM_LIST[0]?.id || ""
    );

    const selectedProblem = PROBLEM_LIST.find(
        (p) => p.id === selectedProblemId
    );

    const createSessionMutation = useMutation({
        mutationFn: sessionAPI.createSession,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["activeSessions"]);
            onClose();
            navigate(`/session/${data.session._id}`);
        
        },
    });

    if (!selectedProblem) {
        return null; // safety guard
    }

    const handleCreate = () => {
        createSessionMutation.mutate({
            problem: selectedProblem.title,
            difficulty: selectedProblem.difficulty.toLowerCase(),
        });
    
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-200 w-full max-w-lg rounded-xl p-6 space-y-5">

                <h2 className="text-xl font-semibold">Create New Session</h2>

                {/* Select Problem */}
                <div className="form-control">
                    <label className="label font-medium">Select Problem *</label>
                    <select
                        className="select select-bordered"
                        value={selectedProblemId}
                        onChange={(e) => setSelectedProblemId(e.target.value)}
                    >
                        {PROBLEM_LIST.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.title} ({p.difficulty})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Room Summary */}
                <div className="bg-success/20 border border-success rounded-lg p-4 text-sm">
                    <p className="font-semibold mb-1">Room Summary:</p>
                    <p>Problem: <b>{selectedProblem.title}</b></p>
                    <p>Difficulty: <b>{selectedProblem.difficulty}</b></p>
                    <p>Max Participants: <b>2 (1-on-1 session)</b></p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleCreate}
                        disabled={createSessionMutation.isLoading}
                    >
                        {createSessionMutation.isLoading
                            ? "Creating..."
                            : "➕ Create Room"}
                    </button>
                </div>
            </div>
        </div>
    );
}
