import { createSlice } from "@reduxjs/toolkit";
import { initialComments, initialSuggestions } from "../data/initialData";

const initialFeedbacks = {
  suggestions: initialSuggestions,
  comments: initialComments,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialFeedbacks,
  reducers: {
    addSuggestion: (state, action) => {
      const payload = action.payload;
      const newSuggestions = {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        category: payload.category || "feature",
        status: payload.status || "Planned",
        upvotes: 0,
        comments: 0,
        upvoted: false,
      };

      state.suggestions.push(newSuggestions);
    },
    updateSuggestion: (state, action) => {
      const updated = action.payload;
      const idx = state.suggestions.findIndex((s) => s.id === updated.id);
      if (idx == -1) {
        return;
      }

      state.suggestions[idx] = { ...state.suggestions[idx], ...updated };
    },
    deleteSuggestion: (state, action) => {
      const id = action.payload;
      state.suggestions = state.suggestions.filter((s) => s.id != id);

      delete state.comments[id];
    },

    toggleUpvotes: (state, action) => {
      const id = action.payload;
      const item = state.suggestions.find((s) => s.id == id);

      if (item) {
        item.upvoted = !item.upvoted;
        item.upvotes = item.upvoted
          ? item.upvotes + 1
          : Math.max(0, item.upvotes - 1);
      }
    },

    addComments: (state, action) => {
      const { suggestionID, comment } = action.payload;

      if (!state.comments[suggestionID]) {
        state.comments[suggestionID] = [] as any;
      }
      state.comments[suggestionID].push(comment);
    },

    replaceAll: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addSuggestion,
  updateSuggestion,
  deleteSuggestion,
  toggleUpvotes,
  addComments,
  replaceAll,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
