import React from "react";
import Header from "./Header";
import ImageUploadContent from "./ImageUploadContent";

export default function ImageUpload(props) {
  return (
    <div>
      <Header />
      <ImageUploadContent data={props.location.data} />
    </div>
  );
}
