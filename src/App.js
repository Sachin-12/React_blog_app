import React, { Fragment, useEffect, useContext } from "react";
import "./styles.css";
import NavHeader from "./Components/NavHeader";
import Home from "./Pages/Home/Home";
import { Switch, Route } from "react-router-dom";
import routes from "./routes/routes";
import Authors from "./Pages/Home/Authors";
import NewPost from "./Pages/Home/NewPost";
import DetailedPost from "./Pages/Home/DetailedPost";
import AuthorPosts from "./Pages/Home/AuthorPosts";
import { useHistory, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import networkRequest from "./services/networkRequest";
import { USER_LOGGED_IN } from "./action/actions";
import { AdminContext } from "./Store/AdminProvider";

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const store = useContext(AdminContext);
  const { dispatch } = store;

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace("/home");
    }
    networkRequest("/admin/isLoggedIn")
      .then(() => {
        dispatch({
          type: USER_LOGGED_IN
        });
      })
      .catch(console.error);
  }, []);
  return (
    <Fragment>
      <NavHeader />
      <Switch>
        <Route path={routes.home}>
          <Home />
        </Route>
        <Route path={routes.post}>
          <DetailedPost />
        </Route>
        <Route path={routes.author}>
          <AuthorPosts />
        </Route>
        <Route path={routes.authors}>
          <Authors />
        </Route>
        <Route path={routes.newPost}>
          <NewPost />
        </Route>
        <Route path={routes.adminLogin}>
          <LoginPage />
        </Route>
      </Switch>
    </Fragment>
  );
  // return (
  //   <div className="App">
  //     <h1>Hello CodeSandbox</h1>
  //     <h2>Start editing to see some magic happen!</h2>
  //   </div>
  // );
}
