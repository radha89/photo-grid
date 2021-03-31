import React, { useEffect, useState } from "react";

export const PhotoDetails = (props: any) => {
  const {
    show,
    previewData,
    currentIndex,
    photoList,
    previous,
    next,
    handleClose
  } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {currentIndex !== 0 && (
          <div className="modal-previous">
            <button onClick={previous}>Previous</button>
          </div>
        )}
        <div className="modal-photo">
          <img src={previewData.urls.small}></img>
        </div>
        <div className="modal-photo-details">
          <p>
            Description:{" "}
            {previewData.description
              ? previewData.description
              : "A generic photo"}
          </p>
          <p>Name: {previewData.user.name}</p>
          <p>Username: {previewData.user.username}</p>
          <p>Likes: {previewData.likes}</p>
          <p>Created at: {previewData.created_at}</p>
        </div>
        {currentIndex !== photoList.length - 1 && (
          <div className="modal-next">
            <button onClick={next}>Next</button>
          </div>
        )}
        <button onClick={handleClose}>X</button>
      </section>
    </div>
  );
};
