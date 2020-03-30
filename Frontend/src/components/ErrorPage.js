import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { strings } from "./Localisation";

const ErrorPage = () => (
  <div>
    <Header />
    <h1>{strings.pageNotFound}</h1>
    <Link to="/bookingid/:id">{strings.homePageLinkText}</Link>
  </div>
);
export default ErrorPage;
