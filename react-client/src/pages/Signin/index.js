import React from "react";
import { connect } from "react-redux";
import AuthForm from "../../componets/AuthForm";
import { LOGIN } from "../../redux/actions";

const mapStateToProps = (state) => ({ ...state["authReducer"] });

const mapDispacthToProps = (dispatch) => ({
  login: (user) => dispatch({ type: LOGIN, payload: user }),
});

const Signin = ({ login, token, history }) => {
  if (token) history.push("/");
  const onSigninFormSubmit = (user) => login(user);

  return (
    <div className="container main-container">
      <AuthForm onFormSubmit={onSigninFormSubmit} />
      <span className="mt-5">
        Don't have an account? <a href="/#/register">Sign Up</a>
      </span>
    </div>
  );
};

export default connect(mapStateToProps, mapDispacthToProps)(Signin);
