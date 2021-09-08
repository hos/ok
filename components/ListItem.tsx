import styled from "styled-components";

export const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  & a {
    font-size: 12px;
    padding: 1px;
    color: #000000;
    text-decoration: none;
  }

  & a:hover {
    background-color: rgb(201, 75, 73);
    color: #fff;
  }

  & a.selected {
    background-color: #222;
    color: #fff;
    box-shadow: none;
  }
`;

export const Li = styled.li`
  & {
    line-height: 20px;
  }

  .hidden & {
    display: none;
  }

  .submenu & {
    padding-left: 10px;
  }
`;
