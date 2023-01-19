import React from 'react'

const EarnDetails = ({name,about, swag, details, btnName, img}) => {
  return (
    <div className='detail-card'>
        <div className='earn-img'>
            <img src={img} alt="earn" />
        </div>
        <span><b>{name}</b></span>
        <div className='about-box'>
            <p className='about'>{about}</p>
            <p className='swag'>{swag}</p>
        </div>
        <button className='earn-btn'>{btnName}</button>
    </div>
  )
}

export default EarnDetails;