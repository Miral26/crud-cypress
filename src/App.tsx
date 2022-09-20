import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddEditPost from "./components/AddEditPost";
import { useSelector } from "react-redux";
import { getAllPosts } from "./redux/actions";
import { Store } from "./models/redux";
import { useDispatch } from "react-redux";
import "./style.css";

const App = () => {
  const { posts } = useSelector((state: Store) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!posts.length) dispatch(getAllPosts());
  }, [dispatch, posts.length]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/add" element={<AddEditPost />} />
        <Route path="/posts/edit/:id" element={<AddEditPost />} />
      </Routes>
    </>
  );
};

export default App;
