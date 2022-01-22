import * as types from "../constants/index";
import axios from "axios";
import { Dispatch } from "redux";

import { AddPost, Post, Props } from "../../models/redux";
import { API_URL } from "../../shared/constant";

const getPosts = (posts: Props) => ({
  type: types.GET_POSTS,
  payload: posts,
});

const postDeleted = (id: number) => ({
  type: types.DELETE_POST,
  payload: id,
});

const postAdded = (post: AddPost) => ({
  type: types.ADD_POST,
  payload: post,
});

const postUpdated = (post: Post) => ({
  type: types.UPDATE_POST,
  payload: post,
});

const setSelectedPost = (post: Post) => ({
  type: types.SET_SELECTED_POST,
  payload: post,
});

export const getAllPosts = () => {
  return async function (dispatch: Dispatch) {
    const result = await axios
      .get(`${API_URL}/posts`)
      .then((response) => response.data)
      .catch(() => []);
    dispatch(getPosts(result));
  };
};

export const deletePost = (id: number) => {
  return async function (dispatch: Dispatch) {
    await axios.delete(`${API_URL}/posts/${id}`).catch(() => undefined);
    dispatch(postDeleted(id));
  };
};

export const addPost = (post: AddPost) => {
  return async function (dispatch: Dispatch) {
    await axios.post(`${API_URL}/posts`, post).catch(() => undefined);
    dispatch(postAdded(post));
  };
};

export const getPostById = (id: number) => {
  return async function (dispatch: Dispatch) {
    const result = await axios
      .get(`${API_URL}/posts/${id}`)
      .then((response) => response.data)
      .catch(() => undefined);
    dispatch(setSelectedPost(result));
  };
};

export const updatePost = (id: number, post: Post) => {
  return async function (dispatch: Dispatch) {
    await axios.put(`${API_URL}/posts/${id}`).catch(() => undefined);
    dispatch(postUpdated(post));
  };
};

export const setPost = (post: Post) => {
  return async function (dispatch: Dispatch) {
    dispatch(setSelectedPost(post));
  };
};
