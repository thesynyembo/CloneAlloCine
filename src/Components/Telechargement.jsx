import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import styled from "styled-components";

const Div = styled.div`
  margin-top: 20%;

`;
const LoaderExampleText = () => (
  <div>
    <Div>
      <Segment>
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    </Div>
  </div>
);

export default LoaderExampleText;
