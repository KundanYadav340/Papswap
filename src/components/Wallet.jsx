import React from 'react';
import TokenCard from './TokenCard';
import EarnDetails from './EarnDetails';
import NewOfferCard from './NewOfferCard';
import { FaAngleDown, FaCoins } from 'react-icons/fa';
import token from './../images/icons/token.png';
import supert from './../images/icons/binance.png';
import earns from './../images/icons/money-bag.png';
import earnt from './../images/icons/wallet.png';
import booke from './../images/offers/savarkare.png';
import bookh from './../images/offers/savarkarh.png';
import news from './../images/offers/news.png';
import ipl from './../images/offers/ipl.png';
import waka from './../images/offers/wakanda.jpg';
import brahm from './../images/offers/brahmsatra.jpg';
import c1 from './../images/offers/c1.png';
import c2 from './../images/offers/c2.png';
import c3 from './../images/offers/c3.png';
import {useAppContext } from '../Context/appContext';


const Wallet = () => {
  const {userData} = useAppContext();
  return (
    <>
    <div className='wallet-box'>
        <div className='wallet-head'>
            <h3> account overview</h3>
        </div>
        <div className='token-counts-box flexo'>
            <TokenCard count={userData.coinVal} name="papswap" img={token}/>
            <TokenCard count={userData.coinVal} name="super" img={supert} />
        </div>
        <div className='token-earning-details flexo'>
            <EarnDetails name="Super Tokens" details="how to earn"
             about="Super Tokens can only be earned after the content verification" 
             swag="values upto 500 INR for every Super Tokens" 
             btnName=" Check Now" img={earns}/>
            <EarnDetails name="Earn PapTokens" details="how to earn"
             about="Earn Paptokens daily with bonus and reswaps" 
             swag="upto 45 paptokens every week" 
             btnName=" Earn Now" img={earnt}/>
            {/* <EarnDetails name="" details="" about="" swag="" btnName="" img=""/> */}
        </div>
        <h3 className='space'>Claim Rewards ( Coming Soon )</h3>
        <div className='rewards'>
        <div className='space offer-category'><b>New Offers</b></div>
        <div className='new-offers'>
          <NewOfferCard name="Newspaper Subscription" value="500" img = {news} />
          <NewOfferCard name="Savarkar ( Hindi )" value="1000" img = {bookh} />
          <NewOfferCard name="Savarkar ( English )" value="2000" img = {booke} />
          <NewOfferCard name="IPL Tickets" value="2000" img = {ipl} />
        </div>
        <div className='space offer-category'><b>Movies</b></div>
        <div className='new-offers'>
          <NewOfferCard name="Wakanda Forever" value="500" img = {waka} />
          <NewOfferCard name="Brahmastra" value="1000" img = {brahm} />
          <NewOfferCard name="Titanium" value="2000" img = {waka} />
          <NewOfferCard name="Surgical Strike" value="2000" img = {ipl} />
        </div>
        <div className='space offer-category'><b>Vouchers</b></div>
        <div className='new-offers'>
          <NewOfferCard name="Zammies" value="500" img = {c1} />
          <NewOfferCard name="Flipkart" value="1000" img = {c2} />
          <NewOfferCard name="Lorel" value="2000" img = {c3} />
          <NewOfferCard name="The Mans Company" value="2000" img = {c1} />
        </div>
        <div style={{"height":"50px"}}></div>
        </div>
    </div>
    </>
  );
}

export default Wallet;