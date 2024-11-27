import { CircularProgress, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";
import { getActivities } from "../../../Services/API/ApiBoard/apiBoard";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Activities() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const { idBoard } = useParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    getActivities({ boardId: idBoard, page: page, perPage: 20 })
      .then((res) => {
        setActivities((prevItems) => [...prevItems, ...res.docs]);
        if (res.docs.length === 0) {
          setHasMore(false);
        }
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <Slide in={true} direction="left">
      <div className="flex flex-col">
        {isLoading && (
          <div className="flex justify-center">
            <CircularProgress size={20} />
          </div>
        )}
        <div>
          <InfiniteScroll dataLength={activities.length} next={fetchData} hasMore={hasMore}>
            {activities.map((act, index) => (
              <ActivityItem data={act} key={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </Slide>
  );
}
