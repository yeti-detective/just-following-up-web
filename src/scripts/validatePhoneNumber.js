/* eslint-disable */
export default function validatePhoneNumber(num) {
  return num.split('').map((n) => { if (typeof parseInt(n) === 'number') { return n }}).join('')
}
