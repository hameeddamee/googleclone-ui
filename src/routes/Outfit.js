import React from "react";
import { Route, Switch } from "react-router-dom";

import Collections from "../pages/Outfit/Collections/Collections";
import Customize from "../pages/Outfit/Customize/Customize";
import ProductList from "../pages/Outfit/ProductList/ProductList";

export default () => (
  <Switch>
    <Route exact path="/" component={Collections} />
    <Route exact path="/outfit/collections" component={Collections} />
    <Route
      exact
      path="/outfit/collection/:collectionId/products"
      component={ProductList}
    />
    <Route
      exact
      path="/outfit/product/:productId/customize"
      component={Customize}
    />
  </Switch>
);
