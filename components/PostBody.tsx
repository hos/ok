import React from "react";
import styled from "styled-components";

interface PostBody {
  content: string;
}

export const PostBody: React.FC<PostBody> = ({ content }) => {
  return (
    <Container className="max-w-2xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 40px;
`;
