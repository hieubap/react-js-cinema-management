import { requestFetch, requestHeaders } from "@/service/request";
import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { message } from "antd";

function SignIn() {
  const loginDataRef = React.useRef({});
  const history = useHistory();
  const onLogin = () => {
    requestFetch("post", "/user/sign-in", {
      username: loginDataRef.current.username,
      password: loginDataRef.current.password,
    }).then((res) => {
      console.log(res, "res");
      if (res.code != 200) {
        message.error(res.message);
      } else {
        requestHeaders.authorization = "Bearer " + res.data.token;
        localStorage.setItem("authCinema", JSON.stringify(res.data));
        history.replace("/manager");
        message.success("Đăng nhập thành công");
        // setSignin(true);
      }
    });
  };

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
                    <input
                      type="text"
                      placeholder="Email address or username"
                      onChange={(e) => {
                        loginDataRef.current.username = e.target.value;
                      }}
                    />
                    <span className="icon_mail" />
                  </div>
                  <div className="input__item">
                    <input
                      type="text"
                      placeholder="Password"
                      onChange={(e) => {
                        loginDataRef.current.password = e.target.value;
                      }}
                    />
                    <span className="icon_lock" />
                  </div>
                  <button
                    className="site-btn"
                    style={{ width: "100%" }}
                    onClick={onLogin}
                  >
                    Login Now
                  </button>
                </form>
                {/* <a href="#" className="forget_pass">
                  Forgot Your Password?
                </a> */}
              </div>
              {/* <div
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
              </div> */}
            </div>
            {/* <div className="col-lg-12"></div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
