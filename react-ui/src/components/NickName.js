import React from "react";

class NickName extends React.Component {
  render() {
    return (
      <p className={`nes-text is-${(this.props.fromClient ? "error" : "success")}`}>
        {this.props.userName}
      </p>
    );
  }
}

export default NickName;
