import React, { useEffect, useState } from "react";
import FilmItem from "../../../components/FilmItem";
import HeadGroup from "@/components/HeadGroup";
import { convertFileUrl, requestFetch } from "@/service/request";
import moment from "moment";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TopViewItem = ({ item } = {}) => {
  console.log(item, "item");
  return (
    <div
      className="product__sidebar__view__item set-bg mix day years"
      style={{ backgroundImage: `url(${convertFileUrl(item.film?.imageUrl)})` }}
    >
      <div className="ep">{moment(item.startAt).fromNow()}</div>
      <div className="view">{item.room?.nameRoom}</div>
      <h5>
        <Link to={"/page/film/" + item.film?._id}>{item.film?.nameFilm}</Link>
      </h5>
    </div>
  );
};

function PageHome() {
  const [state, _setState] = useState({
    visible: false,
    data: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const fetchData = () => {
    requestFetch(
      "get",
      "/movie/film?sort=createdAt,desc&textSearch=",
      // searchRef.current?.textSearch,
      {}
    ).then((res) => {
      if (res.code == 200) {
        setState({
          data: res.data,
        });
      }
    });
    requestFetch("get", "/movie/timetable", {}).then((res) => {
      if (res.code == 200) {
        setState({
          timetable: res.data.filter((_, idx) => idx < 10),
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
    const str = localStorage.getItem("list-ordered");
    if (str) {
      setState({
        orderedList: JSON.parse(str),
      });
    }
  }, []);

  const history = useHistory();

  return (
    <div>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="trending__product">
                <HeadGroup groupName="Danh sách phim" />
                <div className="row">
                  {state.data?.map((item) => (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <FilmItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="product__sidebar">
                <div className="product__sidebar__view">
                  <div className="section-title">
                    <h5>Vé đã đặt</h5>
                  </div>
                  <div
                    className="anime__details__btn"
                    style={{ marginBottom: 30 }}
                  >
                    {state.orderedList?.map((item) => (
                      <div
                        className="follow-btn"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push("/page/ticket/" + item._id);
                        }}
                      >
                        Đặt lúc: {moment(item.createdAt).format("HH:mm")}
                      </div>
                    ))}
                  </div>

                  <div className="section-title">
                    <h5>Sắp chiếu</h5>
                  </div>
                  {/* <ul className="filter__controls">
                    <li className="active" data-filter="*">
                      Day
                    </li>
                    <li data-filter=".week">Week</li>
                    <li data-filter=".month">Month</li>
                    <li data-filter=".years">Years</li>
                  </ul> */}
                  <div className="filter__gallery">
                    {state.timetable?.map((item) => (
                      <TopViewItem item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
