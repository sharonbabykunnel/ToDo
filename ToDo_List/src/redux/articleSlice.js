import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    addMoreArticle: (state, action) => {
      state.articles = [action.payload,...state.articles];
    },
    updateArticle: (state, action) => {
      console.log(action.payload)
      state.articles = state.articles.map(article => article._id === action.payload._id ? action.payload : article);
    },
    updateArticleLike: (state, action) => {
      const { userId, isLiked, index } = action.payload;
      const article = state.articles[index];
      if (article) {
        if (isLiked) {
          article.likes = article.likes.filter((id) => id != userId);
        } else {
          article.likes.push(userId);
        }
      }
    },
    unsetArticle: (state, action) => {
      state.articles = [];
    },
    removeArticle: (state, action) => {
      console.log(action.payload)
      state.articles = state.articles.filter((ele) => ele._id !== action.payload._id);
    },
  },
});

export const {
  setArticles,
  addMoreArticle,
  updateArticleLike,
  updateArticle,
  unsetArticle,
  removeArticle,
} = articleSlice.actions;

export default articleSlice.reducer