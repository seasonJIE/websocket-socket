import * as React from "react"
import {BrowserRouter, Router, Route, Link, HashRouter} from "react-router-dom";
import SocketTest from "./modules/Socket"
import RxJsSocketTest from "./modules/RxJsSocket/RxJsSocket"
import RxWebSocket from "./modules/RXwebsocket/Socket"
import Upload from "./modules/Upload"



export const Routes = () => (
  <BrowserRouter basename="/socket">
    <div>
      <Route exact path="/Socket" component={SocketTest}/>
      <Route exact path="/RxJsSocket" component={RxJsSocketTest}/>
      <Route exact path="/RxWebSocket" component={RxWebSocket}/>
      <Route exact path="/Upload" component={Upload}/>
    </div>
  </BrowserRouter>
)