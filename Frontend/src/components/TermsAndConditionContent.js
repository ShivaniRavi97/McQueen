import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { strings } from "./Localisation";
import { terms } from "./TermsContentArray";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column"
  },
  terms: {
    marginTop: theme.spacing(3)
  },
  alignTerms: {
    display: "flex",
    flexDirection: "row"
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

export default function TermsAndConditionsContent() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h3"
          fontWeight={1000}
          align="center"
          color="primary"
        >
          {strings.termsAndConditionsPageHeadingText}
        </Typography>
        <div className={classes.terms}>
          {terms.map(value => (
            <div key={value + "div"} className={classes.alignTerms}>
              <ArrowRightIcon
                key={value + "icon"}
                fontSize="small"
                color="primary"
              />
              <Typography key={value} component="h5" variant="h4">
                {value}
              </Typography>
            </div>
          ))}
        </div>
      </ThemeProvider>
    </div>
  );
}
