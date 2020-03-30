import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { strings } from "./Localisation";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles(theme => ({
  head: {
    marginTop: theme.spacing(1)
  },
  alignTerms: {
    display: "flex",
    flexDirection: "row"
  }
}));

export default function ImageUploadText() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h3" color="primary" align="center">
        {strings.imageUploadHeader}
      </Typography>
      <div className={classes.head}>
        <Typography variant="h6">{strings.imageUploadInfoTest}</Typography>
        <Typography variant="h6">{strings.documentsToUpload}</Typography>
        <div className={classes.alignTerms}>
          <ArrowRightIcon fontSize="small" color="primary" />
          <Typography variant="h6">{strings.aadharCard}</Typography>
        </div>
        <div className={classes.alignTerms}>
          <ArrowRightIcon fontSize="small" color="primary" />
          <Typography variant="h6">{strings.drivingLicense}</Typography>
        </div>
        <div className={classes.alignTerms}>
          <ArrowRightIcon fontSize="small" color="primary" />
          <Typography variant="h6">{strings.passport}</Typography>
        </div>
      </div>
    </div>
  );
}
