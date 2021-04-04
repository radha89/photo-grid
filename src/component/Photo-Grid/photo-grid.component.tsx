import React, { useRef, useState } from "react";
import { unsplashApi } from "../../api/api-connect";
import InfiniteScroll from "react-infinite-scroll-component";
import { Carousel } from "../Carousel/carousel.component";
import { useMountEffect } from "../../mount-hook";

export const PhotoGrid = () => {
  const [photoList, setPhotoList] = useState<any>([]); // TODO: avoid any type
  const [pageCounter, setPageCounter] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const imageRefs = useRef<any>([]);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
    if (imageRefs) {
      const imageRef = imageRefs.current.find(
        (img: HTMLImageElement) => parseInt(img.id) === currentIndex
      );
      if (imageRef) {
        imageRef.scrollIntoView();
      }
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === photoList.length - 2) {
      fetchPhotos();
    }
  };

  const fetchPhotos = () => {
    unsplashApi.photos
      .list({ page: pageCounter, perPage: 10 })
      .then((result) => {
        setPageCounter(pageCounter + 1);

        if (result.errors) {
          console.log("error.occurred: ", result.errors[0]);
        } else {
          const feed = result.response;

          const { total, results } = feed;

          console.log(`received ${results.length} photos out of ${total}`);
          console.log("first photo: ", results[0].urls.full);

          setPhotoList(photoList.concat(results));
          console.log(pageCounter);
        }
      });
  };

  // TODO: define photo details type
  const fetchPhotoDetails = (photoObj: any) => {
    const index: number = photoList.indexOf(photoObj);
    setCurrentIndex(index);
  };

  useMountEffect(fetchPhotos);

  return (
    <div className="photoGrid">
      <div
        id="scrollableDiv"
        style={{
          height: "540px",
          overflow: "auto"
        }}
        className="photoGrid-main-container"
      >
        {photoList && photoList.length > 0 && (
          <InfiniteScroll
            className="photoGrid-row"
            dataLength={photoList.length}
            next={fetchPhotos}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {photoList.map((photo: any, i: number) => {
              // TODO: define photo type
              return (
                <div
                  className="photoGrid-column"
                  key={i}
                  onClick={() => fetchPhotoDetails(photo)}
                >
                  <img
                    id={`${i}`}
                    ref={(el) => (imageRefs.current[i] = el)}
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
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              ></Carousel>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
