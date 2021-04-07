import React, { useRef, useState } from "react";
import { unsplashApi } from "../../api/api-connect";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImageSlider } from "../Image-Slider/image-slider.component";
import { useMountEffect } from "../../mount-hook";
import { Loader } from "../Loader/loader-component";
import { Error } from "../Error/error-component";
import { Photo } from "../../declaration/photo";

export const PhotoGrid = () => {
  const [photoList, setPhotoList] = useState<any[]>([]);
  const [pageCounter, setPageCounter] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const imageRefs = useRef<any>([]);

  // Open slider and set current position when image is selected
  const showImageSlider = (index: number) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Hide slider
  const hideImageSlider = () => {
    setIsOpen(false);

    // find current image position with element id from grid
    if (imageRefs) {
      const imageRef: HTMLImageElement | null = imageRefs.current.find(
        (img: HTMLImageElement) => parseInt(img.id) === currentIndex
      );

      // scroll to matching element in grid
      if (imageRef) {
        imageRef.scrollIntoView();
      }
    }
  };

  // Decrement current position and navigate to previous image
  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  // Increment current position and nevigate to next image
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);

    // Fetch more photos when approaching end of photoList
    if (currentIndex === photoList.length - 2) {
      fetchPhotos();
    }
  };

  // Call to Unsplash api
  const fetchPhotos = () => {
    unsplashApi.photos
      .list({ page: pageCounter, perPage: 11 })
      .then((result) => {
        setPageCounter(pageCounter + 1);

        if (result.errors) {
          console.log("error.occurred: ", result.errors[0]);
        } else {
          const feed = result.response;
          const { results } = feed;

          setPhotoList(photoList.concat(results));
        }
      });
  };

  // Fetch photos on mount
  useMountEffect(fetchPhotos);

  return (
    <div className="photoGrid">
      <div
        id="scrollableDiv"
        style={{
          height: "76vh",
          overflow: "auto"
        }}
        className="photoGrid-main-container"
      >
        {photoList && photoList.length > 0 ? (
          <InfiniteScroll
            className="photoGrid-wrapper"
            dataLength={photoList.length}
            next={fetchPhotos}
            hasMore={photoList.length < 1000}
            loader={<Loader />}
            scrollableTarget="scrollableDiv"
          >
            {photoList.map((photo: Photo, i: number) => {
              return (
                <div className="photoGrid-content" key={i}>
                  <img
                    id={`${i}`}
                    ref={(el: HTMLImageElement) => (imageRefs.current[i] = el)}
                    alt={photo.urls.small}
                    src={photo.urls.small}
                    onClick={showImageSlider(i)}
                  ></img>
                </div>
              );
            })}
            {isOpen && (
              <ImageSlider
                currentIndex={currentIndex}
                photoList={photoList}
                show={isOpen}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                handleClose={hideImageSlider}
              ></ImageSlider>
            )}
          </InfiniteScroll>
        ) : (
          <Error message={"loading images"} />
        )}
      </div>
    </div>
  );
};
