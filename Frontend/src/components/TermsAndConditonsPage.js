import React from "react";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import TermsAndConditionContent from "./TermsAndConditionContent";
import CheckboxForm from "./CheckboxForm";

export default function TermsAndConditionsPage(props) {
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="sm">
        <TermsAndConditionContent />
        <CheckboxForm data={props.location.data} />
      </Container>
    </div>
  );
}
