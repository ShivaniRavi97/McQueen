import React from "react";
import Header from "./Header";
import BookingIdForm from "./BookingIdForm";

const HomePage = props => {
  return (
    <div>
      <Header />
      <BookingIdForm id={props.match.params.id} />
    </div>
  );
};

export default HomePage;
