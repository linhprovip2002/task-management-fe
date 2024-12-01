import { CircularProgress, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { getActivities } from "../../../Services/API/ApiBoard/apiBoard";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const { idBoard } = useParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    getActivities({ boardId: idBoard, page: page, perPage: 20 })
      .then((res) => {
        setActivities((prevItems) => [...prevItems, ...res.docs]);
        if (res.docs.length === 0) {
          setHasMore(false);
        }
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    hasMore && fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <Slide in={true} direction="left">
      <div className="flex flex-col  overflow-y-scroll overflow-x-hidden">
        <InfiniteScroll
          scrollThreshold={"100px"}
          dataLength={activities.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center">
              <CircularProgress size={20} />
            </div>
          }
        >
          {activities.map((act, index) => (
            <ActivityItem data={act} key={index} />
          ))}
        </InfiniteScroll>
      </div>
    </Slide>
  );
}
