import React from 'react'
import { Modal } from 'react-bootstrap'

const style = {
  width: '100%',
  display: 'flex',
  background: 'rgba(0, 0, 0, 0.25)',
  color: '#666'
}

export default function Footer () {
  return (
    <Modal.Footer style={style}>
      <p>Motomorphosis Industries</p>
      <div style={{width: '80%'}}></div>
      <p>©2017</p>
    </Modal.Footer>
  )
}
