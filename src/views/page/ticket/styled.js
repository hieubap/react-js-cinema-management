import styled from "styled-components";

export const StyledTicket = styled.div`
  /* display: flex; */
  // Variables
  padding-top: 10px;
  padding-bottom: 20px;

  background-color: Thistle;
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-weight: 600;

  img {
    max-width: 100%;
    height: auto;
  }

  .ticket {
    width: 400px;
    /* height: 775px; */
    background-color: white;
    margin: 25px auto;
    position: relative;
  }

  .holes-top {
    height: 50px;
    width: 50px;
    background-color: Thistle;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    top: -25px;

    &:before,
    &:after {
      content: "";
      height: 50px;
      width: 50px;
      background-color: $background-color;
      position: absolute;
      border-radius: 50%;
    }
    &:before {
      left: -200px;
    }
    &:after {
      left: -200px;
    }
  }

  .holes-lower {
    position: relative;
    margin: 25px;
    border: 1px dashed #aaa;
    &:before,
    &:after {
      content: "";
      height: 20px;
      width: 50px;
      background-color: Thistle;
      position: absolute;
      border-radius: 50%;
    }

    &:before {
      top: -10px;
      left: -50px;
    }
    &:after {
      top: -10px;
      left: 350px;
    }
  }

  .title {
    padding: 50px 25px 10px;
  }

  .cinema {
    color: #aaa;
    font-size: 22px;
    margin-bottom: 0;
  }

  .movie-title {
    font-size: 30px;
    font-weight: 600;
    line-height: 35px;
  }
  .info {
    padding: 15px 25px;
  }
  .info label {
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 8px;
  }
  table {
    width: 100%;
    font-size: 18px;
    margin-bottom: 15px;
    tr {
      margin-bottom: 10px;
    }

    th {
      text-align: left;
      &:nth-of-type(1) {
        width: 38%;
      }
      &:nth-of-type(2) {
        width: 40%;
      }
      &:nth-of-type(3) {
        width: 15%;
      }
    }

    td {
      width: 33%;
      font-size: 32px;
    }
  }
  .bigger {
    font-size: 48px;
  }
  .serial {
    padding: 5px;
    display: flex;
    justify-content: center;
  }
  .numbers {
    td {
      font-size: 16px;
      text-align: center;
    }
  }
`;
