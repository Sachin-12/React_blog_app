import React, { useState, useEffect, Fragment, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import networkRequest from "../../services/networkRequest";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { USER_LOGGED_IN } from "../../action/actions";
import { AdminContext } from "../../Store/AdminProvider";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const store = useContext(AdminContext);
  const {state, dispatch } = store;
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);
  const formSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    networkRequest("/admin/login", "POST", { email, password })
      .then(response => {
        setIsLoading(false);
        dispatch({
          type: USER_LOGGED_IN
        });
        localStorage.setItem("jwtToken", response.jwtToken);
        history.push(routes.newPost);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <Form onSubmit={formSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="with a placeholder"
          value={email}
          onChange={updateEmail}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password placeholder"
          value={password}
          onChange={updatePassword}
        />
      </FormGroup>
      <Button>Submit</Button>
      {isLoading ? <LoadingIndicator /> : null}
    </Form>
  );
};

export default LoginPage;
