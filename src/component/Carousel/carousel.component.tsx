import React from "react";
import moment from "moment";
import { Error } from "../Error/error-component";
import { CarouselProps } from "../../declaration/carousel-props";
import { Photo } from "../../declaration/photo";

export const Carousel = (props: CarouselProps) => {
  const {
    show,
    handlePrevious,
    handleNext,
    handleClose,
    currentIndex,
    photoList
  } = props;
  const showHideClassName: string = show
    ? "modal display-block"
    : "modal display-none";
  const previewData: Photo | any = photoList[currentIndex]
    ? photoList[currentIndex]
    : null;

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="modal-main-close">
          <div onClick={handleClose}>X</div>
        </div>
        <div
          onClick={handlePrevious}
          className={`modal-main-previous${currentIndex === 0 ? "-hide" : ""}`}
        >
          <div>&#60;</div>
        </div>
        <div className="modal-main-photo">
          {previewData ? (
            <>
              <img
                className="modal-main-photo-current"
                src={previewData.urls.regular}
                alt=""
              ></img>
              <div className="modal-main-photo-photoDetails">
                <p>Name: {previewData.user.name}</p>
                <p>Username: {previewData.user.username}</p>
                <p>Likes: {previewData.likes}</p>
                <p>
                  Created at:{" "}
                  {moment(previewData.created_at).format("MMM DD YYYY")}
                </p>
              </div>
            </>
          ) : (
            <Error message={"previewing requested image"} />
          )}
        </div>
        <div
          onClick={handleNext}
          className={`modal-main-next${
            currentIndex === photoList.length - 1 ? "-hide" : ""
          }`}
        >
          <div>&#62;</div>
        </div>
      </div>
    </div>
  );
};
