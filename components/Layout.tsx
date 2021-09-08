import styled from "styled-components";

import { Menu } from "./Nav";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Container>
      <Main>{props.children}</Main>
      <Menu />
    </Container>
  );
};

const Main = styled.main`
  width: 75%;
  min-height: 100vh;
  display: inline-flex;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
