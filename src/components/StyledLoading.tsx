import React from "react";
import { Box, styled } from "@mui/system";
import { CircularProgress, Stack } from "@mui/material";

const StyledLoading = styled("div")(() => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "25px",
  },
  "& .circleProgress": {
    position: "absolute",

    top: "calc(50% - 25px)",
  },
}));

const Loading = () => {
  return (
    <StyledLoading>
      <Stack>
        <Box>
          <CircularProgress className="circleProgress" />
        </Box>
      </Stack>
    </StyledLoading>
  );
};

export default Loading;
