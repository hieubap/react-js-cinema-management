import React, { useEffect, useState } from "react";
import { StyledTicket } from "./styled";
import Barcode from "react-barcode";
import { convertFileUrl, requestFetch } from "@/service/request";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

function PageTicket() {
  const [state, _setState] = useState({
    data: {},
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      requestFetch("get", "/movie/ticket/" + params.id, {}).then((res) => {
        if (res.code == 200) {
          setState({
            data: res.data,
          });
        }
      });
    }
  }, []);
  return (
    <StyledTicket>
      <div className="ticket">
        <div className="holes-top" />
        <div className="title">
          <p className="cinema">Vé xem phim</p>
          <p className="movie-title">{state.data.film?.nameFilm}</p>
        </div>
        <div className="poster">
          <img
            src={convertFileUrl(state.data?.film?.imageUrl)}
            width={"100%"}
            style={{
              maxHeight: 300,
              objectFit: "cover",
            }}
            alt="Movie: Only God Forgives"
          />
        </div>
        <div className="info">
          <label>Rạp</label>
          <div>{state.data?.room?.nameRoom}</div>
          <label>Địa điểm</label>
          <div>{state.data?.room?.address}</div>
          <table style={{ marginTop: 20 }}>
            <tbody>
              <tr>
                <th>TIME</th>
                <th>DATE</th>
              </tr>
              <tr>
                <td>
                  {moment(state.data?.timetable?.startAt).format("HH:mm")}
                </td>
                <td>
                  {moment(state.data?.timetable?.startAt).format("DD/MM/YY")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="holes-lower" />
        <div className="serial">
          <Barcode value={params.id} height={60} />
        </div>
        <div
          style={{
            textAlign: "center",
            fontWeight: "500",
            padding: "0 8px 10px",
            width: "70%",
            marginLeft: "15%",
            alignSelf: "center",
          }}
        >
          <i>Vé được sử dụng để qua cửa kiểm soát. Vui lòng lưu lại vé</i>
        </div>
      </div>
    </StyledTicket>
  );
}

export default PageTicket;
