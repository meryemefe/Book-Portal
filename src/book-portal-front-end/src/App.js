import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BookPortalMain from "./CommonPages/BookPortalMain";
import Register from "./CommonPages/Register";
import Error from "./CommonPages/Error";

import Books from "./AdminPages/Books";
import AdminHomepage from "./AdminPages/Homepage";
import Authors from "./AdminPages/Authors";
import AddBook from "./AdminPages/AddBook";
import ViewUsers from "./AdminPages/ViewUsers";
import Profile from "./AdminPages/Profile";

import EUBooks from "./EndUserPages/ViewBooks";
import EUFavoriteList from "./EndUserPages/ViewFavoriteList";
import EUReadList from "./EndUserPages/ViewReadList";
import EUAuthors from "./EndUserPages/ViewAuthors";
import EUHomepage from "./EndUserPages/Homepage";
import EUProfile from "./EndUserPages/Profile";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <BookPortalMain />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin">
            <AdminHomepage />
          </Route>
          <Route path="/admin-users">
            <ViewUsers />
          </Route>
          <Route path="/admin-books">
            <Books />
          </Route>
          <Route path="/admin-add-book">
            <AddBook />
          </Route>
          <Route path="/admin-authors">
            <Authors />
          </Route>
          <Route path="/admin-profile">
            <Profile />
          </Route>

          <Route path="/user">
            <EUHomepage />
          </Route>

          <Route path="/user-books">
            <EUBooks />
          </Route>
          <Route path="/user-authors">
            <EUAuthors />
          </Route>
          <Route path="/user-read-list">
            <EUReadList />
          </Route>
          <Route path="/user-favorite-List">
            <EUFavoriteList />
          </Route>
          <Route path="/user-profile">
            <EUProfile />
          </Route>

          <Route path="/error">
            <Error />
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
