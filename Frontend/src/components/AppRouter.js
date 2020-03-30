import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import TermsAndConditonsPage from "./TermsAndConditonsPage";
import QrScanner from "./QrScanner";
import Profile from "./Profile";
import QrCode from "./QrCode";
import Welcome from "./Welcome";
import ImageUpload from "./ImageUpload";
import Upgrade from "./Upgrade";
import RoomAssign from "./RoomAssign";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/qrscanner" exact={true} component={QrScanner} />
        <Route path="/profile" exact={true} component={Profile} />
        <Route path="/bookingid/:id" exact={true} component={HomePage} />
        <Route
          path="/terms-and-conditions"
          exact={true}
          component={TermsAndConditonsPage}
        />
        <Route path="/welcome" exact={true} component={Welcome} />
        <Route path="/qrcode" exact={true} component={QrCode} />
        <Route path="/imageUpload" exact={true} component={ImageUpload} />
        <Route path="/upgrade" exact={true} component={Upgrade} />
        <Route path="/roomassign" exact={true} component={RoomAssign} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
