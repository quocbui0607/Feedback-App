import React from "react";
import FeedbackItem from "./FeedbackItem";

function FeedbackList({
  suggestions,
  filterCategory,
  sortBy,
  onView,
  onUpvotes,
}: any) {
  const filtered = suggestions.filter(
    (e: any) => filterCategory == "All" || e.category == filterCategory
  );

  const sorted = [...filtered].sort((a, b): any => {
    if (sortBy == "most-upvotes") {
      return b.upvotes - a.upvotes;
    } else if (sortBy == "least-upvotes") {
      return a.upvotes - b.upvotes;
    } else if (sortBy == "most-comments") {
      return b.comments - a.comments;
    } else if (sortBy == "least-comments") {
      return a.comments - b.comments;
    }
  });

  if (sortBy.length == 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-gray-500 text-lg">No suggestions found. Add One!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      {sorted.map((e) => (
        <FeedbackItem
          key={e.id}
          suggestions={e}
          onUpvotes={onUpvotes}
          sortBy={sortBy}
          onView={onView}
        ></FeedbackItem>
      ))}
    </div>
  );
}

export default FeedbackList;
