import React from "react";
import MessageBox from "./MessageBox";

class MessageList extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    window.Electron.ipcRenderer.on(
      "newMessageFromServer",
      (event, fromClient, userName, message) => {
        let messages = [...this.state.messages];
        messages.push({
          fromClient: fromClient,
          userName: userName,
          message: message,
        });

        this.setState({ messages: messages });
      }
    );

    window.Electron.ipcRenderer.on(
      "messageFromMe",
      (event, fromClient, userName, message) => {
        console.log("lna");
        let messages = [...this.state.messages];
        messages.push({
          fromClient: fromClient,
          userName: userName,
          message: message,
        });

        this.setState({ messages: messages });
      }
    );
    
  }
  render() {
    return (
      <section
        className="message-list"
        style={{
          fontSize: "60%",
        }}
      >
        {this.state.messages.map((value, index) => (
          <MessageBox
            fromClient={value.fromClient}
            userName={value.userName}
            message={value.message}
            key={index}
          ></MessageBox>
        ))}
      </section>
    );
  }
}

export default MessageList;
