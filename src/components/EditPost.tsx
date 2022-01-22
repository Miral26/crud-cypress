import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { deepPurple, green, orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePost } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Post, Store } from "../models/redux";

const useStyle = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clasess = useStyle();
  const { id }: any = useParams();

  const [post, setPost] = useState<Post | undefined>(undefined);

  const storePost = useSelector((state: Store) => state.post.post);

  useEffect(() => {
    if (storePost) setPost({ ...storePost });
    else dispatch(getPostById(id));
  }, [storePost, id, dispatch]);

  if (!post) return <div></div>;

  function GetDatafromField(e: React.ChangeEvent<HTMLInputElement>) {
    if (post)
      setPost({
        ...post,
        [e.target.name]: e.target.value,
      });
  }

  const OnFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePost(id, post));
    navigate("/");
  };

  return (
    <>
      <Grid container px={2} mt={2}>
        <Grid item md={12} xs={12} px={4}>
          <Box textAlign="center" p={2} mb={2} className={clasess.addStuColor}>
            <Typography variant="h4">Update Post</Typography>
          </Box>
          <form noValidate onSubmit={OnFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  id="title"
                  required
                  autoFocus
                  name="title"
                  value={post.title}
                  autoComplete="Tiel"
                  fullWidth
                  onChange={GetDatafromField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Body"
                  id="body"
                  required
                  autoFocus
                  name="body"
                  value={post.body}
                  autoComplete="Body"
                  onChange={GetDatafromField}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="submit" variant="contained" fullWidth>
                Update Post
              </Button>
            </Box>
            <Box m={3}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={() => navigate("/")}
              >
                Back To Home
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditPost;
