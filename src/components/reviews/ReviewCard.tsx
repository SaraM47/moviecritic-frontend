import { Star } from "lucide-react";
import Button from "../../features/ui/Button";

// Props definition for ReviewCard component
interface Props {
  review: any; // Review object containing title, text, rating and userId
  user: any; // Currently logged-in user
  editingId: string | null; // ID of the review currently being edited
  editTitle: string; // Title being edited
  editRating: number; // Rating being edited
  editText: string; // Text being edited
  setEditTitle: (v: string) => void; // Function to update the editTitle state
  setEditRating: (v: number) => void; // Function to update the editRating state
  setEditText: (v: string) => void; // Function to update the editText state
  actionLoading: boolean; // Indicates if an action (update/delete) is currently loading and is in progress
  onStartEdit: (review: any) => void; // Function to initiate editing of a review
  onUpdate: (e: React.FormEvent) => void; // Function to handle the update of a review
  onDelete: (id: string) => void; // Delete review
  onOpen: (review: any) => void; // Open full review modal
}

// Component used to display a single movie review
export default function ReviewCard({
  review,
  user,
  editingId,
  editTitle,
  editRating,
  editText,

  setEditTitle,
  setEditRating,
  setEditText,
  actionLoading,
  onStartEdit,
  onUpdate,
  onDelete,
  onOpen,
}: Props) {
  // Extract owner ID regardless of whether userId is populated or just an ID string
  const ownerId =
    typeof review.userId === "string" ? review.userId : review.userId?._id;

  // Determine username depending on whether user object is populated
  const username =
    typeof review.userId === "string"
      ? "User"
      : review.userId?.username || "User";

  // Check if the logged-in user is the owner of the review
  const isOwner = user?.id === ownerId;

  return (
    // Card container representing a single review
    <article className="min-w-[320px] max-w-90 shrink-0 snap-start rounded-2xl border border-white/10 bg-neutral-900 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-white">{username}</p>

        <span className="flex items-center gap-1 text-yellow-400">
          <Star size={18} fill="currentColor" strokeWidth={0} />
          {review.rating}/10
        </span>
      </div>

      {/* If this review is currently being edited, show edit form */}
      {editingId === review._id ? (
        <form onSubmit={onUpdate} className="space-y-3">
          {/* Edit title */}
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2"
          />

          {/* Edit rating */}
          <input
            type="number"
            min="1"
            max="10"
            value={editRating}
            onChange={(e) => setEditRating(Number(e.target.value))}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2"
          />

          {/* Edit review text */}
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2"
          />

          {/* Save updated review */}
          <Button type="submit" disabled={actionLoading}>
            {actionLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      ) : (
        <>
          {/* Review title */}
          <h3 className="text-md font-semibold text-white">{review.title}</h3>

          {/* Short preview of the review text */}
          <p className="text-slate-300 line-clamp-4">{review.text}</p>

          {/* Open full review */}
          <button
            onClick={() => onOpen(review)}
            className="text-sm underline text-slate-400 hover:text-white"
          >
            Read more
          </button>
        </>
      )}

      {/* Show edit/delete actions only for the review owner */}
      {isOwner && editingId !== review._id && (
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={() => onStartEdit(review)}>
            Edit
          </Button>

          <Button variant="danger" onClick={() => onDelete(review._id)}>
            Delete
          </Button>
        </div>
      )}
    </article>
  );
}
