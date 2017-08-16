import React, { Component } from 'react';
import Select from '../components/Select';
import TextField from '../components/TextField';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      foodItemConsumed: '',
      taskLocation: '',
      mealOptions: ['Today', 'Tomorrow', 'Next Week', '2 Weeks'],
      mealSelected: ''
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleConsumedChange = this.handleConsumedChange.bind(this);
    this.handleMealSelection = this.handleMealSelection.bind(this);
    this.validateConsumedChange = this.validateConsumedChange.bind(this);
    this.validateMealSelection = this.validateMealSelection.bind(this);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      taskLocation: '',
      foodItemConsumed: '',
      mealSelected: ''
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateConsumedChange(this.state.foodItemConsumed) &&
      this.validateLocationChange(this.state.taskLocation) &&
      this.validateMealSelection(this.state.mealSelected)
    ) {
      let formPayload = {
        location: this.state.taskLocation,
        food: this.state.foodItemConsumed,
        meal: this.state.mealSelected
      };
      this.props.trackConsumption(formPayload);
      this.handleClearForm(event);
    } //props.addNewAricle
  }

  handleConsumedChange(event) {
    this.validateConsumedChange(event.target.value)
    this.setState({ foodItemConsumed: event.target.value })
  }

  handleLocationChange(event) {
    this.validateLocationChange(event.target.value)
    this.setState({ taskLocation: event.target.value })
  }

  handleMealSelection(event) {
    this.validateMealSelection(event.target.value)
    this.setState({ mealSelected: event.target.value })
  }

  validateConsumedChange(consumed) {
    if (consumed === '' || consumed === ' ') {
      let newError = { foodItemConsumed: 'Task may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.foodItemConsumed
      this.setState({ errors: errorState })
      return true
    }
  }

  validateLocationChange(location) {
    if (location === '' || location === ' ') {
      let newError = { taskLocation: 'Task may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.taskLocation
      this.setState({ errors: errorState })
      return true
    }
  }

  validateMealSelection(selection) {
    if (selection === '') {
      let newError = { mealSelected: 'You must select a day.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.mealSelected
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return (
      <form className="callout" onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <TextField
          content={this.state.foodItemConsumed}
          label='Name of Task'
          name='consumed'
          handlerFunction={this.handleConsumedChange}
        />
        <TextField
          content={this.state.taskLocation}
          label='Location'
          name='location'
          handlerFunction={this.handleLocationChange}
        />
        <TextField
          content={this.state.foodItemConsumed}
          label='Description'
          name='consumed'
          handlerFunction={this.handleConsumedChange}
        />
        <TextField
          content={this.state.foodItemConsumed}
          label='Time Estimate'
          name='consumed'
          handlerFunction={this.handleConsumedChange}
        />
        <Select
          handlerFunction={this.handleMealSelection}
          name='meal'
          label='Day you want this done'
          options={this.state.mealOptions}
          selectedOption={this.state.mealSelected}
        />
        <div className="button-group">
          <button className="button" onClick={this.handleClearForm}>Clear</button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default FormContainer;
