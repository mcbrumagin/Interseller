import React from 'react'

// TODO: REFACTOR
var injectAll = function (context, ...methods) {
  for (let method of methods) {
    method = method.bind(this)
  }
}

export class Form extends React.Component {

  constructor(props) {
    super(props)
    injectAll(this, this.createFormInputValueSetter, this.getElemForType)
    this.state = { form: {} }
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.form)
  }

  createFormInputValueSetter(name) {
    let _ = this
    return function setFormValue(event) {
      _.state.form[name] = event.target.value
      _.setState(_.state)
    }
  }

  getElemForType(name, val) {
    if (val === 'textarea') {
      return <textarea name={name}></textarea>
    }

    if (['text', 'password', 'number', 'date', 'email'].contains(val)) {
      let handler = this.createFormInputValueSetter(name)
      return <input key={name} name={name} type={val} onChange={handler}/>
    }

    throw new Error(`"${val}" is not a valid input type!`)
  }

  render() {

    var inputElems = []
    for (let name in this.props.inputs) {
      inputElems.push(this.getElemForType(name, this.props.inputs[name]))
    }

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        {inputElems}
        {this.props.children}
      </form>
    )
  }
}

// TODO: Why does this suck?
//Form.propTypes = {
//  onSubmit: React.PropTypes.element.isRequired,
//  inputs: React.PropTypes.element.isRequired
//}
