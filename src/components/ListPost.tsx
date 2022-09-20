import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Tooltip,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { deepPurple, green, orange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost, updatePost } from "../redux/actions";
import { Post, Store } from "../models/redux";
import { useNavigate } from "react-router-dom";
import Loading from "./StyledLoading";
import { SubmitHandler, useForm } from "react-hook-form";

const tableColumns = ["Id", "Title", "Body", "Action"];

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

interface FormProps {
  title: string;
  body: string;
}

const ListPost = () => {
  const clasess = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const { posts, loading } = useSelector((state: Store) => state.post);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deletePost(id));
    }
  };

  const handleEdit = (post: Post) => {
    dispatch(setPost(post));
    navigate(`posts/edit/${post.id}`);
  };

  if (loading) return <Loading />;
  if (!posts.length) return <></>;

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    if (selectedPost && selectedPost.id)
      dispatch(
        updatePost(selectedPost?.id, {
          ...selectedPost,
          title: data.title,
          body: data.body,
        })
      );
    setSelectedPost(undefined);
  };

  return (
    <>
      <Container maxWidth="lg">
        <TableContainer className="main-data-table" component={Paper}>
          <form className="main-form">
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#001E3C" }}>
                  {tableColumns.map((column) => (
                    <TableCell className={clasess.tableHeadCell} key={column}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {posts &&
                  posts.map((post: Post) => {
                    return (
                      <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell>
                          {selectedPost && selectedPost.id === post.id ? (
                            <TextField
                              id="title"
                              required
                              autoFocus
                              autoComplete="Title"
                              {...register("title", {
                                required: "Title is required.",
                                value: selectedPost?.title,
                              })}
                              error={Boolean(errors.title)}
                              helperText={errors.title?.message}
                            />
                          ) : (
                            post.title
                          )}
                        </TableCell>

                        <TableCell>
                          {selectedPost && selectedPost.id === post.id ? (
                            <TextField
                              label="Body"
                              id="body"
                              required
                              {...register("body", {
                                value: post.body,
                                required: "Body is required.",
                                maxLength: {
                                  message:
                                    "Body text can not be more than 50 characters.",
                                  value: 50,
                                },
                              })}
                              autoComplete="Body"
                              error={Boolean(errors.body)}
                              helperText={errors.body?.message}
                            />
                          ) : (
                            post.title
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(post)}>
                              <EditIcon color="primary"></EditIcon>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Inline Edit">
                            <IconButton
                              onClick={() => {
                                setSelectedPost(
                                  selectedPost ? undefined : post
                                );
                              }}
                            >
                              <EditIcon color="warning"></EditIcon>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(post.id)}>
                              <DeleteIcon color="error"></DeleteIcon>
                            </IconButton>
                          </Tooltip>
                          {selectedPost && (
                            <Tooltip title="Save">
                              <IconButton onClick={handleSubmit(onSubmit)}>
                                <SaveIcon color="success"></SaveIcon>
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </form>
        </TableContainer>
      </Container>
    </>
  );
};

export default ListPost;
