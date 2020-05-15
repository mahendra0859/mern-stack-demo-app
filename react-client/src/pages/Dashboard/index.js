import React from "react";
import { connect } from "react-redux";
import { Navbar, Button } from "react-bootstrap";
import "./style.css";
import { LOGOUT } from "../../redux/actions";
const mapStateToProps = (state) => ({ ...state["authReducer"] });

const mapDispacthToProps = (dispatch) => ({
  logout: () => dispatch({ type: LOGOUT }),
});

const Dashboard = ({ users, logout, token, history }) => {
  if (!token) history.push("/register");
  return (
    <div>
      <Navbar bg="light" className="justify-content-end">
        <div>
          <img
            src="https://i.pravatar.cc/50?img=2"
            alt="profile"
            className="rounded-circle mx-5"
          />
          <Button variant="info" onClick={logout}>
            Logout
          </Button>
        </div>
      </Navbar>
      <div className="my-5 mx-2 d-flex flex-wrap justify-content-center align-items-center">
        {users &&
          users.map((user, index) => (
            <div className="card m-2" key={`card-${index + 1}`}>
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispacthToProps)(Dashboard);
