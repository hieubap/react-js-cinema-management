import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SignIn() {
  return (
    <div>
      <section
        className="normal-breadcrumb set-bg"
        data-setbg="img/normal-breadcrumb.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="normal__breadcrumb__text">
                <h2>Login</h2>
                <p>Welcome to the official Anime&nbsp;blog.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Normal Breadcrumb End */}
      {/* Login Section Begin */}
      <section className="login" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="login__form">
                <h3>Login</h3>
                <form action="#">
                  <div className="input__item">
                    <input type="text" placeholder="Email address or username" />
                    <span className="icon_mail" />
                  </div>
                  <div className="input__item">
                    <input type="text" placeholder="Password" />
                    <span className="icon_lock" />
                  </div>
                  <button
                    type="submit"
                    className="site-btn"
                    style={{ width: "50%" }}
                  >
                    Login Now
                  </button>
                </form>
                <a href="#" className="forget_pass">
                  Forgot Your Password?
                </a>
              </div>
              <div
                className="login__register"
                style={{ marginTop: 60, display: "flex" }}
              >
                <h3 style={{ fontSize: 16, flex: 1 }}>
                  Dont’t Have An Account?
                </h3>
                <Link
                  to="/user/sign-up"
                  // className="primary-btn"
                  style={{
                    // width: "100%",
                    textAlign: "center",
                    color: "#e53637",
                  }}
                >
                  Register Now
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-12"></div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
