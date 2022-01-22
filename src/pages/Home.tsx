import React, { Suspense } from "react";
import Loading from "../components/StyledLoading";

const Home = () => {
  const ListPost = React.lazy(() => import("../components/ListPost"));
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ListPost />
      </Suspense>
    </div>
  );
};

export default Home;
