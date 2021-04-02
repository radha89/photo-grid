import React, { useEffect, useRef } from "react";
import moment from "moment";

export const Carousel = (props: any) => {
  const { show, currentIndex, photoList, previous, next, handleClose } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const previewData = photoList[currentIndex];

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        {currentIndex !== 0 && (
          <div className="modal-main-previous">
            <div onClick={previous}>&#60;</div>
          </div>
        )}
        {currentIndex !== photoList.length - 1 && (
          <div className="modal-main-next">
            <div onClick={next}>&#62;</div>
          </div>
        )}
        <div className="modal-main-close">
          <p>X</p>
        </div>

        <div className="modal-main-photo">
          <img
            className="modal-main-photo-current"
            src={previewData.urls.regular}
            alt=""
          ></img>
        </div>
        <div className="modal-main-photoDetails">
          <p>Name: {previewData.user.name}</p>
          <p>Username: {previewData.user.username}</p>
          <p>Likes: {previewData.likes}</p>
          <p>
            Created at: {moment(previewData.created_at).format("MMM DD YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};
