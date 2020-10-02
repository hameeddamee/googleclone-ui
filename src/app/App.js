import React, { useState, useEffect, Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import LogRocket from "logrocket";
import ReduxToastr from "react-redux-toastr";
import Spinner from "../shared/components/spinner/Spinner";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import store from "../redux/store";
import config from "../config";
import { environments } from "../shared/helpers/apiAccessHelpers";

import MainWrapper from "./MainWrapper";
import Routes from "../routes";
// import Spinner from "carousel.css/components/spinner/Spinner";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
      setTimeout(() => setLoaded(true), 500);
    });

    if (
      process.env.NODE_ENV.toLowerCase() ===
      environments.production.toLowerCase()
    ) {
      LogRocket.init(config.LogRocket.connectionId);
    }
  }, [store]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {!loaded && <Spinner className={`load${loading ? "" : " loaded"}`} />}
          <MainWrapper>
            <Routes />
          </MainWrapper>
        </Fragment>
      </Router>

      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        getState={(state) => state.notification} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Provider>
  );
};

export default App;
