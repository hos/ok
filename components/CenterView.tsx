import React from "react";
import styled from "styled-components";

interface CenterViewProps {
  _?: void;
  text?: boolean;
}

export const CenterView: React.FC<CenterViewProps> = styled.div<CenterViewProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.text ? "800px" : "90%")};
  margin: 0 auto;
  justify-content: flex-start;
`;
