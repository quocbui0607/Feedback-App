import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

function FeedbackModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
  editingFeedback,
}: any) {
  const [format, setFormat] = useState({
    title: "",
    category: "feature",
    status: "planned",
    description: "",
  });

  useEffect(() => {
    if (editingFeedback) {
      setFormat({
        title: editingFeedback.title || "",
        category: editingFeedback.category || "feature",
        status: editingFeedback.status || "planned",
        description: editingFeedback.description || "",
      });
    } else {
      setFormat({
        title: "",
        category: "feature",
        status: "planned",
        description: "",
      });
    }
  }, [editingFeedback, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (editingFeedback) {
      onUpdate && onUpdate({ ...editingFeedback, ...format });
    } else {
      onAdd && onAdd(format);
    }
  };

  const handleDelete = () => {
    if (!editingFeedback) return;
    if (window.confirm("Are you sure to delete this feedback?")) {
      onDelete && onDelete(editingFeedback.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingFeedback ? "Edit Feedback" : "Create New Feedback"}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={24}></X>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Feedback Title
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Add a short, descriptive headline"
              value={format.title}
              onChange={(e) => setFormat({ ...format, title: e.target.value })}
            ></input>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category{" "}
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
            focus:ring-2 focus:ring-blue-500"
              value={format.category}
              onChange={(e) =>
                setFormat({ ...format, category: e.target.value })
              }
            >
              <option value="feature">Feature</option>
              <option value="ui">UI</option>
              <option value="ux">UX</option>
              <option value="enhancement">Enhancement</option>
              <option value="bug">Bug</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Status{" "}
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
            focus:ring-2 focus:ring-blue-500"
              value={format.status}
              onChange={(e) => setFormat({ ...format, status: e.target.value })}
            >
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="live">Live</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Feedback Details{" "}
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
            focus:ring-2 focus:ring-blue-500"
              value={format.description}
              onChange={(e) =>
                setFormat({ ...format, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="flex gap-4">
            {editingFeedback && (
              <button
                className="flex-1 bg-red-600 hover:bg-red-700
            text-white py-3 rounded-lg font-semibold transition-all"
              >
                Delete
              </button>
            )}

            <button
              className="flex-1 bg-gray-600 hover:bg-gray-700
            text-white py-3 rounded-lg font-semibold transition-all"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="flex-1 bg-purple-600 hover:bg-purple-700
            text-white py-3 rounded-lg font-semibold transition-all"
            >
              {editingFeedback ? "Save Changes" : "Add Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
