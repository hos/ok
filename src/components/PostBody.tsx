import React from "react";

interface PostBody {
  content: string;
}

export const PostBody: React.FC<PostBody> = ({ content }) => {
  return (
    <div className="pb-5">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
