import React from 'react';

import { TextInput } from 'carbon-components-react';

class InputAtom extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.state = { value: props.input.value };
  }

  handleChange(e) {
    const { input } = this.props;

    input.onChange(e.target.value);
    // this.setState({ value: e.target.value });
  }

  render() {
    const { input, label, meta: { touched, error }, ...rest } = this.props;
    // const { value } = this.state;
    // let className = 'ba b--black-20 ph2 pv1 lh-custom db w-100 br2 ' + rest.className + ' ';

    return (
      <div style={{ marginBottom: '16px' }}>
        <TextInput
          {...input}
          {...rest}
          labelText={label}
          onChange={this.handleChange}
          invalid={touched && error}
          invalidText={error}
        />
      </div>
    );
  }
}

export default InputAtom;
