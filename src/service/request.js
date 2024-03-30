import axios from "axios";

const API_URL = "http://14.225.205.222:8800";
const API_FILE = "http://14.225.205.222:8800";

export const requestHeaders = {
  authorization: "",
  "Content-Type": "application/json",
};
export const convertFileUrl = (url = "") => {
  if (["https://", "http://", "file://"].some((i) => url.startsWith(i)))
    return url;
  return API_FILE + "/asset?p=" + url;
  // return "https://datahub.ivirse.com/api";
};

export const requestFetch = (methodType, url, body, headers) => {
  return new Promise((resolve, reject) => {
    let fetchParam = {
      method: methodType,
      headers: { ...requestHeaders, ...headers },
    };
    if (methodType.toLowerCase() !== "get") {
      fetchParam.body = JSON.stringify(body);
    }
    const clearUrl = url.startsWith("http") ? url : API_URL + url;
    return fetch(clearUrl, fetchParam)
      .then((json) => {
        if (!json.ok) {
          reject(json);
          return;
        }
        return json.json();
      })
      .then(resolve)
      .catch((e) => {
        // window.location.href = "/maintain";
        reject(e);
      });
  });
};

export const requestUpload = (url, file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    let fetchParam = {
      // method: "post",
      headers: {
        // ...requestHeaders,
        "Content-Type": "multipart/form-data",
      },
      // body: formData,
    };

    const clearUrl = url.startsWith("http") ? url : API_URL + url;
    return axios
      .post(clearUrl, formData, { ...fetchParam })
      .then((json) => {
        if (json.data.code === 200 || json.data.code === 0) {
          resolve(json.data);
        } else {
          reject(json.data);
        }
      })
      .then(resolve)
      .catch((e) => {
        // window.location.href = "/maintain";
        reject(e);
      });
  });
};
