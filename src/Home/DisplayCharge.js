import React from 'react'
import MdModeEdit from 'react-icons/lib/md/mode-edit.js'
import MdRemoveCircle from 'react-icons/lib/md/remove-circle.js'

export default function DisplayCharge (props) {
  return (
    <div>
      <p
        key={`lineNo${props.charge.lineNo}`}>

        {props.nv ? <span
            onClick={() => {props.deleteCharge(props.charge.lineNo)}}
            title="delete">
              <MdRemoveCircle />
            </span> :
          <span
            onClick={()=> {props.editCharge(props.charge, props.invNo)}}
            title="edit line">
            <MdModeEdit />
          </span>}

        {`${props.charge.lineNo + 1} | ${props.charge.description} | ${props.charge.charge}`}

      </p>
    </div>
  )
}
