import React from 'react'
import { Col, Button } from 'react-bootstrap'

import CustomerCard from './CustomerCard.js'
import validatePhoneNumber from '../scripts/validatePhoneNumber.js'
import formatFromISOString from '../scripts/formatFromISOString.js'

export default function IDCard (props) {
  return (
    <div style={{width: '100%', textAlign: 'left', display: 'inline-block'}} id="idcard">
    <Button onClick={() => {props.addCustomer()}} bsStyle="info">Add Customer</Button>
    <Button onClick={() => {props.edit()}}>Edit Company Info</Button>
      <Col md={12}>
        <h4>{props.id.name}</h4>
        <h4><a href={'mailto:' + props.id.email} target="_blank">{props.id.email}</a></h4>
        <h4>{props.id.businessName}</h4>
        <h4><a href={'tel:' + validatePhoneNumber(props.id.phNum)}>{props.id.phNum}</a></h4>
        {props.nextPayDate.due ?
          <h4>{`Next pay date: `}<span style={{color: '#337ab7', cursor: 'pointer'}} onClick={() => {props.editInvoice(props.nextPayDate)}}>{`${formatFromISOString(props.nextPayDate.due)}`}</span></h4> :
          null
        }
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {props.id.customers.map((customer) => {
            if (!customer.deleted || props.showDeletedCustomers) {
              return (
                <CustomerCard
                  addInvoice={props.showInvoiceForm}
                  editCustomer={props.editCustomer}
                  key={'customer:' + customer.custNumber}
                  data={customer}
                  save={props.saveButton}
                  editInvoice={props.editInvoice}
                  loadInvoice={props.loadInvoice}
                  editCharge={props.editCharge}
                  deleteInvoice={props.deleteInvoice}
                  deleteCustomer={props.deleteCustomer}
                  gotPaid={props.gotPaid}
                />
              )
            }
          })}
        </div>
      </Col>
    </div>
  )
}
