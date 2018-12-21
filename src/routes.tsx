import * as React from "react"
import {BrowserRouter, Router, Route, Link, HashRouter} from "react-router-dom";
import SocketTest from "./modules/Socket"

export const Routes = () => (
  <BrowserRouter basename="/socket">
    <div>
      <Route exact path="/Socket" component={SocketTest}/>
    </div>
  </BrowserRouter>
)