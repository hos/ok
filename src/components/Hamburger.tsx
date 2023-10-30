import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface HamburgerProps {
  className?: string;
  onClick?: (_val: any) => void;
}

export const HamburgerUnstyled: React.FC<HamburgerProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>();

  useEffect(() => {
    const handle = () => {
      if (window.scrollY > 50) {
        ref.current?.classList.add("hide");
      } else {
        ref.current?.classList.remove("hide");
      }
    };
    document.addEventListener("scroll", handle);

    return () => document.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className={props.className} ref={(_ref) => (ref.current = _ref)}>
      <span onClick={props.onClick}>
        <hr />
        <hr />
        <hr />
      </span>
    </div>
  );
};

export const Hamburger = styled(HamburgerUnstyled)`
  width: 30px;
  top: 20px;
  left: 30px;
  display: none;
  position: fixed;
  transition: 0.5s;

  &.hide {
    opacity: 0;
  }

  .show-menu & {
    opacity: 1;
  }

  & hr {
    margin-top: 2px;
    margin-bottom: 2px;
    width: 100%;
    border-top: 2px solid #000;
  }

  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;
