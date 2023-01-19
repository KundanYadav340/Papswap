import React from 'react'

const NewOfferCard = ({name, value, img}) => {
  return (
    <div className='offer-card'>
        {name}<br />
        <b>{value}</b> PapTokens
        <div className='offer-img'>
            <img src={img} alt="offer" />
        </div>
    </div>
  )
}

export default NewOfferCard;
