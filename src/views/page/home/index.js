import React from "react";
import FilmItem from "../../../components/FilmItem";
import HeadGroup from "@/components/HeadGroup";

function PageHome() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero__slider owl-carousel">
            <div
              className="hero__items set-bg"
              data-setbg="/img/hero/hero-1.jpg"
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hero__items set-bg"
              data-setbg="/img/hero/hero-1.jpg"
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hero__items set-bg"
              data-setbg="/img/hero/hero-1.jpg"
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}
      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="trending__product">
                <HeadGroup groupName="Trending now" />
                <div className="row">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <FilmItem />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="product__sidebar">
                <div className="product__sidebar__view">
                  <div className="section-title">
                    <h5>Top Views</h5>
                  </div>
                  <ul className="filter__controls">
                    <li className="active" data-filter="*">
                      Day
                    </li>
                    <li data-filter=".week">Week</li>
                    <li data-filter=".month">Month</li>
                    <li data-filter=".years">Years</li>
                  </ul>
                  <div className="filter__gallery">
                    <div
                      className="product__sidebar__view__item set-bg mix day years"
                      data-setbg="/img/sidebar/tv-1.jpg"
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="#">Boruto: Naruto next generations</a>
                      </h5>
                    </div>
                    <div
                      className="product__sidebar__view__item set-bg mix month week"
                      data-setbg="/img/sidebar/tv-2.jpg"
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="#">The Seven Deadly Sins: Wrath of the Gods</a>
                      </h5>
                    </div>
                    <div
                      className="product__sidebar__view__item set-bg mix week years"
                      data-setbg="/img/sidebar/tv-3.jpg"
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="#">
                          Sword art online alicization war of underworld
                        </a>
                      </h5>
                    </div>
                    <div
                      className="product__sidebar__view__item set-bg mix years month"
                      data-setbg="/img/sidebar/tv-4.jpg"
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="#">
                          Fate/stay night: Heaven's Feel I. presage flower
                        </a>
                      </h5>
                    </div>
                    <div
                      className="product__sidebar__view__item set-bg mix day"
                      data-setbg="/img/sidebar/tv-5.jpg"
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="#">Fate stay night unlimited blade works</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section End */}
      {/* Search model Begin */}
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">
            <i className="icon_close" />
          </div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>

      <div class="search-model">
        <div class="h-100 d-flex align-items-center justify-content-center">
          <div class="search-close-switch">
            <i class="icon_close"></i>
          </div>
          <form class="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PageHome;
