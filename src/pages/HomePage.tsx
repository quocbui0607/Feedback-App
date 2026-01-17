import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import FeedbackList from "../components/FeedbackList";
import FeedbackModal from "../components/FeedbackModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addSuggestion, toggleUpvotes } from "../store/feedbackSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = useSelector((state: any) => state.feedback.suggestions);

  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Upvotes");

  const modelOpen = location.pathname == "/add";

  const roadmapCounts = useMemo(
    () => ({
      planned: suggestions.filter((s: any) => s.status == "planned").length,
      inProgress: suggestions.filter((s: any) => s.status == "in-progress")
        .length,
      live: suggestions.filter((s: any) => s.status == "live").length,
    }),
    suggestions
  );

  const openAdd = () => navigate("/add");
  const closeModel = () => navigate(-1);

  const handleAdd = (payload: any) => {
    dispatch(addSuggestion(payload));
    closeModel();
  };

  const handleUpvotes = (id: any) => dispatch(toggleUpvotes(id));
  const handleView = (item: any) => {
    navigate(`/feedback/${item.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          roadmapCounts={roadmapCounts}
          openRoadmap={() => navigate("/roadmap")}
          openAdd={openAdd}
        ></Sidebar>

        <div className="lg:col-span-3 space-y-6">
          <div
            className="bg-gray-800 rounded-xl p-4 flex flex-col sm:flex-row
            items-start sm:item-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-white font-bold">
                {suggestions.length} Suggestions{" "}
              </span>
              <div className="flex item-center gap-2">
                <span className="text-gray-300 text-sm">Sort by:</span>
                <select
                  className="bg-transparent text-gray-400 font-semibold text-sm border-none outline-none
                  cursor-pointer"
                  name=""
                  id=""
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value={"most-upvotes"}>Most Upvotes</option>
                  <option value={"least-upvotes"}>Least Upvotes</option>
                  <option value={"most-comments"}>Most Comments</option>
                  <option value={"least-comments"}>Least Comments</option>
                </select>
              </div>
            </div>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2
            rounded-lg font-semibold text-sm transition-all whitespace-normal"
              onClick={openAdd}
            >
              + Add Feedback
            </button>
          </div>

          <FeedbackList
            suggestions={suggestions}
            filterCategory={filterCategory}
            sortBy={sortBy}
            onView={handleView}
            onUpvotes={handleUpvotes}
          ></FeedbackList>
        </div>
      </div>

      <FeedbackModal
        isOpen={modelOpen}
        onClose={closeModel}
        onAdd={handleAdd}
        editingFeedback={null}
      ></FeedbackModal>
    </div>
  );
}
