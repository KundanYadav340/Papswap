import React from 'react'

const TokenCard = ({count, name,img}) => {
  return (
    <div className='token-card'>
        <div className='tokens'>
            <b>{count} </b>
            {name} tokens<br/>
            <b>current balance</b>
        </div>
        <div className='token-img'>
            <img src={img} alt="token"/>
        </div>
    </div>
  )
}

export default TokenCard