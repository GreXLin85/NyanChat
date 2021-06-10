import React from "react";
import MessageInput from "./MessageInput";

class MessageInputBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSticky: false,
    };

    this.setSticky = this.setSticky.bind(this);
  }

  componentDidMount() {
    window.onscroll = (ev) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.setSticky(true);
      } else {
        this.setSticky(false);
      }
    };
  }

  setSticky(isSticky) {
    this.setState({ isSticky: isSticky });
  }

  render() {
    return (
      <div
        style={(() => {
          if (!this.state.isSticky) {
            return {
              backgroundColor: "#212529",
              padding: "1rem",
              position: "fixed",
              bottom: "0px",
              width: "100%",
              left: "0px",
            };
          }
        })()}
        className="nes-field is-inline"
      >
        <MessageInput />
      </div>
    );
  }
}

export default MessageInputBox;
