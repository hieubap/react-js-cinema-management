import { convertFileUrl, requestFetch } from "@/service/request";
import moment from "moment";
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

  useEffect(() => {
    if (params.id) {
      requestFetch("get", "/movie/film?id=" + params.id, {}).then((res) => {
        if (res.code == 200) {
          setState({
            data: res.data?.[0],
          });
        }
      });
      requestFetch("get", "/movie/timetable?filmId=" + params.id, {}).then(
        (res) => {
          if (res.code == 200) {
            setState({
              timetable: res.data,
            });
          }
        }
      );
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
                  </div>
                  <div style={{ color: "white", marginBottom: 10 }}>
                    Lịch chiếu
                  </div>
                  <div className="anime__details__btn">
                    {state.timetable?.map((item) => (
                      <Link
                        to={"/page/book-ticket/" + item._id}
                        className="follow-btn"
                      >
                        <i className="fa fa-film" />{" "}
                        {moment(item.startAt).format("HH:mm DD/MM/YYYY")}
                      </Link>
                    ))}
                  </div>

                  <div style={{ color: "white", marginTop: 10 }}>Mô tả</div>
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
