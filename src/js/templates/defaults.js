import React from 'react';

export const defaults = {
  ResultItem: ({ id, snippet, title, url }) => {
    return (
      <article>
        <header className="title">
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
        <p className="url"><a target="_blank" href={ url }>{ url }</a></p>
      </article>
    );
  },
  CardItem: ({ id, snippet, title, url }) => {
    return (
      <article>
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
        </header>
      </article>
    );
  }
};
