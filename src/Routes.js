import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Book from "./components/Book/Book";
import BookContent from "./components/Book/BookContent/BookContent";
import News from "./components/News/News";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/book" component={Book} />
    <Route exact path={"/books/:id/:title"} component={BookContent} />
    <Route path="/news" component={News} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="*" component={NotFound} />
  </Switch>
);
export default Routes;
