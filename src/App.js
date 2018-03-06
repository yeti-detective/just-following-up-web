// todo: mark overdue customers/invoices
// todo: fix next pay date display (doesn't update on invoice edit)
import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

import IDForm from './Home/IDForm.js'
import IDCard from './Home/IDCard.js'
import NewInvoiceForm from './Home/NewInvoiceForm.js'
import Logo from './Home/Logo.js'
import NewCustomerForm from './Home/NewCustomerForm.js'
import EditCharge from './Home/EditCharge.js'
import SettingsMenu from './Home/SettingsMenu.js'
import Exposition from './Home/Exposition.js'
import Footer from './Home/Footer.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        name: '',
        phNum: '',
        businessName: '',
        email: '',
        customers: []
      },
      newCustomer: {
        name: '',
        phNum: '',
        email: '',
        mail: '',
        contact: '',
        invoices: []
      },
      newInvoice: {
        custNumber: '',
        invNo: '',
        due: '',
        charges: [],
        deleted: false,
        paid: false
      },
      newCharge: {
        lineNo: '',
        description: '',
        charge: ''
      },
      showIDForm: false,
      showNewCustomerForm: false,
      showNewInvoiceForm: false,
      editCustomer: false,
      showEditCharge: false,
      showDeletedCustomers: false,
      nextPayDate: {
        due: '',
        invNo: ''
      },
      overdueDate: {
        due: '',
        invNo: ''
      }
    }
    this.idUpdate = this.idUpdate.bind(this)
    this.saveButton = this.saveButton.bind(this)
    this.addInvoice = this.addInvoice.bind(this)
    this.deleteInvoice = this.deleteInvoice.bind(this)
    this.invUpdate = this.invUpdate.bind(this)
    this.saveNewInvoice = this.saveNewInvoice.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this)
    this.showCustomerForm = this.showCustomerForm.bind(this)
    this.showIDForm = this.showIDForm.bind(this)
    this.customerUpdate = this.customerUpdate.bind(this)
    this.saveCustomer = this.saveCustomer.bind(this)
    this.editCustomer = this.editCustomer.bind(this)
    this.saveEditCustomer = this.saveEditCustomer.bind(this)
    this.updateCharge = this.updateCharge.bind(this)
    this.addCharge = this.addCharge.bind(this)
    this.toggleInvoiceForm = this.toggleInvoiceForm.bind(this)
    this.editCharge = this.editCharge.bind(this)
    this.deleteCharge = this.deleteCharge.bind(this)
    this.saveEditCharge = this.saveEditCharge.bind(this)
    this.gotPaid = this.gotPaid.bind(this)
    this.nextPayDate = this.nextPayDate.bind(this)
    this.closeNewInvoiceForm = this.closeNewInvoiceForm.bind(this)
    this.showDeletedCustomers = this.showDeletedCustomers.bind(this)
  }


  componentDidMount () {
    setTimeout(() => {
      this.getInvoices()
    }, 500)
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  updateCharge(field, txt) {
    let newCharge = Object.assign({}, this.state.newCharge)
    newCharge[field] = txt
    this.setState({
      newCharge: newCharge
    })
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.setState({
      data: {},
      showIDForm: false
    })
    localStorage.clear()
    this.props.auth.logout();
  }

  nextPayDate () {
    let dateArr = []
    let data = this.state.data
    data.customers.map((cust) => {
      dateArr.push(...cust.invoices)
    })
    dateArr.sort((a, b) => {
      return Date.parse(a.due) - Date.parse(b.due)
    })
    this.setState({
      nextPayDate: dateArr[0]
    })
  }

  addInvoice (cNo) {
    let newInvoice = Object.assign({}, this.state.newInvoice)
    newInvoice.custNumber = cNo
    newInvoice.invNo = `c${cNo}-${this.state.data.customers[cNo-1].invoices.length}`
    this.setState({
      showNewInvoiceForm: !this.state.showNewInvoiceForm,
      newInvoice: newInvoice
    })
  }

  deleteInvoice (inv) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      let data = Object.assign({}, this.state.data)
      data.customers[inv.custNumber - 1].invoices[inv.invNo.substr(inv.invNo.indexOf('-') + 1, inv.invNo.length)].deleted = true
      this.setState({
        data: data
      })
      this.saveButton()
    }
  }

  addCharge () {
    let newCharge = Object.assign({}, this.state.newCharge)
    let newInvoice = Object.assign({}, this.state.newInvoice)
    newCharge.charge = parseFloat(newCharge.charge).toFixed(2) || 0
    if ( newCharge.lineNo ) {
      newInvoice.charges.splice(newCharge.lineNo, 1, newCharge)
    } else {
      newCharge.lineNo = newInvoice.charges.length
      newInvoice.charges.push(newCharge)
    }
    this.setState({
      newInvoice: newInvoice,
      newCharge: {
        lineNo: '',
        description: '',
        charge: ''
      }
    })
    document.getElementById('chargeDescription').focus()
  }

  editCharge (charge, invNo) {
    let eCharge = charge
    eCharge.invNo = invNo
    this.setState({
      showEditCharge: true,
      newCharge: charge
    })
  }

  deleteCharge (chargeNo) {
    let newInvoice = Object.assign({}, this.state.newInvoice)
    newInvoice.charges.splice(chargeNo,1)
    let i = 0
    newInvoice.charges.map((ch) => {
      console.log(ch)
      ch.lineNo = i++
    })
    this.setState({
      newInvoice: newInvoice
    })
  }

  saveEditCharge () {
    let data = Object.assign({}, this.state.data)
    let newCharge = Object.assign({}, this.state.newCharge)
    newCharge.charge = parseFloat(newCharge.charge).toFixed(2) || 0
    // get customer and invoice number from newCharge.invNo
    let customer = parseInt(newCharge.invNo.substr(1, newCharge.invNo.indexOf('-') - 1)) - 1
    let invNo = parseInt(newCharge.invNo.substr(newCharge.invNo.indexOf('-') + 1))
    data.customers[customer].invoices[invNo].charges.splice(newCharge.lineNo, 1, newCharge)
    this.setState({
      data: data,
      showEditCharge: !this.state.showEditCharge,
      newCharge: {
        lineNo: '',
        description: '',
        charge: ''
      }
    })
    this.saveButton()
  }

  gotPaid (inv) {
    let data = Object.assign({}, this.state.data)
    let toggle = !data.customers[inv.custNumber - 1].invoices[inv.invNo.substr(inv.invNo.indexOf('-') + 1, inv.invNo.length)].paid
    data.customers[inv.custNumber - 1].invoices[inv.invNo.substr(inv.invNo.indexOf('-') + 1, inv.invNo.length)].paid = toggle
    this.setState({
      data: data
    })
  }

  toggleInvoiceForm (cust) {
    this.setState({
      showNewInvoiceForm: !this.state.showNewInvoiceForm,
      newInvoice: cust
    })
  }

  closeNewInvoiceForm () {
    this.setState({
      showNewInvoiceForm: !this.state.showNewInvoiceForm,
      newInvoice: {
        custNumber: '',
        invNo: '',
        due: '',
        charges: [],
        deleted: false,
        paid: false
      }
    })
  }

  showCustomerForm () {
    this.setState({
      showNewCustomerForm: !this.state.showNewCustomerForm
    })
  }

  showDeletedCustomers () {
    this.setState({
      showDeletedCustomers: !this.state.showDeletedCustomers
    })
  }

  showIDForm () {
    this.setState({
      showIDForm: !this.state.showIDForm
    })
  }

  editCustomer (index) {
    let customer = Object.assign({}, this.state.data.customers[index])
    this.setState({
      newCustomer: customer,
      editCustomer: true,
      showNewCustomerForm: true
    })
  }

  saveEditCustomer (index) {
    let data = Object.assign({}, this.state.data)
    data.customers.splice(index, 1, this.state.newCustomer)
    this.setState({
      data: data,
      showNewCustomerForm: false,
      editCustomer: false
    })
    this.saveButton()
  }

  deleteCustomer (index) {
    let data = Object.assign({}, this.state.data)
    if (confirm(data.customers[index].deleted ? 'Undelete Customer?' : 'Delete Customer?')) {
      data.customers[index].deleted = !data.customers[index].deleted
      this.setState({
        data: data
      })
    } else {
      console.log('cancel works')
    }
    this.saveButton()
  }

  getInvoices () {
    let token = localStorage.getItem('id_token')
    let xhr = new XMLHttpRequest()
    // xhr.open('GET', 'http://localhost:8888/invoices')
    xhr.open('GET', 'https://just-following-up-server.herokuapp.com/invoices')
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText === 'you aren\'t logged in') {
          // console.log(xhr.responseText)
        } else {
          localStorage.setItem('invoices', xhr.responseText)
          let userData = JSON.parse(xhr.responseText)
          if (userData.name === '' ) {
            this.setState({
              data: userData,
              showIDForm: true
            })
          } else {
            this.setState({
              data: userData
            })
            this.nextPayDate()
          }
        }
      }
    }
    xhr.setRequestHeader('id_token', token)
    xhr.setRequestHeader('client', 'web')
    xhr.send()
  }

  idUpdate (field, txt) {
    let userData = Object.assign({}, this.state.data)
    userData[field] = txt

    this.setState({
      data: userData
    })
  }

  invUpdate (field, txt) {
    let newInvoice = Object.assign({}, this.state.newInvoice)
    newInvoice[field] = txt

    this.setState({
      newInvoice: newInvoice
    })
  }

  customerUpdate (field, txt) {
    let newCustomer = Object.assign({}, this.state.newCustomer)
    newCustomer[field] = txt
    this.setState({
      newCustomer: newCustomer
    })
  }

  chargeUpdate (field, txt) {
    let newCharge = Object.assign({}, this.state.newCharge)
    newCharge[field] = txt
  }

  saveButton () {
    let update = JSON.stringify(this.state.data)
    let xhr = new XMLHttpRequest()
    // xhr.open('POST', 'http://localhost:8888/invoices/' + encodeURIComponent(update))
    xhr.open('POST', 'https://just-following-up-server.herokuapp.com/invoices/' + encodeURIComponent(update))
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText === 'updated') {

        }
     }
    }
    xhr.setRequestHeader("id_token", localStorage.getItem('id_token'))
    xhr.setRequestHeader("client", 'web')
    xhr.send(update)
    this.setState({
      showIDForm: false
    })
  }

  saveNewInvoice () {
    let data = Object.assign({}, this.state.data)
    let newInvoice = Object.assign({}, this.state.newInvoice)
    data.customers[newInvoice.custNumber - 1].invoices.splice(newInvoice.invNo.substr(newInvoice.invNo.indexOf('-') + 1), 1, newInvoice)
    this.setState({
      data: data,
      showNewInvoiceForm: false
    })
    this.nextPayDate()
    this.saveButton()
  }

  saveCustomer () {
    let data = Object.assign({}, this.state.data)
    let newCustomer = Object.assign({}, this.state.newCustomer)
    newCustomer.custNumber = data.customers.length + 1
    data.customers.push(newCustomer)
    this.setState({
      data: data,
      showNewCustomerForm: false
    })
    this.saveButton()
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Just Following Up</a>
            </Navbar.Brand>
            <Logo height={45} />
            <div id="buttons" style={{display: 'inline-block', margin: 'auto'}}>
              {
                !isAuthenticated() && (
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </Button>
                  )
              }
              {
                isAuthenticated() && (
                    <Button
                      bsStyle="primary"
                      className="btn-margin"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                    </Button>
                  )
              }
            </div>
          </Navbar.Header>
          <SettingsMenu showDeletedCustomers={this.showDeletedCustomers}/>
        </Navbar>
        <div id="just-following-up" style={{width: '100%', textAlign: 'center'}}>
          {(!isAuthenticated() && (
            <Exposition />
          ))}
          {
            (isAuthenticated() && this.state.showIDForm) && (
              <IDForm id={this.state.data} save={this.saveButton} idUpdate={this.idUpdate} />
            )
          }
          {
            isAuthenticated() && !this.state.showIDForm && (
              <IDCard
                id={this.state.data}
                edit={this.showIDForm}
                addCustomer={this.showCustomerForm}
                editCustomer={this.editCustomer}
                saveEditCustomer={this.saveEditCustomer}
                editingCustomer={this.state.editCustomer}
                deleteCustomer={this.deleteCustomer}
                showInvoiceForm={this.addInvoice}
                editInvoice={this.toggleInvoiceForm}
                editCharge={this.editCharge}
                deleteInvoice={this.deleteInvoice}
                gotPaid={this.gotPaid}
                nextPayDate={this.state.nextPayDate}
                getNextPayDate={this.nextPayDate}
                showDeletedCustomers={this.state.showDeletedCustomers}
              />
            )
          }
          <div style={{display: 'flex'}}>

          </div>
          {
            this.state.showNewInvoiceForm && (
              <NewInvoiceForm
                invUpdate={this.invUpdate}
                save={this.saveNewInvoice}
                updateCharge={this.updateCharge}
                addCharge={this.addCharge}
                values={this.state.newCharge}
                data={this.state.newInvoice}
                customer={this.state.data.customers}
                closeNewInvoiceForm={this.closeNewInvoiceForm}
                editCharge={this.editCharge}
                deleteCharge={this.deleteCharge}
              />
            )
          }
          {
            this.state.showNewCustomerForm && (
              <NewCustomerForm
                custUpdate={this.customerUpdate}
                saveCustomer={this.saveCustomer}
                saveEditCustomer={this.saveEditCustomer}
                data={this.state.newCustomer}
                isEditing={this.state.editCustomer}
                xButton={this.showCustomerForm}
               />
            )
          }
          {
            this.state.showEditCharge && (
              <EditCharge updateCharge={this.updateCharge} charge={this.state.newCharge} save={this.saveEditCharge} />
            )
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
