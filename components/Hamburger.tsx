import React from "react";
import styled from "styled-components";

interface HamburgerProps {
  className?: string;
  onClick?: (_val: any) => void;
}

export const _Hamburger: React.FC<HamburgerProps> = (props) => {
  return (
    <span className={props.className} onClick={props.onClick}>
      <hr />
      <hr />
      <hr />
    </span>
  );
};

export const Hamburger = styled(_Hamburger)`
  background-color: #fff;
  width: 30px;
  margin: 30px;
  display: none;

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
