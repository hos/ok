import React from "react";

interface PostBody {
  content: string;
}

export const PostBody: React.FC<PostBody> = ({ content }) => {
  return (
    <article
      className="pb-16 text-[15px] leading-[1.7] tracking-[-0.005em] [&_h1]:m-0 [&_h1]:mb-1 [&_h1]:text-2xl [&_h1]:leading-tight [&_h1]:font-normal [&_h1]:text-red [&_p]:mb-6 [&_p:last-child]:mb-0 [&_.byline]:mb-10 [&_.byline]:text-[11px] [&_.byline]:leading-5 [&_.byline]:tracking-[0.08em] [&_.byline]:uppercase [&_.byline]:opacity-50 [&_.signature]:mt-4 [&_.signature]:text-[11px] [&_.signature]:leading-5 [&_.signature]:tracking-[0.08em] [&_.signature]:uppercase [&_.signature]:opacity-50 [&_.meta]:text-[11px] [&_.meta]:leading-5 [&_.meta]:tracking-[0.08em] [&_.meta]:uppercase [&_.meta]:opacity-50 [&_figcaption]:mt-2 [&_figcaption]:text-[11px] [&_figcaption]:leading-5 [&_figcaption]:tracking-[0.02em] [&_figcaption]:opacity-50"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
