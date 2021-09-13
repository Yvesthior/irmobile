import React, { Component } from "react";
import App from "./App";
import BackgroundTask from "react-native-background-task";

// BackgroundTask.define(() => {
//   console.log("Hello from a background task");
//   BackgroundTask.finish();
// });

export default class Home extends Component {
  componentDidMount() {
    // BackgroundTask.schedule();
  }

  render() {
    return <App />;
  }
}
