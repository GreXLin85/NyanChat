import React from "react";
import NickName from "./NickName";
import MessageText from "./MessageText";

class Message extends React.Component {
  render() {
    return (
      <div className={`nes-balloon from-${(this.props.fromClient ? "right" : "left")} is-dark`}>
        <NickName fromClient={this.props.fromClient} userName={this.props.userName}/>
        <MessageText message={this.props.message} />
      </div>
    );
  }
}

export default Message;
