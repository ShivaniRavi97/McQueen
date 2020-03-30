import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import WelcomeContent from "./WelcomeContent";
import GoToHome from "./GoToHome";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8)
  }
}));

export default function Welcome(props) {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {props.location.data && <WelcomeContent data={props.location.data} />}
          {!props.location.data && <GoToHome />}
        </div>
      </Container>
    </div>
  );
}
