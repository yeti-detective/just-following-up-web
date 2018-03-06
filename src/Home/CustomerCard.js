import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import validatePhoneNumber from '../scripts/validatePhoneNumber.js'
import Invoice from './Invoice.js'

export default class CustomerCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  toggleInfo () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    let pends = 0
    let owed = 0
    this.props.data.invoices.map((i) => {
      if (!i.deleted && !i.paid) {
        pends++
        i.charges.map((ch) => {
          owed += parseFloat(ch.charge)
        })
      }
    })
    return (
      <div style={{border: '1px solid grey', minWidth: 300}}>
        <Button style={{width: '100%'}} onClick={() => {this.toggleInfo()}}>{this.state.collapsed ? '+' : '-'}</Button>
        <div style={{padding: 4}}>
          <h4>{this.props.data.name}</h4>
          <h4><a href={`tel:${validatePhoneNumber(this.props.data.phNum)}`}>{this.props.data.phNum}</a></h4>
          <h4><a href={`mailto:${this.props.data.email}`} target="_blank">{this.props.data.email}</a></h4>
          <h5>{`Outstanding Invoices: ${pends}`}</h5>
          <h5>{`Total Owed: $${owed.toFixed(2)}`}</h5>
          {
            this.state.collapsed || (
              <div>
                <h4>{this.props.data.mail}</h4>
                <h4>{this.props.data.contact}</h4>
              </div>
            )
          }
          <Button onClick={() => {this.props.addInvoice(this.props.data.custNumber)}} bsStyle="primary" bsSize="small">Add Invoice</Button>
          <Button onClick={() => {this.props.editCustomer(this.props.data.custNumber - 1)}} bsStyle="info" bsSize="small">Edit Customer</Button>
          <Button onClick={() => {this.props.deleteCustomer(this.props.data.custNumber - 1)}} bsStyle="warning" bsSize="small">{this.props.data.deleted ? 'Undelete' : 'Delete'}</Button>
          { this.state.collapsed || (
            <div>
              { this.props.data.invoices.map((inv) => {
                if (!inv.deleted) {
                  return (
                    <Invoice
                      data={inv}
                      key={`inv:${inv.invNo}`}
                      editInvoice={this.props.editInvoice}
                      editCharge={this.props.editCharge}
                      deleteInvoice={this.props.deleteInvoice}
                      gotPaid={this.props.gotPaid}
                    />
                  )
                } else {
                  return null
                }
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
}
