import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useRef, useState } from "react";
import styled from "styled-components";

interface OverlayProps {}

export const Overlay: FC<OverlayProps> = (props) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const ref = useRef<any>();

  const enableFocusMode = useCallback(() => {
    clearTimeout(ref.current);
    setIsFocusMode(false);
    ref.current = setTimeout(() => {
      setIsFocusMode(true);
    }, 2000);
  }, [setIsFocusMode]);

  return (
    <Container
      className={isFocusMode ? "focus" : ""}
      onMouseMove={() => enableFocusMode()}
    >
      <CloseButton />
      {props.children}
    </Container>
  );
};

export default Overlay;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 1);
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CloseButton = () => {
  const router = useRouter();

  return (
    <ButtonContainer>
      <Link
        href={{ query: {}, pathname: router.asPath.split("?")?.[0] }}
        passHref
        shallow
      >
        <a>
          <svg height="100%" width="100%" viewBox="0 0 32 32">
            <title />
            <g id="cross" stroke="#fff" fill="#fff" strokeWidth={2}>
              <line x1="7" x2="25" y1="7" y2="25" />
              <line x1="7" x2="25" y1="25" y2="7" />
            </g>
          </svg>
        </a>
      </Link>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.5s ease-in-out;

  ${Container}.focus & {
    opacity: 0;
  }
`;
