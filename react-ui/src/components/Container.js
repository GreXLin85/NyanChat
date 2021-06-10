import React from "react";
import MessageList from "./MessageList";
import MessageInputBox from "./MessageInputBox";
import ServerInputBox from "./ServerInputBox";
class Container extends React.Component {
  state = {
    socketIP: null,
    connectionError: false
  };

  componentDidMount() {
    window.Electron.ipcRenderer.on("socketController", (event) => {
      this.setState({ socketIP: event });
    });
    window.Electron.ipcRenderer.on("socketError", () => {
      this.setState({ connectionError: true });
    });
  }

  render() {
    return (
      <section
        className="nes-container is-dark"
        style={{
          display: "block",
          height: "calc(100% - 100px)",
        }}
      >
        {(() => {
          if (this.state.socketIP === null) {
            return <ServerInputBox />;
          } else {
            return (
              <>
                <MessageList />
                <MessageInputBox />
              </>
            );
          }
        })()}

        {this.state.connectionError && <span class="nes-text is-error">I can't connect to this server</span>}
      </section>
    );
  }
}

export default Container;
