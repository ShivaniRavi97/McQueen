import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import * as constants from "../Constants";
import Header from "./Header";
import Button from "@material-ui/core/Button";
import uploadAddons from "./UploadAddons";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";
import { strings } from "./Localisation";
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  submit: {
    margin: theme.spacing(1, 0, 0)
  }
}));

let total = 0;

export default function Upgrade(props) {
  const classes = useStyles();
  const [amount, setAmount] = React.useState(0);
  const [masterChecked, setMasterChecked] = React.useState(false);
  const [juniorChecked, setJuniorChecked] = React.useState(false);
  const [kingChecked, setKingChecked] = React.useState(false);
  const [direct, setDirect] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const goToQrCodePage = () => {
    setLoading(false);
    setDirect(true);
  };

  const serverUnavailable = () => {
    setLoading(false);
    setDialogContent(strings.errorDialogboxContentServerUnavailableText);
    setDialogOpen(true);
  };

  const handleFinish = e => {
    e.preventDefault();
    setLoading(true);
    const bookingId = props.location.data;
    let statusCode = uploadAddons(bookingId, amount);
    statusCode.then(function(result) {
      if (result === constants.successStatus) {
        goToQrCodePage();
      } else if (result === constants.serverUnavailable) {
        serverUnavailable();
      }
    });
  };

  const handleChange = e => {
    if (e.target.id === constants.masterSuite) {
      setMasterChecked(!masterChecked);
      total = 0;
      setJuniorChecked(false);
      setKingChecked(false);
      if (!masterChecked) {
        total = total + 5000;
      } else if (masterChecked) {
        total = 0;
      }
    } else if (e.target.id === constants.QueenExecutive) {
      setJuniorChecked(!juniorChecked);
      total = 0;
      setMasterChecked(false);
      setKingChecked(false);
      if (!juniorChecked) {
        total = total + 3000;
      } else if (juniorChecked) {
        total = 0;
      }
    } else if (e.target.id === constants.kingExecutive) {
      setKingChecked(!kingChecked);
      total = 0;
      setMasterChecked(false);
      setJuniorChecked(false);
      if (!kingChecked) {
        total = total + 3500;
      } else if (kingChecked) {
        total = 0;
      }
    }
    setAmount(total);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Header />
      <div className={classes.root}>
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress size={60} className={classes.fabProgress} />
          </Backdrop>
        )}
        <Typography
          variant="h5"
          className={classes.title}
          color="primary"
          align="center"
        >
          {strings.upgradeTitle}
        </Typography>
      </div>

      <Container width="75%">
        <Divider />
        <List>
          <ListItem>
            <ListItemText
              primary={strings.masterSuitePrimaryText}
              secondary={strings.masterSuiteSecondaryText}
            />
            <Switch
              checked={masterChecked}
              color="primary"
              id="masterSuite"
              onClick={handleChange}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText
              primary={strings.kingExecutivePrimaryText}
              secondary={strings.kingExecutiveSecondaryText}
            />
            <Switch
              checked={kingChecked}
              color="primary"
              id="kingExecutive"
              onClick={handleChange}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText
              primary={strings.queenExecutivePrimaryText}
              secondary={strings.queenExecutiveSecondaryText}
            />
            <Switch
              checked={juniorChecked}
              color="primary"
              id="queenExecutive"
              onClick={handleChange}
            />
          </ListItem>
        </List>
        <Divider />
      </Container>

      <Container component="main" maxWidth="xs">
        <div className={classes.submit}>
          <Typography variant="h5" color="primary" align="center">
            {strings.totalAmount}
            {amount}
          </Typography>
        </div>
        <div className={classes.submit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFinish}
          >
            {strings.upgradeFinishButton}
          </Button>
        </div>
      </Container>
      <Dialog
        open={dialogOpen}
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
            pathname: "/qrcode",
            data: props.location.data
          }}
        />
      )}
    </div>
  );
}
