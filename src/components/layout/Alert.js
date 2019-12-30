import React from 'react'

const Alert = ({alert}) => {
    return (
        alert && (
        <div className={`alert alert-${alert.type}`}>
           <i className='i.fas-fa-info-circle'></i> {alert.msg}
        </div>
      ) 
    )
}

export default Alert;