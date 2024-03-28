import { convertFileUrl } from "@/service/request";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function FilmItem({
  filmName = "The Seven Deadly Sins: Wrath of the Gods",
  comment = 11,
  eye = 1902,
  current = 10,
  total = 18,
  item,
} = {}) {
  return (
    <div className="product__item">
      <div
        className="product__item__pic set-bg"
        style={{ backgroundImage: `url(${convertFileUrl(item.imageUrl)})` }}
      >
        <div className="ep">{moment(item.createdAt).fromNow()}</div>
        {/* <div className="comment">
          <i className="fa fa-comments" /> {comment}
        </div>
        <div className="view">
          <i className="fa fa-eye" /> {eye}
        </div> */}
      </div>
      <div className="product__item__text">
        {/* <ul>
          <li>Active</li>
          <li>Movie</li>
        </ul> */}
        <h5>
          <Link to={"/page/film/" + item._id}>{filmName}</Link>
        </h5>
      </div>
    </div>
  );
}

export default FilmItem;
