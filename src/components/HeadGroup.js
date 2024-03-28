import React from "react";

function HeadGroup({ groupName = "Popular Shows" } = {}) {
  return (
    <div className="row">
      <div className="col-lg-8 col-md-8 col-sm-8">
        <div className="section-title">
          <h4>{groupName}</h4>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4">
        <div className="btn__all">
          <a href="#" className="primary-btn">
            View All <span className="arrow_right" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeadGroup;
