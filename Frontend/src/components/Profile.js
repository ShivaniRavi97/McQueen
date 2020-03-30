import React from "react";
import Header from "./Header";

export default function Profile(props) {
  return (
    <div>
      <Header />
      {props.location.data}
    </div>
  );
}
