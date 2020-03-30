import React from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { strings } from "./Localisation";
import postAcceptTerms from "./PostAcceptTerms";
import { Redirect } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as constants from "../Constants";

const useStyles = makeStyles(theme => ({
  checkbox: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function CheckboxForm(props) {
  const classes = useStyles();
  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [direct, setDirect] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const goToImageUploadPage = () => {
    setDirect(true);
    setLoading(false);
  };

  const acceptTerms = e => {
    e.preventDefault();
    let bookingId = props.data.bookingid;
    setLoading(true);
    let statusCode = postAcceptTerms(bookingId);
    statusCode.then(function(result) {
      if (result === constants.successStatus) {
        goToImageUploadPage();
      }
    });
  };

  const handleCheckboxChange = () => {
    setButtonDisable(!buttonDisable);
  };

  return (
    <div>
      <form className={classes.checkbox} noValidate>
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress size={60} className={classes.fabProgress} />
          </Backdrop>
        )}
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              onChange={handleCheckboxChange}
            />
          }
          label={strings.termsAndConditionsPageCheckboxLabel}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={acceptTerms}
          disabled={buttonDisable}
        >
          {strings.termsAndConditionsPageNextButton}
        </Button>
      </form>
      {direct && (
        <Redirect
          to={{
            pathname: "/imageupload",
            data: props.data.bookingid
          }}
        />
      )}
    </div>
  );
}
