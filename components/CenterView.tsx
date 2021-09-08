import React from "react";
import styled from "styled-components";

interface CenterViewProps {
  _?: void;
}

export const CenterView: React.FC<CenterViewProps> = styled.div<CenterViewProps>`
  display: inline-flex;
  margin: 50px auto 0 auto;
  width: 100%;
  min-height: 80vh;
  text-align: center;

  & .article {
    text-align: center;
    margin: 0 auto;
    width: 70%;
  }
`;
