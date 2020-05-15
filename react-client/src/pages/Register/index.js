import React from "react";
import { connect } from "react-redux";
import AuthForm from "../../componets/AuthForm";
import { REGISTER } from "../../redux/actions";

const mapStateToProps = (state) => ({ ...state["authReducer"] });

const mapDispacthToProps = (dispatch) => ({
  register: (user) => dispatch({ type: REGISTER, payload: user }),
});

const Register = ({ register, history, token }) => {
  if (token) history.push("/");
  const onRegisterFormSubmit = (user) => register(user);

  return (
    <div className="container main-container">
      <AuthForm nameRequired={true} onFormSubmit={onRegisterFormSubmit} />
      <span className="mt-5">
        Already have an account? <a href="/#/signin">Login</a>
      </span>
    </div>
  );
};

export default connect(mapStateToProps, mapDispacthToProps)(Register);
