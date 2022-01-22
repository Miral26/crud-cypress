import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deepPurple, green, orange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "../redux/actions";
import { Post, Store } from "../models/redux";
import { useNavigate } from "react-router-dom";
import Loading from "./StyledLoading";
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

const ListPost = () => {
  const clasess = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading } = useSelector((state: Store) => state.post);

  const handleDelete = (id: number) => {
    if (window.confirm("Are You Sure You Want To Delete?")) {
      dispatch(deletePost(id));
    }
  };

  const handleEdit = (post: Post) => {
    dispatch(setPost(post));
    navigate(`posts/edit/${post.id}`);
  };

  if (loading) return <Loading />;
  if (!posts.length) return <></>;
  return (
    <>
      <Box textAlign="center" p={2} className={clasess.stuListColor}>
        <Typography variant="h4">Post List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={clasess.tableHeadCell}>
                ID
              </TableCell>
              <TableCell align="center" className={clasess.tableHeadCell}>
                TITLE
              </TableCell>
              <TableCell align="center" className={clasess.tableHeadCell}>
                BODY
              </TableCell>
              <TableCell align="center" className={clasess.tableHeadCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts &&
              posts.map((post: Post) => {
                return (
                  <TableRow key={post.id}>
                    <TableCell align="center">{post.id}</TableCell>
                    <TableCell align="center">{post.title}</TableCell>
                    <TableCell align="center">{post.body}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(post)}>
                          <EditIcon color="primary"></EditIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(post.id)}>
                          <DeleteIcon color="secondary"></DeleteIcon>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListPost;
