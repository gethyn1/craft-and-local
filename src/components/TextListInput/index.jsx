// @flow

import React from 'react'

type Option = {
  id: string,
  value: string,
  option: string,
}

type Props = {
  options: ?Array<Option>,
  name: string,
  onChange: Function,
  onOptionSelect: (value: string) => void,
}

type State = {
  value: string,
}

class TextListInput extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
  }

  state: State
  props: Props
  handleChange: Function
  handleOptionSelect: Function

  handleChange(event: Event & { target: HTMLInputElement }) {
    this.props.onChange(event.target.value)

    this.setState({
      value: event.target.value,
    })
  }

  handleOptionSelect(option: Option) {
    this.props.onOptionSelect(option.value)

    this.setState({
      value: option.option,
    })
  }

  renderDataList() {
    const { options } = this.props

    if (options) {
      return (
        <ul>
          {options.map(option => (
            <li
              key={option.id}
              role="presentation"
              onClick={() => { this.handleOptionSelect(option) }}
            >
              {option.option}
            </li>
          ))}
        </ul>
      )
    }

    return null
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          name={this.props.name}
          value={this.state.value}
          autoComplete="off"
        />
        {this.renderDataList()}
      </div>
    )
  }
}

TextListInput.defaultProps = {
  onOptionSelect: () => {},
}

export default TextListInput
