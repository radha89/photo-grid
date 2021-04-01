import React, { useEffect, useState } from "react";
import { unsplashApi } from "../../api/api-connect";
import InfiniteScroll from "react-infinite-scroll-component";
import { Carousel } from "../Carousel/carousel.component";

export const PhotoGrid = () => {
  const [photoList, setPhotoList] = useState<any>([]); // TODO: avoid any type
  const [counter, setCounter] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  const previous = () => setCurrentIndex(currentIndex - 1);

  const next = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === photoList.length - 2) {
      fetchPhotos();
    }
  };

  const fetchPhotos = () => {
    unsplashApi.photos.list({ page: counter, perPage: 10 }).then((result) => {
      setCounter(counter + 1);

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

  // TODO: define photo details type
  const fetchPhotoDetails = (photoObj: any) => {
    console.log(photoObj);
    const index: number = photoList.indexOf(photoObj);
    setCurrentIndex(index);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="photoGrid">
      <div className="photoGrid-main-container">
        {photoList && photoList.length > 0 && (
          <InfiniteScroll
            className="photoGrid-row"
            dataLength={photoList.length} // This is important field to render the next data
            next={fetchPhotos}
            //  Test with results set of 30 images for prototyping stage
            hasMore={photoList.length < 100} // TODO: Need to set to true before submission?
            loader={<h4>Loading...</h4>}
            // TODO: evaluate if this is necessary
            // endMessage={
            //   <div>
            //     <p
            //       style={{
            //         textAlign: "center"
            //       }}
            //     >
            //       <b>Yay! You have seen it all</b>
            //     </p>
            //   </div>
            // }
          >
            {photoList.map((photo: any, i: number) => {
              return (
                <div
                  className="photoGrid-column"
                  key={i}
                  onClick={() => fetchPhotoDetails(photo)}
                >
                  <img
                    alt={photo.urls.small}
                    src={photo.urls.small}
                    onClick={showModal}
                  ></img>
                </div>
              );
            })}
            {isOpen && (
              <Carousel
                show={isOpen}
                currentIndex={currentIndex}
                photoList={photoList}
                handleClose={hideModal}
                previous={previous}
                next={next}
              ></Carousel>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
