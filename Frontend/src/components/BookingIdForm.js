import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { strings } from "./Localisation";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import getBookingData from "./GetBookingData";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";
import * as constants from "../Constants";

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Trans = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function BookingIdForm(props) {
  const classes = useStyles();
  const [bookingId, setBookingId] = React.useState(props.id);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [direct, setDirect] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setDirect(true);
    }
  }, [data]);

  const serverUnavailable = () => {
    setDialogOpen(true);
    setDialogContent([strings.errorDialogboxContentServerUnavailableText]);
  };

  const bookingIdInvalid = () => {
    setDialogOpen(true);
    setDialogContent([strings.bookingIdPageErrorDialogboxContentInvalidIdText]);
  };

  const goToWelcomePage = result => {
    setData(result);
    setLoading(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    let statusCode = getBookingData(bookingId);
    statusCode.then(function(result) {
      if (result === constants.serverUnavailable) {
        serverUnavailable();
      } else if (result === constants.badRequestStatus) {
        bookingIdInvalid();
      } else {
        goToWelcomePage(result);
      }
    });
  };

  const handleChange = event => {
    if (event.target.value === " ") {
      event.target.value = null;
    }
    setBookingId(event.target.value);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h5" color="primary">
            {strings.confirmYourBookingId}
          </Typography>
        </div>
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress size={60} className={classes.fabProgress} />
          </Backdrop>
        )}
        <ValidatorForm
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextValidator
            variant="outlined"
            required
            fullWidth
            autoComplete="off"
            id="bookingId"
            label={strings.bookingIdTextfieldLabel}
            name="bookingId"
            onChange={handleChange}
            value={bookingId}
            validators={["required"]}
            errorMessages={strings.textValidatorRequiredErrorMessage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {strings.bookingIdConfirmationButton}
          </Button>
        </ValidatorForm>
        <Dialog
          open={dialogOpen}
          TransitionComponent={Trans}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography align="center" variant="h5">
              {strings.errorDialogboxTitle}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography align="center">{dialogContent}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              {strings.bookingIdPageErrorDialogboxButtonText}
            </Button>
          </DialogActions>
        </Dialog>
        {direct && (
          <Redirect
            to={{
              pathname: "/welcome",
              data: data
            }}
          />
        )}
      </div>
    </Container>
  );
}
