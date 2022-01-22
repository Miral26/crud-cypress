import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import { useSelector } from "react-redux";
import { getAllPosts } from "./redux/actions";
import { Store } from "./models/redux";
import { useDispatch } from "react-redux";

const App = () => {
  const { posts } = useSelector((state: Store) => state.post);
  const dispatch = useDispatch();
  if (!posts.length) dispatch(getAllPosts());
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/add" element={<AddPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
      </Routes>
    </>
  );
};

export default App;
