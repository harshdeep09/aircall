import React, { useState } from 'react';
import outbound from '../images/outgoing.png';
import inbound from '../images/incoming.png';
import ExpandedView from './expandedView';
import moment from 'moment';

const ListItem = (props) => {
   const [expandedView, setexpandedView] = useState(false);

  return (

    <div>
         {/* <div className='listItem' onClick={() => props.update(props.contact.id, props.contact.is_archived)}> */}
       {expandedView ?  
        <ExpandedView shrinkView = {() => setexpandedView(!expandedView)} contactInfo={props.contact} archive={() => props.update(props.contact.id, props.contact.is_archived)}/>
       :
        <div className='listItem' onClick={() => setexpandedView(!expandedView)}>
            <div className={props.contact.direction+"Con" + " " + "callDirection"}>
                {props.contact.direction === "outbound" ? <img className="profileimg" src={outbound}/> : 
                <img className="profileimg" src={inbound}/>
                }
            </div>
        
            <div className="callFromTo verticalCenter">
                {props.contact.direction === "outbound" ? 
                    <p>{props.contact.to}</p> : 
                    <p>{props.contact.from}</p>
                }
            </div>
            
            <div className="verticalCenter seperator">
            <p>|</p>
            </div>
            <div className="verticalCenter time">
            <p>
            {moment(props.contact.created_at).utc().format("hh:mm a")}</p>
            </div>
        </div> 
        }
    </div>
  );
};


export default ListItem;
 