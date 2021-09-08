import React from "react";
import styled from "styled-components";

interface HamburgerProps {
  onClick?: (_val: any) => void;
}

export const Hamburger: React.FC<HamburgerProps> = (props) => {
  return (
    <Span onClick={props.onClick}>
      <hr />
      <hr />
      <hr />
    </Span>
  );
};

const Span = styled.span`
  & {
    background-color: #fff;
    width: 30px;
    height: 30px;
    float: right;
    margin: 15px;
    display: none;
  }

  & > hr {
    margin-top: 2px;
    margin-bottom: 2px;
    width: 100%;
    border-top: 2px solid #000;
  }

  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;
