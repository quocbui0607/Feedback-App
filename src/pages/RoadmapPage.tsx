import React from "react";
import RoadmapView from "../components/RoadmapView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleUpvotes } from "../store/feedbackSlice";

function RoadmapPage() {
  const suggestions = useSelector((s: any) => s.feedback.suggestions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpvote = (id: number) => dispatch(toggleUpvotes(id));
  const handleView = (item: any) => {
    navigate(`/feedback/${item.id}`);
  };
  const openAdd = () => navigate("/add");

  return (
    <div className="max-w-6xl mx-auto">
      <RoadmapView
        suggestions={suggestions}
        onBack={() => navigate("/add")}
        onView={handleView}
        onAdd={openAdd}
        onUpvote={handleUpvote}
      ></RoadmapView>
    </div>
  );
}

export default RoadmapPage;
