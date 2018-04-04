import React, { PropTypes } from 'react';
import { filter, isEmpty, reduce } from 'lodash';
import { reduxForm } from 'redux-form';
import Autosuggest from 'react-autosuggest';


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);


class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      suggestions: [] 
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidUpdate(){
    const apis = filter(this.props.selectedAPIs, api => api.result.enable);
    const api = apis[0];
    const typeaheads = this.props.typeaheads[api.pathname].typeaheads;
  }

  onInputChange(e){
    console.log(e.target.value)
  }

  getSuggestions = value => {
    const apis = filter(this.props.selectedAPIs, api => api.result.enable);
    const api = apis[0];
    const typeaheads = this.props.typeaheads[api.pathname].typeaheads;

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const return_array = inputLength < 2 ? [] : typeaheads.filter(val => {
        //console.log(val)
        //console.log(inputValue)
        let new_val = val.trim().toLowerCase()
        return new_val.includes(inputValue);
      }
    );
    console.log(return_array)
    return return_array;
  };

    // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    console.log(event)
    console.log(suggestion)
    this.props.fields.q.onChange(suggestion)
  }

  render(){
    const { fields, focused, handleSubmit } = this.props;
    const inputProps = {
      className: "mi-form__field",
      autoFocus: focused,
      type: "text",
      placeholder: "Keyword",
      'aria-label': "Enter keyword",
      ...fields.q
    };
    return(
      <form className="mi-form" onSubmit={ handleSubmit }>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />

        <span className="mi-form__submit">
          <button className="uk-button mi-form__submit__button" onClick={ handleSubmit } title="Search">
            <i className="mi-icon mi-icon-search" aria-label="Search" />
          </button>
        </span>
      </form>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  focused: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
};

Form.defaultProps = {
  focused: false
};

export default reduxForm({
  form: 'form',
  fields: ['q']
}, state => ({
  initialValues: state.query
}))(Form);
