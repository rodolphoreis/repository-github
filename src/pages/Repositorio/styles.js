import styled from "styled-components";
import { Link } from "react-router-dom";

export const BackButtonLoading = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

export const Loading = styled.div`
  display: flex;
  height: 100vh;
  margin: auto;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 24px;
    color: #ddd;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  height: auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    text-transform: uppercase;
    margin: 20px 0;
    color: #0d2636;
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    max-width: 400px;
    line-height: 1.4;
    text-align: center;
    color: #000;
  }
`;

export const BackButton = styled(Link)`
  color: #0d2636;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    div {
      flex: 1;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong {
      font-size: 15px;

      a {
        text-decoration: none;
        color: #222;
        transition: color 0.3s;

        &:hover {
          color: #0071db;
        }
      }

      span {
        background: #222;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        margin-left: 10px;
      }
    }
  }
`;
