import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'
import DisplayCharge from './DisplayCharge.js'

import formatFromISOString from '../scripts/formatFromISOString.js'

const formStyle = {
  position: 'fixed',
  top: '10%',
  left: '10%',
  border: '1px solid grey',
  width: '80%',
  background: '#fff',
  paddingBottom: 5
}

export default class NewInvoiceForm extends Component {
  render () {
    return (
      <div style={formStyle}>
        <div
          style={{float: 'right', color: '#fff', background: 'grey', width: 20, height: 20, cursor: 'pointer'}}
          onClick={() => {this.props.closeNewInvoiceForm()}}>x
        </div>
        <div>
          <h3>{this.props.customer[this.props.data.custNumber - 1].name}</h3>
          <h3><a href={`tel:${this.props.customer[this.props.data.custNumber - 1].phNum}`}>{this.props.customer[this.props.data.custNumber - 1].phNum}</a></h3>
        </div>
        <FormGroup style={{width: '70%', margin: 'auto'}}>
          <h4>Due Date: </h4>
          <DatePicker
            selected={new Date().toISOString()}
            inputRef={node => {this.due = node}}
            id='datePicker'
            value={this.props.data.due ? new Date(this.props.data.due).toISOString() : this.props.data.due}
            onChange={(date) => {this.props.invUpdate('due', date)}}
          />
          {this.props.data.charges.map((charge) => {
            return (
              <DisplayCharge
                key={charge.lineNo}
                charge={charge}
                deleteCharge={this.props.deleteCharge}
                nv={true}
              />
            )
          })}
          <h4>Charge Description</h4>
          <FormControl
            type="text"
            id="chargeDescription"
            inputRef={node => {this.description = node}}
            value={this.props.values.description}
            onChange={()=> {this.props.updateCharge('description', this.description.value)}}
          />
          <h4>Charge Amt: </h4>
          <FormControl
            type="text"
            inputRef={node => {this.charge = node}}
            value={this.props.values.charge}
            onChange={()=> {this.props.updateCharge('charge', this.charge.value)}}
          />
          <Button onClick={() => {{this.props.addCharge()}}}>Add Charge</Button>
          <Button onClick={() => {this.props.save()}}>Save</Button>
        </FormGroup>
      </div>
    )
  }
}
