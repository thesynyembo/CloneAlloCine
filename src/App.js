import React from "react";
import "./App.css";
// import HeaderExampleFloating from "./Components/Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import AVenir from "./Components/AVenir";
import TopVideo from "./Components/Top";
import PagePopulaire from "./Components/Populaire";
import Detail from "./Components/Detail";
import styled from "styled-components";

const Div = styled.div`
background:black;

`;

function App() {
  return (
<Div>
    <Router>
       <Switch>
          <Route exact path="/">
            <PagePopulaire/>
          </Route>
          <Route  path="/top">
            <TopVideo/>
          </Route>
          <Route  path="/AVenir">
            <AVenir/>
          </Route>
          <Route  path="/detail/:id">
            <Detail/>
          </Route>
        </Switch>


    </Router>
    </Div>
    // <div>
    //   <BrowserRouter>
    //     <ContainerExampleContainer />
    //     <Switch>
    //       <Router exact path="/" component={Upcoming} />
    //       <Router path="/top" component={TopVideo} />
    //       <Router path="/popular" component={Popular} />
    //       {/* <Router path="/detail" component={Detail} /> */}
    //     </Switch>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
