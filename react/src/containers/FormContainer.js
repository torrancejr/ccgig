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
      taskDescription: '',
      taskLength: '',
      taskName: '',
      mealOptions: ['Today', 'Tomorrow', 'Next Week', '2 Weeks'],
      mealSelected: ''
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleConsumedChange = this.handleConsumedChange.bind(this);
    this.handleMealSelection = this.handleMealSelection.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.validateConsumedChange = this.validateConsumedChange.bind(this);
    this.validateMealSelection = this.validateMealSelection.bind(this);
    this.validateLocationChange = this.validateLocationChange.bind(this);
    this.validateNameChange = this.validateNameChange.bind(this);
    this.validateDescriptionChange = this.validateDescriptionChange.bind(this);
    this.validateLengthChange = this.validateLengthChange.bind(this);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      taskLocation: '',
      taskName: '',
      taskDescription: '',
      taskLength: '',
      foodItemConsumed: '',
      mealSelected: ''
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateConsumedChange(this.state.foodItemConsumed) &&
      this.validateNameChange(this.state.taskName) &&
      this.validateLengthChange(this.state.taskLength) &&
      this.validateLocationChange(this.state.taskLocation) &&
      this.validateDescriptionChange(this.state.taskDescription) &&
      this.validateMealSelection(this.state.mealSelected)
    ) {
      let formPayload = {
        name: this.state.taskName,
        location: this.state.taskLocation,
        description: this.state.taskDescription,
        length: this.state.taskLength,
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

  handleNameChange(event) {
    this.validateNameChange(event.target.value)
    this.setState({ taskName: event.target.value })
  }

  handleLocationChange(event) {
    this.validateLocationChange(event.target.value)
    this.setState({ taskLocation: event.target.value })
  }

  handleDescriptionChange(event) {
    this.validateDescriptionChange(event.target.value)
    this.setState({ taskDescription: event.target.value })
  }

  handleLengthChange(event) {
    this.validateLengthChange(event.target.value)
    this.setState({ taskLength: event.target.value })
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

  validateNameChange(name) {
    if (name === '' || name === ' ') {
      let newError = { taskName: 'Name may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.taskName
      this.setState({ errors: errorState })
      return true
    }
  }

  validateLocationChange(location) {
    if (location === '' || location === ' ') {
      let newError = { taskLocation: 'Location may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.taskLocation
      this.setState({ errors: errorState })
      return true
    }
  }

  validateDescriptionChange(description) {
    if (description === '' || description === ' ') {
      let newError = { taskDescription: 'Description may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.taskDescription
      this.setState({ errors: errorState })
      return true
    }
  }

  validateLengthChange(length) {
    if (length === '' || length === ' ') {
      let newError = { taskLength: 'Length may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.taskLength
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
          label='Consumed'
          name='consumed'
          handlerFunction={this.handleConsumedChange}
        />
        <TextField
          content={this.state.taskName}
          label='Name'
          name='name'
          handlerFunction={this.handleNameChange}
        />
        <TextField
          content={this.state.taskLocation}
          label='Location'
          name='location'
          handlerFunction={this.handleLocationChange}
        />
        <TextField
          content={this.state.taskDescription}
          label='Description'
          name='description'
          handlerFunction={this.handleDescriptionChange}
        />
        <TextField
          content={this.state.taskLength}
          label='Time Estimate'
          name='length'
          handlerFunction={this.handleLengthChange}
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
