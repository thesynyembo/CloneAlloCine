import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";



const ButtonExampleInverted = () => (
  <div>
    <Link to="/">
      <Button inverted color="yellow">
        Popuplaire
      </Button>
    </Link>
    <Link to="/top">
      <Button inverted color="yellow">
        Les mieux notés
      </Button>
    </Link>
    <Link to="/AVenir">
      <Button inverted color="yellow">
        À venir
      </Button>
    </Link>
  </div>
);

export default ButtonExampleInverted;
