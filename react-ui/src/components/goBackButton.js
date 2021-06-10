import React from "react";

class GoBackButton extends React.Component {
  render() {
    return (
      <a
        href="#"
        style={{ fontSize: "8px" }}
        onClick={() => this.props.onClick()}
      >
        <br></br>GO BACK<br></br>
      </a>
    );
  }
}

export default GoBackButton;
