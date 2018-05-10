import React from 'react';

import { Checkbox } from 'carbon-components-react';

class CheckboxAtom extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: props.input.value };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.state.value) {
      this.setState({ value: nextProps.input.value });
    }
  }

  // handleBlur() {
  //   this.props.input.onBlur();
  // }

  handleChange(value) {
    this.props.input.onChange(value);
    this.setState({ value: value });
  }
  

  render() {
    const { input, label, meta: { touched, error }, ...rest } = this.props;
    const { value } = this.state;

    return (
      <div style={{ marginBottom: '16px' }}>
        <Checkbox
          {...input}
          {...rest}
          name={input.name}
          id={input.name}
          checked={value}
          type="checkbox"
          labelText={label}
          onChange={this.handleChange}
          className="mr2 v-mid"
          invalid={touched && error}
          invalidText={error}
        />
      </div>
    );
  }
}

export default CheckboxAtom;
