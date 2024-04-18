import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function PageHeader() {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to="/home">
                {/* <img src="/img/logo.png" alt="" /> */}
                <div
                  style={{ color: "white", fontWeight: "900", fontSize: 20 }}
                >
                  PHD <span style={{color:'#e63333'}}>Star</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-8"></div>
          <div className="col-lg-2">
            <div className="header__right">
              <Link to="/" className="search-switch">
                <span className="icon_search" />
              </Link>
              <Link to="/user/login">
                <span className="icon_profile" />
              </Link>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap" />
      </div>
    </header>
  );
}

export default PageHeader;
