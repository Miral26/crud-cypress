import React, { memo, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPostById, updatePost } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Post, Store } from "../models/redux";
import PostForm from "./PostForm";
import { SubmitHandler } from "react-hook-form";

interface PropsTypes {
  title: string;
  body: string;
}

const AddEditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams() as { id: number | undefined };

  const [post, setPost] = useState<Post | undefined>(undefined);

  const storePost = useSelector((state: Store) => state.post.post);

  useEffect(() => {
    if (storePost) setPost({ ...storePost });
    else if (id) dispatch(getPostById(id));
  }, [storePost, id, dispatch]);

  const onSubmit: SubmitHandler<PropsTypes> = (data) => {
    if (id && post)
      dispatch(updatePost(id, { ...post, title: data.title, body: data.body }));
    else dispatch(addPost({ title: data.title, body: data.body }));
    navigate("/");
  };

  return (
    <>
      <Container maxWidth="lg" className="main-container">
        <PostForm
          title={post?.title}
          body={post?.body}
          onSubmit={onSubmit}
          submitButtonText={id ? "Update" : "Add"}
        />
      </Container>
    </>
  );
};

export default memo(AddEditPost);
