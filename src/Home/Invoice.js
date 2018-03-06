import React from 'react'
import { Button } from 'react-bootstrap'

import DisplayCharge from './DisplayCharge.js'
import formatFromISOString from '../scripts/formatFromISOString.js'

export default function Invoice (props) {

  let total = 0
  return (
    <div className="invoice" style={{border: '1px solid #7C7575', padding: 4}}>
      <p>{`invoice number: ${props.data.invNo}`}</p>
      <p>{`due on: ${formatFromISOString(props.data.due)}`}</p>
      {props.data.charges.map((charge) => {
        total += parseFloat(charge.charge)
        return (
          <DisplayCharge
            key={`chargeNo${charge.lineNo}`}
            invNo={props.data.invNo}
            charge={charge}
            editCharge={props.editCharge}
            nv={false}
          />
        )
      })}
      <p>{`total due: $${parseFloat(total).toFixed(2)}`}</p>
      <Button onClick={() => {props.gotPaid(props.data)}} bsSize="small">{props.data.paid ? 'Paid' : 'Pending'}</Button>
      <Button bsStyle="info" onClick={() => {props.editInvoice(props.data)}} bsSize="small">Edit</Button>
      <Button bsStyle="warning" onClick={() => {props.deleteInvoice(props.data)}} bsSize="small">Delete Invoice</Button>
    </div>
  )
}
