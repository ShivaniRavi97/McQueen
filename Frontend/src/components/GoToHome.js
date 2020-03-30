import React from "react";
import { Link } from "react-router-dom";
import { strings } from "./Localisation";

export default function GoToHome() {
  return (
    <div>
      <h1>{strings.errorGoToHome}</h1>
      <Link to="/bookingid/:id">{strings.homePageLinkText}</Link>
    </div>
  );
}
