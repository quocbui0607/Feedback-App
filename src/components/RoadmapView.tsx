import { ArrowLeft, ChevronUp, MessageSquare } from "lucide-react";
import React from "react";

function RoadmapView({ suggestions, onBack, onView, onAdd, onUpvote }: any) {
  const statusCategories = [
    {
      name: "Planned",
      color: "bg-orange-400",
      items: suggestions.filter((s) => s.status === "planned"),
    },
    {
      name: "In-Progress",
      color: "bg-purple-500",
      items: suggestions.filter((s) => s.status === "in-progress"),
    },
    {
      name: "Live",
      color: "bg-cyan-400",
      items: suggestions.filter((s) => s.status === "live"),
    },
  ];
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className="bg-gray-800 rounded-xl p-4 flex items-center
        justify-between mb-6"
      >
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 text-white
            hover:text-gray-300 font-semibold"
            onClick={onBack}
          >
            <ArrowLeft size={20}></ArrowLeft>Go Back
          </button>
          <div className="ml-4">
            <h1 className="text-white font-bold text-xl">Roadmap</h1>
          </div>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white
        px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          onClick={onAdd}
        >
          + Add Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusCategories.map((cat) => {
          return (
            <div>
              <h2 className="font-bold text-gray-800 mb-1">
                {cat.name} ({cat.items.length})
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {cat.name === "Planned" && "Ideas prioritized for research"}{" "}
                {cat.name === "In-Progress" && "Currently begin developed"}{" "}
                {cat.name === "Live" && "Released features"}{" "}
              </p>

              <div className="space-y-4">
                {cat.items.map((item: any) => (
                  <div
                    className="bg-white rounded-xl p-6 border-t-4
                cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => onView(item)}
                  >
                    <div className="mb-2">
                      <div
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${cat.color}`}
                      ></div>
                      <span className="text-gray-600 text-sm">{cat.name}</span>
                    </div>

                    <h3 className="font-bold text-gray-800 text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <span
                      className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-lg
              text-sm font-semibold mb-4"
                    >
                      {item.category}
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                          item.upvoted
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-blue-100 text-gray-800"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpvote && onUpvote(item.id);
                        }}
                      >
                        <ChevronUp size={16}></ChevronUp>
                        <span className="font-bold text-sm">
                          {item.upvotes}
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        <MessageSquare
                          className="text-gray-400"
                          size={18}
                        ></MessageSquare>
                        <span className="font-bold">{item.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapView;
