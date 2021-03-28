import React, { useEffect, useState } from "react";
import { unsplashApi } from "../api/api-connect";

export const PhotoGrid = () => {
  const [photoList, setPhotoList] = useState<any>([]);

  useEffect(() => {
    // TODO: will need to supply args programmtically to enable ifinite scroll feature
    unsplashApi.photos.list({}).then((result) => {
      if (result.errors) {
        console.log("error.occurred: ", result.errors[0]);
      } else {
        const feed = result.response;

        const { total, results } = feed;

        console.log(`received ${results.length} photos out of ${total}`);
        console.log("first photo: ", results[0].urls.full);

        setPhotoList(results);
      }
    });
  }, []);

  return (
    <div>
      <h4>Photo Grid</h4>
      {photoList &&
        photoList.length > 0 &&
        // TODO: avoid using type any - possibly write a photo interface
        photoList.map((photo: any, i: number) => {
          return (
            <div key={i}>
              <img alt={photo.urls.small} src={photo.urls.small}></img>
            </div>
          );
        })}
    </div>
  );
};
