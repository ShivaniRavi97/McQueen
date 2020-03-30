import React from "react";
import AdminHeader from "./AdminHeader";
import QrReader from "react-qr-reader";
import Container from "@material-ui/core/Container";
import { strings } from "./Localisation";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5)
  },
  scanner: {
    marginTop: theme.spacing(5)
  }
}));

export default function QrScanner() {
  const classes = useStyles();
  const [result, setResult] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [direct, setDirect] = React.useState(false);
  const [value, setValue] = React.useState();
  const [scan, setScan] = React.useState(false);

  const handleScan = data => {
    const dataSubstring = JSON.stringify(data).substring(1, 3);
    const bookingIdIdentifier = "MQ";
    setResult(true);

    if (data) {
      if (dataSubstring === bookingIdIdentifier) {
        setValue(data);
        setAlert(false);
        setDirect(true);
      } else {
        setAlert(true);
        setResult(false);
      }
    } else {
      setAlert(false);
    }
  };

  const handleError = err => {
    setOpen(true);
    setResult(false);
  };

  const showScanner = event => {
    setScan(true);
  };

  return (
    <div>
      <AdminHeader />
      <div className={classes.paper}>
        <Container component="main" maxWidth="xs">
          <Typography variant="h6" align="center">
            {strings.scanToVerify}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={showScanner}
            fullWidth
          >
            {strings.scan}
          </Button>
          {scan && (
            <div className={classes.scanner}>
              <QrReader
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              {result && <p align="center">{strings.startScan}</p>}
              {open && <Alert severity="error">{strings.camDenied}</Alert>}
              {alert && (
                <Alert severity="error">{strings.unrecognisedQrCode}</Alert>
              )}
            </div>
          )}
          {direct && <Redirect to={{ pathname: "/profile", data: value }} />}
        </Container>
      </div>
    </div>
  );
}
