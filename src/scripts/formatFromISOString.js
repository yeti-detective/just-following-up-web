export default function formatFromISOString (ISOdate) {
  if (ISOdate.length > 10) {
    return `${ISOdate.substr(ISOdate.indexOf('-')+1,2)}/${ISOdate.substr(ISOdate.lastIndexOf('-')+1,2)}/${ISOdate.substr(0,4)}`
  } else {
    return ISOdate
  }
}
