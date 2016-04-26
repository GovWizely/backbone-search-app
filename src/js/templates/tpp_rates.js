import { keys, map, pick, round, startCase, toNumber } from 'lodash';
import React from 'react';

const AnnualRates = ({ annualRates, baseRate, showRates }) =>  {
  const rates = showRates ? map(annualRates, (rate, year) => (
    <tr key={ year }>
      <td className="mi-tpp-rates__annual-rates__label">{ startCase(year) }</td>
      <td className="mi-tpp-rates__annual-rates__value">
        { toNumber(rate) === 0 ? 'Free' : rate }
      </td>
    </tr>
  )) : null;
  return (
    <table className="mi-tpp-rates__annual-rates">
      <tbody>
        <tr>
          <td className="mi-tpp-rates__annual-rates__label">Base Rate</td>
          <td className="mi-tpp-rates__annual-rates__value">{ round(baseRate, 1) }</td>
        </tr>
        { rates }
      </tbody>
    </table>
  );
};

class TPPRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showRates: false };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setState({ showRates: this.props.showRates || false });
  }

  showComponentUpdate(nextProps, nextState) {
    return nextState.showRates !== this.state.showRates;
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ showRates: !this.state.showRates });
  }

  render() {
    const {
      annual_rates, base_rate, rule_text, subheading_description, staging_basket, tariff_line
    } = this.props;
    const { showRates } = this.state;
    const expanderText = showRates ? 'Collapse' : 'Expand';
    return (
      <article className="mi-tpp-rates mi-result__item">
        <header>
          { subheading_description }
        </header>
        <p>HS Code: { tariff_line }</p>
        <p>Staging Basket: { staging_basket }</p>
        <p>Rule of Origin: { rule_text }</p>
        <AnnualRates annualRates={ annual_rates } baseRate={ base_rate } showRates={ showRates }/>
        <div aria-role="button" className="mi-tpp-rates__expander" onClick={ this.onClick }>
          { expanderText }
        </div>
      </article>
    );
  }
}

export const tpp_rates = {
  ResultItem: (props, options = {}) => (
    <TPPRates { ...props } showRates={ options.showRates } />
  ),
  CardItem: ({ id, subheading_description, tariff_line }) => (
    <article className="mi-tpp-rates mi-card__item">
      <header>
        { tariff_line } { subheading_description }
      </header>
    </article>
  ),
  getOptions: (props) => ({
    showRates: props.result.metadata.total === 1
  })
};
