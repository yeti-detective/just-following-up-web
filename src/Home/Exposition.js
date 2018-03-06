// todo: get screenshots for the bottom stuff
import React from 'react'

const imgSty = {
  boxShadow: "4px 4px 4px 4px grey",
  maxWidth: '100%',
  height: 'auto'
}

const minBox = {
  margin: 'auto',
  width: '100%'
}

export default function Exposition () {
  return (
    <div style={{textAlign: 'left', width: '75%', margin: 'auto'}}>
      <h4>Are you a freelancer?</h4>
      <h4>Do THEY need to PAY YOU?</h4>
      <h4>Are Quickbooks and spreadsheets STUPID?</h4>
      <h1>DO YOU NEED THEM TO JUST PAY YOU?!?</h1>
      <h4>Just Following Up is the app for freelancers like YOU!</h4>
      <p>Sign up with your Google, Facebook, Twitter account, or just a personal email</p>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/wwpklh5jfuw40bw/JFUsignup.png?dl=0" />
      </div>
      <h4>Add your company or personal info</h4>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/8w9azop8xnhajcb/AboutYou.png?dl=0"/>
      </div>
      <h4>Add Your Customers</h4>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/1mdv80y5zqj1jmt/Customer.png?dl=0" />
      </div>
      <h4>Then add your first Invoice</h4>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/1jwffahz66h3or1/AddInvoice.png?dl=0" />
      </div>
      <h4>Just Following Up will tell you when the next invoice is due...</h4>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/cfy54b3zblje887/NextDue.png?dl=0" />
      </div>
      <h4>How much each customer owes...</h4>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/q615eokh3bnkk52/TotalOwed.png?dl=0" />
      </div>
      <h4>As well as giving an easy way to reach out...</h4>
      <div style={minBox}>
        <img style={imgSty} src="https://dl.dropbox.com/s/i243s7tkb0wi59o/ReachOut.png?dl=0" />
      </div>
    </div>
  )
}
