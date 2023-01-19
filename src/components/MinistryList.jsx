import React from 'react';
import { useHomeContext } from '../Context/homeContext';

const MinistryList = ({showm, closeFilter}) => {
  const {filterPostData} = useHomeContext();
  console.log(showm);
  return (
    <div>
        <section className='ministry-heading'>
                    See post from these Ministries
                </section>
                <div id={!showm?"show-mbox":"bk"} className='ministry-box'>
                <div className='head-close-m'>
                  <button onClick={closeFilter}><i className='material-icons'>close</i></button>
                  <h4>See Post from these ministries</h4>
                </div>
                    <span onClick={()=>{closeFilter();filterPostData("all");}}>See from all ministries</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("MSME")}}>Ministry of Development</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("MHA")}}>Ministry of Rural area Development</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("MOF")}}>Ministry of Child Development</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("PMO")}}>Ministry of Defence</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("MoD")}}>Road and transportation ministry</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("RBI")}}>Ministry of Educational Development</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("MR")}}>Health Ministry</span><hr/>
                    <span onClick={()=>{closeFilter();filterPostData("NITI Ayog")}}>Home Ministry</span>
                </div>
    </div>
  )
}

export default MinistryList;