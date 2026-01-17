import React from "react";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import RoadmapPage from "./pages/RoadmapPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/feedback/:id"
            element={<DetailPage></DetailPage>}
          ></Route>
          <Route
            path="/feedback/:id/edit"
            element={<DetailPage></DetailPage>}
          ></Route>
          <Route path="/roadmap" element={<RoadmapPage></RoadmapPage>}></Route>
          <Route path="/add" element={<HomePage></HomePage>}></Route>

          <Route path="*" element={<HomePage></HomePage>}></Route>
        </Routes>
      </main>
    </div>
  );
}
