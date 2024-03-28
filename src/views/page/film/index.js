import { convertFileUrl, requestFetch } from "@/service/request";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

function PageFilm() {
  const [state, _setState] = useState({
    visible: false,
    data: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const params = useParams();

  console.log(params, "params");

  useEffect(() => {
    if (params.id) {
      requestFetch("get", "/movie/film?id=" + params.id, {}).then((res) => {
        if (res.code == 200) {
          setState({
            data: res.data?.[0],
          });
        }
      });
    }
  }, []);

  return (
    <>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home" /> Home
                </Link>
                <span>{state.data?.nameFilm}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Anime Section Begin */}
      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="anime__details__pic set-bg"
                  style={{
                    backgroundImage: `url(${convertFileUrl(
                      state.data?.imageUrl
                    )})`,
                  }}
                >
                  {/* <div className="comment">
                    <i className="fa fa-comments" /> 11
                  </div>
                  <div className="view">
                    <i className="fa fa-eye" /> 9141
                  </div> */}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{state.data?.nameFilm}</h3>
                    {/* <span>フェイト／ステイナイト, Feito／sutei naito</span> */}
                  </div>
                  {/* <div className="anime__details__rating">
                    <div className="rating">
                      <a href="#">
                        <i className="fa fa-star" />
                      </a>
                      <a href="#">
                        <i className="fa fa-star" />
                      </a>
                      <a href="#">
                        <i className="fa fa-star" />
                      </a>
                      <a href="#">
                        <i className="fa fa-star" />
                      </a>
                      <a href="#">
                        <i className="fa fa-star-half-o" />
                      </a>
                    </div>
                    <span>1.029 Votes</span>
                  </div> */}

                  {/* <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Type:</span> TV Series
                          </li>
                          <li>
                            <span>Studios:</span> Lerche
                          </li>
                          <li>
                            <span>Date aired:</span> Oct 02, 2019 to ?
                          </li>
                          <li>
                            <span>Status:</span> Airing
                          </li>
                          <li>
                            <span>Genre:</span> Action, Adventure, Fantasy,
                            Magic
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Scores:</span> 7.31 / 1,515
                          </li>
                          <li>
                            <span>Rating:</span> 8.5 / 161 times
                          </li>
                          <li>
                            <span>Duration:</span> 24 min/ep
                          </li>
                          <li>
                            <span>Quality:</span> HD
                          </li>
                          <li>
                            <span>Views:</span> 131,541
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  <div className="anime__details__btn">
                    <a href="#" className="follow-btn">
                      <i className="fa fa-heart-o" /> Follow
                    </a>
                    <a href="#" className="watch-btn">
                      <span>Watch Now</span> <i className="fa fa-angle-right" />
                    </a>
                  </div>
                  <p>{state.data?.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageFilm;
