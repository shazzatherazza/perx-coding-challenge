import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import NotFound from "./NotFound";
import CharacterProfile from "./CharacterProfile";

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:name" component={Search} />
        <Route path="/character/:id" component={CharacterProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
