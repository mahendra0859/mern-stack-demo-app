import React from "react";
import "./style.css";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import cx from "classnames";

const mapStateToProps = (state) => ({ ...state["toasterReducer"] });

const Toaster = ({ show, success, message }) =>
  show && (
    <div className="toast-container">
      <ReactCSSTransitionGroup
        component="div"
        transitionName="ToasterAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div
          className={cx(
            "alert",
            { "alert-success": success },
            { "alert-danger": !success }
          )}
          role="alert"
        >
          {message}
        </div>
      </ReactCSSTransitionGroup>
    </div>
  );

export default connect(mapStateToProps)(Toaster);
