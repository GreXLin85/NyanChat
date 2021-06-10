import React from "react";
import GoBackButton from "./goBackButton";
class MessageText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: String(this.props.message),
      wantsToReadMore: false,
    };
  }

  render() {
    return (
      <p>
        {(() => {
          if (this.props.message.length >= 20 && !this.state.wantsToReadMore) {
            return (
              <>
                {this.state.message.substr(0, 20)}
                <a
                  href="#"
                  style={{ fontSize: "8px" }}
                  onClick={() => this.setState({ wantsToReadMore: true })}
                >
                  <br></br>Read more({this.props.message.length} characters)
                </a>
              </>
            );
          } else {
            return (
              <>
                {this.state.message.length >= 200 && (
                  <GoBackButton
                    onClick={() => this.setState({ wantsToReadMore: false })}
                  />
                )}
                {this.state.message}
                {this.state.message.length >= 200 && (
                  <GoBackButton
                    onClick={() => this.setState({ wantsToReadMore: false })}
                  />
                )}
              </>
            );
          }
        })()}
      </p>
    );
  }
}

export default MessageText;
