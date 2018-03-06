import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

export default class IDForm extends Component {

  update (id) {
    this.props.idUpdate(id, this[id].value)
    //console.log(this[id].value)
  }

  render () {
    return (
      <div style={{alignText: 'center'}}>
        <h2>About You:</h2>
        <FormGroup style={{width: '70%', margin: 'auto'}}>
          <FormControl
            type="text"
            placeholder="your name"
            value={this.props.id.name}
            inputRef={node => {this.name = node}}
            onChange={()=>{this.update('name')}}
          />
          <FormControl
            type="text"
            placeholder="your email"
            value={this.props.id.email}
            inputRef={node => {this.email = node}}
            onChange={() => {this.update('email')}}
          />
          <FormControl
            type="text"
            placeholder="phone number"
            value={this.props.id.phNum}
            inputRef={node => {this.phNum = node}}
            onChange={() => {this.update('phNum')}}
          />
          <FormControl
            type="text"
            placeholder="business name (optional)"
            value={this.props.id.businessName}
            inputRef={node => {this.businessName = node}}
            onChange={() => { this.update('businessName') }}
          />
        </FormGroup>
        <Button
          onClick={() => {this.props.save()}}>
            Save
          </Button>
      </div>
    )
  }
}
