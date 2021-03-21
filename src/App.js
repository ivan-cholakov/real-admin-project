import React from "react";
import Routes from "./routes";
import Notification from "./components/common/Notification";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Notification />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
