import React, { useEffect, useMemo } from "react";
import DetailView from "../components/DetailView";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addComments,
  deleteSuggestion,
  toggleUpvotes,
  updateSuggestion,
} from "../store/feedbackSlice";
import FeedbackModal from "../components/FeedbackModal";

function DetailPage() {
  const params = useParams();
  const suggestionID = Number(params.id);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const suggestions = useSelector((s: any) => s.feedback.suggestions);
  const comments = useSelector((s: any) => s.feedback.comments);
  const feedback = useMemo(() => {
    return suggestions.find((s: any) => s.id == suggestionID);
  }, [suggestions, suggestionID]);

  useEffect(() => {
    if (!feedback) {
      navigate("/");
    }
  }, [feedback, navigate]);

  const isEditRoute = location.pathname.endsWith("/edit");
  const closeModal = () => navigate(-1);
  const handleUpvote = () => dispatch(toggleUpvotes(feedback.id));
  const handleAddComments = (suggestionID: number, comment: any) => {
    dispatch(addComments({ suggestionID, comment }));
  };

  const handleUpdate = (payload: any) => {
    dispatch(updateSuggestion(payload));
    closeModal();
  };

  const handleDelete = (id: any) => {
    dispatch(deleteSuggestion(id));
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <DetailView
        feedback={feedback}
        comments={comments[feedback.id] || []}
        onBack={() => navigate("/")}
        onUpvote={handleUpvote}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onOpenEdit={() => navigate(`/feedback/${feedback.id}/edit`)}
        onAddComment={handleAddComments}
      ></DetailView>

      <FeedbackModal
        isOpen={isEditRoute}
        onClose={closeModal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        editingFeedback={isEditRoute ? feedback : null}
      ></FeedbackModal>
    </div>
  );
}

export default DetailPage;
