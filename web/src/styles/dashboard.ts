import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 1400px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .col-8 {
    max-width: 100%;
    width: 705px;
  }
  .col-4 {
    width: 340px;
  }

  @media only screen and (max-width: 700px) {
    //s flex-direction: columns;
    .col-4,
    .col-8 {
      width: 100%;
    }
  }
`;
