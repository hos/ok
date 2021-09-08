import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 70%;
  height: 600px;
  margin: 0 auto;

  & a span:first-child {
    height: 100%;
  }

  & a span:last-child {
    height: 100%;
  }

  & img {
    max-width: 80%;
    max-height: 500px;
    margin: auto;
  }

  & > div {
    white-space: nowrap;
  }

  @media screen and (min-width: 2000px) {
    max-width: 100%;
    margin: auto;

    & img {
      max-height: 1200px;
      margin: auto;
    }
  }

  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;
