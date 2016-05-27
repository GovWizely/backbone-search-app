import React from 'react';

export const i94_mpcty = {
  ResultItem: ({ id, sa_report_code, country_code, country_of_residence, december_2013, december2014, change }) => (
    <article className="mi-i94-mpcty mi-result__item">
      <header>SA Report Code: { sa_report_code }</header>
      <table>
        <tbody>
          <tr>
            <td>Country of Residence:</td>
            <td>{ country_of_residence } ({ country_code })</td>
          </tr>
          <tr>
            <td>December 2013:</td>
            <td>{ december_2013 }</td>
          </tr>
          <tr>
            <td>December 2014:</td>
            <td>{ december2014 }</td>
          </tr>
          <tr>
            <td>Change:</td>
            <td>{ change }</td>
          </tr>
        </tbody>
      </table>
    </article>
  ),
  CardItem: ({ id, sa_report_code, country_code, country_of_residence, december_2013, december2014, change }) => (
    <article className="mi-i94-mpcty mi-card__item">
      <header>SA Report Code: { sa_report_code }</header>
      <pre>
        December 2013: { december_2013 }  |  December 2014: { december2014 }
        <br />
        Change: { change }
      </pre>
    </article>
  )
};
