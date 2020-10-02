import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import PublicRoute from "./Guards/PublicRoute";

import Outfit from "./Outfit";

const AppRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <PublicRoute exact path="/" component={Outfit} />
        <PublicRoute path="/outfit" component={Outfit} />
      </Switch>
    </Fragment>
  );
};

export default AppRoutes;
