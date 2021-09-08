import React from "react";
import styled from "styled-components";

interface CenterViewProps {
  _?: void;
}

export const CenterView: React.FC<CenterViewProps> = styled.div<CenterViewProps>`
  display: inline-flex;
  width: 100%;
  text-align: center;
  align-items: center;

  & .article {
    text-align: center;
    margin: 0 auto;
    width: 70%;
  }
`;
