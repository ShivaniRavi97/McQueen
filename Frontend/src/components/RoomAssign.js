import React from "react";
import AdminHeader from "./AdminHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { strings } from "./Localisation";
import axios from "axios";
import { baseUrl } from "../BaseUrl";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5)
  },
  additional: {
    marginTop: theme.spacing(5)
  }
}));

export default function WelcomeReception(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const profileUrl = baseUrl + "displaycost";

  const costRetrieval = () => {
    let bookingId = props.location.data;
    axios
      .post(profileUrl, {
        id: bookingId
      })
      .then(res => {
        setValue(res.data[0].amount);
        console.log(res.data[0].amount);
      });
  };

  return (
    <div>
      <AdminHeader />
      {props.location.data && (
        <div className={classes.paper}>
          <Typography variant="h4" align="center">
            {strings.confirmCheckIn}
          </Typography>
          <Typography align="center" variant="h6">
            {strings.roomAssign}
          </Typography>
          <Typography variant="h1" align="center">
            {strings.roomNumber}
          </Typography>
          {costRetrieval()}
          {value > 0 && (
            <div className={classes.additional}>
              <Typography variant="h6" align="center">
                {strings.additionalCost}
                {strings.rupees}
                {value}
              </Typography>
            </div>
          )}
        </div>
      )}
      {!props.location.data && (
        <div className={classes.paper}>{strings.noCheckIn}</div>
      )}
    </div>
  );
}
