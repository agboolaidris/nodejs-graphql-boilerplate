import styled from "styled-components";

export const RegisterWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  .header {
    text-align: center;
    padding: 20px;
  }
  & > div {
    width: 500px;
    max-width: 100%;
    background: #ffffff;
    padding: 20px;
    min-height: 500px;
    form {
      & > div {
        margin-top: 10px;
        &:first-child {
          margin-top: 0;
        }
      }
      button {
        margin-top: 10px;
      }
    }
  }
`;
