import React, { useCallback, useEffect, useState } from "react";
import { unsplashApi } from "../../api/api-connect";
import InfiniteScroll from "react-infinite-scroll-component";

export const PhotoGrid = () => {
  const [photoList, setPhotoList] = useState<any>([]);
  const [counter, setCounter] = useState<number>(1);

  const fetchData = () => {
    unsplashApi.photos.list({ page: counter, perPage: 5 }).then((result) => {
      setCounter(counter + 1);

      console.log("counter", counter);
      console.log("photoList", photoList.length);

      if (result.errors) {
        console.log("error.occurred: ", result.errors[0]);
      } else {
        const feed = result.response;

        const { total, results } = feed;

        console.log(`received ${results.length} photos out of ${total}`);
        console.log("first photo: ", results[0].urls.full);

        setPhotoList(photoList.concat(results));
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="photoGrid">
      <div className="photoGrid-main-container">
        {photoList && photoList.length > 0 && (
          <InfiniteScroll
            className="photoGrid-row"
            dataLength={photoList.length} // This is important field to render the next data
            next={fetchData}
            //  Test with results set of 30 images for prototyping stage
            hasMore={photoList.length < 10} // TODO: Need to set to true before submission?
            loader={<h4>Loading...</h4>}
            endMessage={
              <div>
                <p
                  style={{
                    textAlign: "center"
                  }}
                >
                  <b>Yay! You have seen it all</b>
                </p>
              </div>
            }
          >
            {photoList.map((photo: any, i: number) => {
              return (
                <div className="photoGrid-column" key={i}>
                  <img alt={photo.urls.small} src={photo.urls.small}></img>
                </div>
              );
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
