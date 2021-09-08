import React from "react";
import styled from "styled-components";

import { Meta } from "../components/Meta";

interface BiographyProps {
  _?: void;
}

export const Biography: React.FC<BiographyProps> = () => {
  return (
    <Container>
      <Meta />
    </Container>
  );
};

const Container = styled.div``;

export default Biography;
