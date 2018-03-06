import React, { Component } from 'react'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu'

export default class SettingsMenu extends Component {
  render () {
    return (
      <DropdownMenu>
        <MenuItem text="Show Deleted Customers" onClick={() => {this.props.showDeletedCustomers()}}></MenuItem>
      </DropdownMenu>
    )
  }
}
