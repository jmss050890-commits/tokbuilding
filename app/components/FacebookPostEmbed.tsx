'use client';

import { useEffect } from 'react';

type FacebookPostEmbedProps = {
  postUrl: string;
  permalinkUrl: string;
  pageUrl: string;
  pageName: string;
  postedLabel: string;
};

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: (node?: Element) => void;
      };
    };
  }
}

export default function FacebookPostEmbed({
  postUrl,
  permalinkUrl,
  pageUrl,
  pageName,
  postedLabel,
}: FacebookPostEmbedProps) {
  useEffect(() => {
    const parseEmbed = () => {
      if (window.FB?.XFBML?.parse) {
        window.FB.XFBML.parse();
      }
    };

    parseEmbed();
    const timer = window.setTimeout(parseEmbed, 900);

    return () => window.clearTimeout(timer);
  }, [postUrl]);

  return (
    <div className="overflow-x-auto">
      <div
        className="fb-post md:hidden"
        data-href={postUrl}
        data-width="320"
        data-show-text="true"
      >
        <blockquote cite={permalinkUrl} className="fb-xfbml-parse-ignore">
          Posted by <a href={pageUrl}>{pageName}</a> on <a href={permalinkUrl}>{postedLabel}</a>
        </blockquote>
      </div>
      <div
        className="fb-post hidden md:block"
        data-href={postUrl}
        data-width="500"
        data-show-text="true"
      >
        <blockquote cite={permalinkUrl} className="fb-xfbml-parse-ignore">
          Posted by <a href={pageUrl}>{pageName}</a> on <a href={permalinkUrl}>{postedLabel}</a>
        </blockquote>
      </div>
    </div>
  );
}
