import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

let style = {
  position: 'fixed',
  top: '20%',
  left: '20%',
  border: '1px solid grey',
  width: '75%',
  background: '#fff',
  padding: 4
}

export default class EditCharge extends Component {
  render () {
    return (
      <div style={style}>
        <FormGroup>
          <h3>Description</h3>
          <FormControl
            type="text"
            inputRef={node => {this.description = node}}
            value={this.props.charge.description}
            onChange={() => {this.props.updateCharge('description', this.description.value)}}
          />
          <h3>Amount</h3>
          <FormControl
            type="text"
            inputRef={node => {this.charge = node}}
            value={this.props.charge.charge}
            onChange={() => {this.props.updateCharge('charge', this.charge.value)}}
          />
          <Button bsStyle='primary'
            onClick={() => {this.props.save()}}>Save</Button>
        </FormGroup>
      </div>
    )
  }
}
