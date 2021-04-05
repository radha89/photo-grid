import React from "react";
import moment from "moment";

export const Carousel = (props: any) => {
  const {
    show,
    currentIndex,
    photoList,
    handlePrevious,
    handleNext,
    handleClose
  } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const previewData = photoList[currentIndex];

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="modal-main-close">
          <div onClick={handleClose}>X</div>
        </div>
        {currentIndex !== 0 && (
          <div onClick={handlePrevious} className="modal-main-previous">
            <div>&#60;</div>
          </div>
        )}
        <div className="modal-main-photo">
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
              Created at: {moment(previewData.created_at).format("MMM DD YYYY")}
            </p>
          </div>
        </div>
        {currentIndex !== photoList.length - 1 && (
          <div onClick={handleNext} className="modal-main-next">
            <div>&#62;</div>
          </div>
        )}
      </div>
    </div>
  );
};
