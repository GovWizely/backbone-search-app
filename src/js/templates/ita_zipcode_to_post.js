import React from 'react';

function addHTTP(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

export const ita_zipcode_to_post = {
  ResultItem: ({ address, office_name }) => {
    const url = addHTTP(address[address.length-1]);
    return (
      <article className="mi-ita-zipcode-to-post mi-result__item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: office_name } }></a>
        </header>
        <p className="url"><a href={ url }>{ url }</a></p>
        <p dangerouslySetInnerHTML={ { __html: address } }></p>
      </article>
    );
  },
  CardItem: ({ address, office_name }) => {
    const url = addHTTP(address[address.length-1]);
    return (
      <article className="mi-ita-zipcode-to-post mi-card__item">
        <header>
          <a href={ url } dangerouslySetInnerHTML={ { __html: office_name } }></a>
        </header>
        <p dangerouslySetInnerHTML={ { __html: address } }></p>
      </article>
    );
  }
};
