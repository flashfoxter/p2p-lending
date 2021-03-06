/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TitlesResults from "./titles/TitlesResults";
import LanguageResults from "./titles/LanguageResults";
import TitleIndividual from "./titles/TitleIndividual";
import About from "./about/About";
import Privacy from "./privacy/Privacy";
import Terms from "./terms/Terms";
import Landing from "./landing/Landing";
import Footer from "./Footer";
import Header from "./Header";
import Logout from "../components/auth/Logout";
import Settings from "./settings/Settings"
import NotFound from "../components/NotFound";
import ScrollToTop from "../components/ScrollToTop";
import OrderStatus from "./orderstatus/OrderStatus";
import ReqUser from "./auth/ReqUser";

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <div className="App d-flex flex-column justify-content-between text-left">
          <Header />
          <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
            <Route path="/" component={ScrollToTop} />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/logout" component={Logout} />
              <Route exact path="/search/:searchTerm?" component={TitlesResults} />
              <Route exact path="/language/:languageID" component={LanguageResults} />
              <Route exact path="/titles/:titleID" exact component={TitleIndividual} />
              <Route exact path="/settings/profile" component={Settings} />
              <Route exact path="/order-status" component={ReqUser(OrderStatus)} />
              <Route exact path="/order-status/:tabName" component={ReqUser(OrderStatus)} />
              <Route exact path="/about" component={About} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
