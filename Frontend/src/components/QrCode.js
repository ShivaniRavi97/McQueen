import React from "react";
import { QRCode } from "react-qrcode-logo";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { strings } from "./Localisation";

const useStyles = makeStyles(theme => ({
  code: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  head: {
    marginTop: theme.spacing(4)
  }
}));

export default function QrCode(props) {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.head}>
          <Typography variant="h5" align="center">
            {strings.thanksForSubmittingDocument}
          </Typography>
          <Typography variant="h6" align="center">
            {strings.roomAssignText}
          </Typography>
        </div>
        <div className={classes.code}>
          <QRCode
            value={props.location.data}
            qrStyle="dots"
            size={250}
            fgColor="#115293"
            logoImage="/images/circleAvatar.png"
            logoWidth={55}
          />
        </div>
        <Typography variant="h6" align="center">
          {strings.showQrCodeToReceptionist}
        </Typography>
      </Container>
    </div>
  );
}
