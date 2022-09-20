import React from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  onSubmit: SubmitHandler<FormProps>;
  submitButtonText?: string;
  title?: string;
  body?: string;
}

interface FormProps {
  title: string;
  body: string;
}

const PostForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();
  const navigate = useNavigate();

  return (
    <form className="main-form" onSubmit={handleSubmit(props.onSubmit)}>
      <Box className="main-data-input">
        <TextField
          label="Title"
          id="title"
          required
          autoFocus
          autoComplete="Title"
          {...register("title", {
            required: "Title is required.",
            value: props.title,
          })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />
        <TextField
          label="Body"
          id="body"
          required
          {...register("body", {
            value: props.body,
            required: "Body is required.",
            maxLength: {
              message: "Body text can not be more than 50 characters.",
              value: 50,
            },
          })}
          autoComplete="Body"
          error={Boolean(errors.body)}
          helperText={errors.body?.message}
        />
      </Box>
      <Box className="main-data-button">
        <Button size="large" type="submit" color="success" variant="contained">
          {props.submitButtonText || "Save Post"}
        </Button>
        <Button
          size="large"
          type="button"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Back To Home
        </Button>
      </Box>
    </form>
  );
};

export default PostForm;
