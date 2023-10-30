import { FC } from "react";
import styled from "styled-components";

interface CenterViewProps extends FC {
  $text?: boolean;
}

export const CenterView = styled.div<CenterViewProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${(props) => (props.$text ? "800px" : "100%")};
  margin: 0 auto;
  justify-content: flex-start;
`;
