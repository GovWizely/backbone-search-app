import React from 'react';

export const i94_mppoe = {
  ResultItem: (props) => (
    <article className="mi-i94-mppoe mi-result__item">
      <header>{ props.port_of_entry } ({ props.port_code})</header>
      <table>
        <tbody>
          <tr>
            <td>December 2013:</td>
            <td>{ props.december_2013 }</td>
          </tr>
          <tr>
            <td>December 2014:</td>
            <td>{ props.december_2014 }</td>
          </tr>
          <tr>
            <td>Change:</td>
            <td>{ props.change }</td>
          </tr>
        </tbody>
      </table>
    </article>
  ),
  CardItem: ({ id, port_code, port_of_entry, december_2013, december_2014, change }) => (
    <article className="mi-i94-mppoe mi-card__item">
      <header>
        { port_of_entry } ({ port_code })
      </header>
      <pre>
        December 2013: { december_2013 }  |  December 2014: { december_2014 }
        <br />
        Change: { change }
      </pre>
    </article>
  )
};
