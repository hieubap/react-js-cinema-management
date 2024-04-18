import { convertFileUrl, requestFetch } from "@/service/request";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Input, Card, Button, message, Select } from "antd";
import { formatPrice } from "@/utils/index";

function PageBookTicket() {
  const [state, _setState] = useState({
    data: {},
    selected: [],
    occupied: [],
    orderedList: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const dataRef = useRef({});
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      requestFetch("get", "/movie/timetable?id=" + params.id, {}).then(
        (res) => {
          if (res.code == 200) {
            setState({
              data: res.data?.[0],
            });
          }
        }
      );
      requestFetch("get", "/movie/ticket?timetableId=" + params.id, {}).then(
        (res) => {
          if (res.code == 200) {
            setState({
              occupied: res.data?.reduce((a, b) => [...a, ...b.positions], []),
            });
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    const str = localStorage.getItem("list-ordered");
    if (str) {
      setState({
        orderedList: JSON.parse(str),
      });
    }
  }, []);

  const history = useHistory();

  const onSubmit = () => {
    const body = {
      ...dataRef.current,
      positions: state.selected,
      timetableId: params?.id,
    };
    if (!dataRef.current.phone) {
      message.error("Vui lòng nhập số điện thoại");
      return;
    }
    if (!state.selected?.length) {
      message.error("Vui lòng chọn ghế");
      return;
    }
    requestFetch("post", "/movie/ticket", body).then((res) => {
      if (res.code == 0) {
        localStorage.setItem(
          "list-ordered",
          JSON.stringify([...state.orderedList, res.data])
        );
        message.success("Đặt vé thành công");
        history.replace("/page/ticket/" + res.data._id);
      } else {
        message.error(res.message);
      }
    });
  };

  const sheets = useMemo(() => {
    if (!state.data?.room) return [];

    return Array.from(Array(state.data?.room?.row || 0).keys()).map((_, r) =>
      Array.from(Array(state.data?.room?.column || 0).keys()).map((_, c) =>
        state.occupied.some((s) => s.col == c && s.row == r)
          ? 1
          : state.selected.some((s) => s.col == c && s.row == r)
          ? 2
          : 3
      )
    );
  }, [state.data?.room, state.selected, state.occupied]);

  console.log(state, "state");

  return (
    <div style={{ padding: "0 10px", paddingBottom: 60 }}>
      <div className="row" style={{ padding: "0 50px" }}>
        <div
          className="product__sidebar__view__item set-bg mix day years"
          style={{
            backgroundImage: `url(${convertFileUrl(
              state.data?.film?.imageUrl
            )})`,
            width: "100%",
            height: 300,
          }}
        >
          <div className="ep">
            {moment(state.data?.film?.createdAt).fromNow()}
          </div>
          <h5>
            <Link to={"/page/film/"}>{state.data?.film?.nameFilm}</Link>
          </h5>
        </div>

        {/* <div className="col-lg-3"></div>
        <div className="col-lg-9">
          <div className="anime__details__text">
            
          </div>
        </div> */}
      </div>
      <div style={{ padding: "0 50px", marginBottom: 30 }}>
        <table className="table-ticket">
          <tbody>
            <tr>
              <td>Thời gian</td>
              <td>
                {moment(state.data?.film?.startAt).format("HH:mm DD/MM/YYYY")}
              </td>
            </tr>
            <tr>
              <td>Phòng chiếu</td>
              <td>{state.data?.room?.nameRoom}</td>
            </tr>
            <tr>
              <td>Địa điểm</td>
              <td>{state.data?.room?.address}</td>
            </tr>
            <tr>
              <td>Giá vé</td>
              <td>{formatPrice(state.data?.film?.balance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: 30 }}>
        <h4 className="white-text text-center">Vui lòng chọn ghế</h4>
      </div>
      <ul className="showcase">
        <li>
          <div className="seat" />
          <small>Trống</small>
        </li>
        <li>
          <div className="seat selected" />
          <small>Đã chọn</small>
        </li>
        <li>
          <div className="seat occupied" />
          <small>Đã được đặt</small>
        </li>
      </ul>
      <div className="container-sheet">
        <div className="movie-screen">
          <img src="/img/screen-thumb.png" alt="screen" />
        </div>
        <div className="row-container">
          {sheets.map((row, r) => (
            <div className="row" style={{ justifyContent: "" }}>
              {row.map((_, c) => (
                <div
                  onClick={() => {
                    if (sheets[r][c] == 1) return;
                    setState({
                      selected:
                        sheets[r][c] == 2
                          ? [...state.selected].filter(
                              (s) => s.row != r || s.col != c
                            )
                          : [...state.selected, { row: r, col: c }],
                    });
                  }}
                  className={
                    "seat " + (_ == 1 ? "occupied" : _ == 2 ? "selected" : "")
                  }
                />
              ))}
            </div>
          ))}
        </div>
        <div className="row">
          <Card className="card-book-ticket">
            <label>Tổng số ghế đã chọn</label>
            <div className="value">{state.selected?.length}</div>

            <label>Giá tiền mỗi ghế</label>
            <div className="value">
              {formatPrice(state.data?.film?.balance)}
            </div>

            <label>Tổng số tiền</label>
            <div className="value">
              {formatPrice(state.selected?.length * state.data?.film?.balance)}
            </div>

            <label>Họ tên</label>
            <Input
              placeholder="Nhập họ tên"
              onChange={(e) => {
                dataRef.current.fullname = e.target.value;
              }}
            />
            <label>Số điện thoại</label>
            <Input
              placeholder="Nhập số điện thoại"
              onChange={(e) => {
                dataRef.current.phone = e.target.value;
              }}
            />
            <label>Địa chỉ</label>
            <Input
              placeholder="Nhập địa chỉ"
              onChange={(e) => {
                dataRef.current.address = e.target.value;
              }}
            />
            <label>Email</label>
            <Input
              placeholder="Nhập email"
              onChange={(e) => {
                dataRef.current.email = e.target.value;
              }}
            />
            <label>Phương thức thanh toán</label>
            <Select
              placeholder="Chọn phương thức"
              options={[
                {
                  label: "Tiền mặt",
                  value: 1,
                },
                {
                  label: "Chuyển khoản",
                  value: 2,
                },
              ]}
              defaultValue={1}
              onChange={(e) => {
                dataRef.current.methodPay = e;
              }}
              className="w-100"
            />

            <div className="row" style={{ marginTop: 20 }}>
              <Button
                type="primary"
                danger
                style={{ marginLeft: "auto" }}
                onClick={onSubmit}
              >
                <i style={{ marginRight: 5 }} className="fa fa-film" /> Đặt vé
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PageBookTicket;
