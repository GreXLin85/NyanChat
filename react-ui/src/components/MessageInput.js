import React from "react";

class MessageInput extends React.Component {
  state = {
    message: "",
  };

  render() {
    return (
      <input
        type="text"
        id="dark_field"
        className="nes-input is-dark"
        placeholder="Your Message"
        value={this.state.message}
        onChange={(text) => {
          this.setState({ message: text.target.value });
        }}
        onKeyPress={(key) => {
          
          if (key.code === "Enter") {
            window.Electron.ipcRenderer.send("messageFromReact", this.state.message);
            this.setState({message : ""})
          }
        }}
      />
    );
  }
}

export default MessageInput;
