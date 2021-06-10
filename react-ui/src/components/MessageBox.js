import React from "react";
import Message from "./Message";

class MessageBox extends React.Component {
  render() {
    return (
      <section className={"message -" + (this.props.fromClient ? "right" : "left")}>
        <Message fromClient={this.props.fromClient} userName={this.props.userName} message={this.props.message} ></Message>
      </section>
    );
  }
}

export default MessageBox;
