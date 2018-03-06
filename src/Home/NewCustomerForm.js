import React, { Component } from 'react'
import { FormControl, FormGroup, Button } from 'react-bootstrap'

const formStyle = {
  position: 'fixed',
  top: '10%',
  left: '10%',
  border: '1px solid grey',
  width: '80%',
  background: '#fff'
}

export default class NewCustomerForm extends Component {
  componentDidMount () {
    document.getElementById('custNameField').focus()
  }

  render () {
    return (
      <FormGroup style={formStyle}>
        <div
          onClick={() => {this.props.xButton()}}
          style={{float: 'right', color: '#fff', background: 'grey', width: 20, height: 20, cursor: 'pointer'}}
          >
          x
        </div>
        <div style={{width: '90%', margin: 'auto', marginTop: 15}}>
          <FormControl
            type="text"
            placeholder="customer name"
            id="custNameField"
            value={this.props.data.name}
            inputRef={node => {this.custName = node}}
            onChange={() => {this.props.custUpdate('name', this.custName.value)}}
          />
          <FormControl
            type="text"
            placeholder="phone number"
            value={this.props.data.phNum}
            inputRef={node => {this.phNum = node}}
            onChange={() => {this.props.custUpdate('phNum', this.phNum.value)}}
          />
          <FormControl
            type="text"
            placeholder="email"
            value={this.props.data.email}
            inputRef={node => {this.email = node}}
            onChange={() => {this.props.custUpdate('email', this.email.value)}}
          />
          <FormControl
            type="text"
            placeholder="mailing address"
            value={this.props.data.mail}
            inputRef={node => {this.mail = node}}
            onChange={() => {this.props.custUpdate('mail', this.mail.value)}}
          />
          <FormControl
            type="text"
            placeholder="contact person"
            value={this.props.data.contact}
            inputRef={node => {this.contact = node}}
            onChange={() => {this.props.custUpdate('contact', this.contact.value)}}
          />
          <Button
            bsStyle="primary"
            onClick={() => {this.props.isEditing ? this.props.saveEditCustomer(this.props.data.custNumber - 1) : this.props.saveCustomer()}}>
            Save Customer
          </Button>
        </div>
      </FormGroup>
    )
  }
}
