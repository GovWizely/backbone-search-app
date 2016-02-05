import React from 'react';

const style = {};

export const ArticleResultItem = ({ id, snippet, title, url }) => {
  return (
    <article style={ style }>
      <h1 className="title">
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </h1>
      <p className="url"><a target="_blank" href={ url }>{ url }</a></p>
      <p className="snippet" dangerouslySetInnerHTML={ { __html: snippet } }></p>
    </article>
  );
};

export const ArticleCardItem = ArticleResultItem;
