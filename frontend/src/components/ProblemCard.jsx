import { Link } from "react-router";

const difficultyColor = {
  Easy: "badge-success",
  Medium: "badge-warning",
  Hard: "badge-error",
};

export default function ProblemCard({ problem }) {
  return (
    <div className="card bg-base-200 hover:bg-base-300 transition border border-base-300">
      <div className="card-body py-4 px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary font-mono text-sm">{`</>`}</span>
              <h3 className="font-semibold text-lg">
                {problem.title}
              </h3>
              <span
                className={`badge badge-sm ${difficultyColor[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
            </div>

            <p className="text-sm text-base-content/70">
              {problem.category}
            </p>

            <p className="text-sm mt-2 text-base-content/80 line-clamp-2">
              {problem.description.text}
            </p>
          </div>

          <Link
            to={`/problems/${problem.id}`}
            className="btn btn-sm btn-success btn-outline"
          >
            Solve →
          </Link>
        </div>
      </div>
    </div>
  );
}
