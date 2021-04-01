import React from "react";

export const Carousel = (props: any) => {
  const { show, currentIndex, photoList, previous, next, handleClose } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const previewData = photoList[currentIndex];

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {currentIndex !== 0 && (
          <div className="modal-main-previous">
            <button onClick={previous}>Previous</button>
          </div>
        )}
        <div className="modal-main-group">
          {currentIndex > 0 && (
            <div className="modal-main-photo" onClick={previous}>
              <img
                className="modal-main-photo-previous"
                src={photoList[currentIndex - 1].urls.thumb}
                alt=""
              ></img>
            </div>
          )}
          <div className="modal-main-photo">
            <img
              className="modal-main-photo-current"
              src={previewData.urls.small}
              alt=""
            ></img>
          </div>
          {currentIndex < photoList.length - 1 && (
            <div className="modal-main-photo" onClick={next}>
              <img
                className="modal-main-photo-next"
                src={photoList[currentIndex + 1].urls.thumb}
                alt=""
              ></img>
            </div>
          )}
        </div>
        <div className="modal-main-photoDetails">
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
          <div className="modal-main-next">
            <button onClick={next}>Next</button>
          </div>
        )}
        <button onClick={handleClose}>X</button>
      </section>
    </div>
  );
};
