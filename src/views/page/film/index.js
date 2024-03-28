import React from "react";

function PageFilm() {
  return (
    <>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="./index.html">
                  <i className="fa fa-home" /> Home
                </a>
                <a href="./categories.html">Categories</a>
                <span>Romance</span>
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
                  data-setbg="img/anime/details-pic.jpg"
                >
                  <div className="comment">
                    <i className="fa fa-comments" /> 11
                  </div>
                  <div className="view">
                    <i className="fa fa-eye" /> 9141
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>Fate Stay Night: Unlimited Blade</h3>
                    <span>フェイト／ステイナイト, Feito／sutei naito</span>
                  </div>
                  <div className="anime__details__rating">
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
                  </div>
                  <p>
                    Every human inhabiting the world of Alcia is branded by a
                    “Count” or a number written on their body. For Hina’s
                    mother, her total drops to 0 and she’s pulled into the
                    Abyss, never to be seen again. But her mother’s last words
                    send Hina on a quest to find a legendary hero from the Waste
                    War - the fabled Ace!
                  </p>
                  <div className="anime__details__widget">
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
                  </div>
                  <div className="anime__details__btn">
                    <a href="#" className="follow-btn">
                      <i className="fa fa-heart-o" /> Follow
                    </a>
                    <a href="#" className="watch-btn">
                      <span>Watch Now</span> <i className="fa fa-angle-right" />
                    </a>
                  </div>
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
