import React from "react";

const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

function Sidebar({
  filterCategory,
  setFilterCategory,
  openRoadmap,
  openAdd,
  roadmapCounts,
}: any) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 text-white">
        <h1 className="text-xl font-bold mb-1">Frontend Mentor</h1>
        <p className="text-sm opacity-50">Feedback Board</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            return (
              <button
                key={cat}
                className={`p-4 py-2 rounded-lg text-sm font-semibold transition-all
                  ${
                    filterCategory == cat
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-500 hover:bg-blue-100"
                  }`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800">Roadmap</h2>
          <button
            className="text-blue-600 text-sm font-semibold hover:underline"
            onClick={openRoadmap}
          >
            View
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <span className="text-gray-600 text-sm">Planned</span>
            </div>
            <span className="font-bold text-gray-600">
              {roadmapCounts.planned}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-gray-600 text-sm">In-Progress</span>
            </div>
            <span className="font-bold text-gray-600">
              {roadmapCounts.inProgress}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="text-gray-600 text-sm">Live</span>
            </div>
            <span className="font-bold text-gray-600">
              {roadmapCounts.live}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold
          text-sm transition-all"
            onClick={openAdd}
          >
            + Add Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
