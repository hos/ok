import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (min-width: 2000px) {
    max-width: 100%;
    margin: auto;

    & img {
      max-height: 1200px;
      margin: auto;
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
