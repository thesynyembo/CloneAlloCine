import React from "react";
import { Grid } from "semantic-ui-react";
import logo from "./video.mp4";
import styled from "styled-components";

const Div = styled.div`
`;
class Example extends React.Component {
  render() {
    return (
      <Div>
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <video
            className=""
            autoPlay
            muted
            loop
            style={{
              position: "fixed",
              width: "100%",
              left: "50%",
              top: "2%",
              height: "100%",
              transform: "translate(-50%, -50%)",
              zIndex: "-1",
            }}
          >
            <source src={logo} type="video/mp4" />
          </video>
        </Grid.Column>
      </Div>
    );
  }
}

export default Example;
