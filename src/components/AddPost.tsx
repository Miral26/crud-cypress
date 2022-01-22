import React, { useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { deepPurple, green, orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface PropsTypes {
  title: string;
  body: string;
}

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

const AddPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsTypes>();
  // const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clasess = useStyle();
  // Insert Employees With API

  const onSubmit: SubmitHandler<PropsTypes> = (data) => {
    dispatch(addPost({ title: data.title, body: data.body }));
    navigate("/");
  };
  return (
    <>
      <Grid container px={2} mt={2}>
        <Grid item md={12} xs={12} px={4}>
          <Box textAlign="center" p={2} mb={2} className={clasess.addStuColor}>
            <Typography variant="h4">Add Post</Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  id="title"
                  required
                  autoFocus
                  autoComplete="Tiel"
                  fullWidth
                  {...register("title", { required: "Title is required." })}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Body"
                  id="body"
                  required
                  {...register("body", { required: "Body is required." })}
                  autoComplete="Body"
                  error={Boolean(errors.body)}
                  helperText={errors.body?.message}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="submit" variant="contained" fullWidth>
                Save Post
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

export default AddPost;
