import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { strings } from "./Localisation";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import date from "./Date";

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: "2.0rem",
  "@media (min-width:600px)": {
    fontSize: "2.5rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem"
  }
};
theme.typography.h4 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.3rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.7rem"
  }
};

export default function WelcomeContent(props) {
  const classes = useStyles();
  const [direct, setdirect] = React.useState(false);
  const [name, setname] = React.useState("");
  const [checkinDate, setcheckinDate] = React.useState(null);
  const [checkoutDate, setcheckoutDate] = React.useState(null);

  React.useEffect(() => {
    if (props.data) {
      setname(props.data.name);
      const checkin = props.data.checkin;
      setcheckinDate(date(checkin));
      const checkout = props.data.checkout;
      setcheckoutDate(date(checkout));
    }
  }, [props.data]);

  const handleNext = () => {
    setdirect(true);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography align="center" variant="h3" color="primary">
          {strings.welcomeText} {name}!
        </Typography>
        <div className={classes.content}>
          <Typography align="center" variant="h4">
            {strings.thankYouMessage}
          </Typography>
          <Typography align="center" variant="h4">
            {strings.checkinTimeMessage} {checkinDate}
          </Typography>
          <Typography align="center" variant="h4">
            {strings.checkoutTimeMessage} {checkoutDate}
          </Typography>
        </div>
      </ThemeProvider>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleNext}
      >
        {strings.welcomePageNextButton}
      </Button>
      {direct && (
        <Redirect
          to={{
            pathname: "/terms-and-conditions",
            data: props.data
          }}
        />
      )}
    </div>
  );
}
