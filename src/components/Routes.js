import React, { lazy, Suspense } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Loading from "./Loading";

const Signup = lazy(() => import("./Signup"));
const Chart = lazy(() => import("./Chart"));
const NotFound = lazy(() => import("./NotFound"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" element={<Signup />} />
        <Route path="/welcome" element={<Chart />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
