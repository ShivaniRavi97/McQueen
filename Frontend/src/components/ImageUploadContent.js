import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { strings } from "./Localisation";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import uploadImage from "./UploadImage";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import * as constants from "../Constants";
import ImageUploadText from "./ImageUploadText";

const Trans = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
  },
  typo: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

const theme = createMuiTheme();

theme.typography.h4 = {
  fontSize: "1.0rem",
  "@media (min-width:600px)": {
    fontSize: "1.1rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem"
  }
};
theme.typography.h3 = {
  fontSize: "2.0rem",
  "@media (min-width:600px)": {
    fontSize: "2.1rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.1rem"
  }
};
theme.typography.h6 = {
  fontSize: "0.9rem",
  "@media (min-width:600px)": {
    fontSize: "0.9rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.9rem"
  }
};

export default function ImageUploadContent(props) {
  const classes = useStyles();
  const fileInput = React.createRef();
  const [loading, setLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imagetext, setImagetext] = React.useState([strings.noImageSelected]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [direct, setDirect] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const onChangeHandler = event => {
    setSelectedFile(event.target.files[0]);
    setImagetext(event.target.files[0].name);
    setAlert(false);
  };

  const imageUploaded = () => {
    setDialogTitle([strings.imageUploadPageDialogboxTitle]);
    setDialogMessage([strings.imageUploadPageDialogboxContentSuccessText]);
    setDialogOpen(true);
    setLoading(false);
  };

  const imageAlreadyExist = () => {
    setDialogTitle([strings.imageUploadPageDialogboxTitle]);
    setDialogMessage([strings.imageUploadPageDialogboxContentErrorText]);
    setDialogOpen(true);
    setLoading(false);
  };

  const serverUnavailable = () => {
    setDialogTitle([strings.errorDialogboxTitle]);
    setDialogMessage([strings.errorDialogboxContentServerUnavailableText]);
    setDialogOpen(true);
    setLoading(false);
  };

  const onClickHandler = e => {
    e.preventDefault();
    if (selectedFile === null) {
      setAlert(true);
      setTimeout(function() {
        setAlert(false);
      }, 3000);
    } else {
      setLoading(true);
      let bookingId = props.data;
      const data = new FormData();
      data.append("path", selectedFile);
      data.set("id", bookingId);
      let statusCode = uploadImage(data);
      statusCode.then(function(result) {
        if (result === constants.successStatus) {
          imageUploaded();
        } else if (result === constants.alreadyReported) {
          imageAlreadyExist();
        } else if (result === constants.serverUnavailable) {
          serverUnavailable();
        }
      });
    }
  };

  const handleClose = () => {
    if (dialogTitle[0] === strings.errorDialogboxTitle) {
      setDialogOpen(false);
    } else {
      setDialogOpen(false);
      setDirect(true);
    }
  };

  return (
    <div>
      <Container component="main" className={classes.paper} maxWidth="xs">
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress size={60} className={classes.fabProgress} />
          </Backdrop>
        )}
        {!loading && (
          <div>
            <ImageUploadText />
            <form>
              <input
                type="file"
                name="file"
                id="file"
                onChange={onChangeHandler}
                className="inputfile"
                ref={fileInput}
                accept="image/png, image/jpeg"
              />
              <Box
                display="flex"
                p={1}
                bgcolor="background.paper"
                m={1}
                border={0.5}
                borderRadius={4}
                className={classes.submit}
              >
                <label htmlFor="file" className="choose" flexGrow={1}>
                  {strings.imageSelectText}
                </label>
                <ThemeProvider theme={theme}>
                  <Typography
                    component="h1"
                    variant="h4"
                    flexGrow={2}
                    fontWeight="fontWeightRegular"
                    className={classes.typo}
                  >
                    {imagetext}
                  </Typography>
                </ThemeProvider>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onClickHandler}
              >
                {strings.imageUploadButton}
              </Button>
              <Collapse in={alert}>
                <Alert severity="error">{strings.noImageSelectedAlert}</Alert>
              </Collapse>
            </form>
          </div>
        )}
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          TransitionComponent={Trans}
          keepMounted
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography align="center" variant="h5">
              {dialogTitle}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography align="center">{dialogMessage}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              {strings.imageUploadPageDialogboxButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      {direct && (
        <Redirect
          to={{
            pathname: "/upgrade",
            data: props.data
          }}
        />
      )}
    </div>
  );
}
