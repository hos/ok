import styled from "styled-components";

interface TextProps {
  className?: string;
}

export const Text = styled.div<TextProps>`
  padding: 40px 0;
`;
