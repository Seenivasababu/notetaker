import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { RouterOutputs } from "~/trpc/shared";

type Note = RouterOutputs["note"]["getAll"][0];

const NoteCard = ({
  note,
  onDelete,
  deleteLoading,
}: {
  note: Note;
  onDelete: () => void;
  deleteLoading: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card mt-1 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-2">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : "collapse"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-lg">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-start">
          <button
            className="btn btn-neutral btn-xs my-2 px-5"
            onClick={() => void onDelete()}
            disabled={deleteLoading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
