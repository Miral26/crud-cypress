import * as types from "../constants/index";
import { Post, PostStore, Props } from "../../models/redux";

const initialState: PostStore = {
  posts: [],
  post: undefined,
  loading: true,
};

const PostReducer = (state = initialState, action: Props) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case types.DELETE_POST: {
      const id = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === id);
      if (postIndex >= 0) {
        state.posts.splice(postIndex, 1);
      }
      return {
        ...state,
        loading: false,
      };
    }

    case types.ADD_POST: {
      const id = state.posts.length + 1;
      const newPost = action.payload as Post;
      return {
        ...state,
        posts: [{ ...newPost, id, userId: 1 }, ...state.posts],
        loading: false,
      };
    }

    case types.UPDATE_POST: {
      const updatedPost = action.payload as Post;
      const postIndex = state.posts.findIndex(
        (post) => post.id === updatedPost.id
      );
      if (postIndex >= 0) {
        state.posts[postIndex] = updatedPost;
      } else {
        state.posts = [{ ...updatedPost }, ...state.posts];
      }
      return {
        ...state,
        loading: false,
      };
    }

    case types.SET_SELECTED_POST:
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
};

export default PostReducer;
