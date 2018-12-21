import * as React from "react"
import {Routes} from "./routes";


export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }


  render() {
    return (
      <Routes/>
    )
  }
}
