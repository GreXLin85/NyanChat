import React from "react";
import ServerInput from "./ServerInput";

class ServerInputBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="nes-field is-inline">
        <ServerInput />
      </div>
    );
  }
}

export default ServerInputBox;
