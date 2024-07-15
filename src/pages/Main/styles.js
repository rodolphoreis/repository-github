import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 17px;
  }
`;
// Animação do botão "loading"
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
// ...........End............

export const SubmitButton = styled.button.attrs((props) => ({
  type: `submit`,
  disabled: props.loading,
}))`
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 30px;
  list-style: none;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;

    & + li {
      border-top: 1px solid #ddd;
    }
  }

  a {
    color: #0d2636;
    text-decoration: none;

    svg {
      &:hover {
        fill: gray;
      }
    }
  }

  span {
    flex: 1;
    margin-right: 10px;
  }
`;

export const DeleteButton = styled.button.attrs({
  type: `button`,
})`
  margin-left: 6px;
  background: transparent;
  color: #0d2636;
  border: 0;
  border-radius: 4px;
  padding: 8px 7px;
  outline: 0;

  svg {
    fill: #0d2636;

    &:hover {
      fill: gray;
    }
  }
`;
