import Button from "../../features/ui/Button";

// Props definition for ReviewForm component
interface Props {
  title: string; // The title of the review
  rating: number; // Review rating (1–10)
  text: string; // Review content

  setTitle: (v: string) => void;
  setRating: (v: number) => void;
  setText: (v: string) => void;

  loading: boolean;

  onSubmit: (e: React.FormEvent) => void; // Function triggered when form is submitted
}

// Component used to create a new movie review
export default function ReviewForm({
  title,
  rating,
  text,
  setTitle,
  setRating,
  setText,
  loading,
  onSubmit,
}: Props) {
  return (
    // Review form container
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-neutral-900 p-6"
    >
      {/* Form heading */}
      <h3 className="text-xl font-semibold text-white">Add your review</h3>

      {/* Review title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Short summary"
        className="w-full rounded-lg bg-neutral-800 px-4 py-3 text-white"
      />

      {/* Rating input (1–10) */}
      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full rounded-lg bg-neutral-800 px-4 py-3 text-white"
      />

      {/* Review text area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full rounded-lg bg-neutral-800 px-4 py-3 text-white"
      />

      {/* Submit review button */}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit review"}
      </Button>
    </form>
  );
}
