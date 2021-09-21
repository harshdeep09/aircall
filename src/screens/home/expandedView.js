import React, { useState } from 'react';
import moment from 'moment';
import outbound from '../images/outgoing.png';
import inbound from '../images/incoming.png';

const ExpandedView = (props) => {
    return (
        <div>
            <div className='ExpandedlistItem'>
                <div className='explistItem'>
                                <div className={props.contactInfo.direction+"Con" + " " + "callDirection"}>
                                    {props.contactInfo.direction === "outbound" ? <img className="profileimg" src={outbound}/> : 
                                    <img className="profileimg" src={inbound}/>
                                    }
                                </div>
                            
                                <div className="callFromTo verticalCenter">
                                    {props.contactInfo.direction === "outbound" ? 
                                        <p>To: {props.contactInfo.to}</p> : 
                                        <p>From: {props.contactInfo.from}</p>
                                    }
                                </div>
                                
                                <div className="verticalCenter seperator">
                                <p>|</p>
                                </div>
                                <div className="verticalCenter time">
                                <p>
                                {moment(props.contactInfo.created_at).utc().format("hh:mm a")}</p>
                                </div>
                </div> 
                <div className = "details">
                                <div className="callFromTo verticalCenter">
                                    {props.contactInfo.direction === "outbound" ? 
                                        <div><p>From:</p> <p>{props.contactInfo.from}</p></div>
                                         : 
                                         <div><p>To:</p> <p>{props.contactInfo.to}</p></div>
                                    }
                                </div>
                                <div className="via">
                                    <p>Via :</p>
                                    <p>{props.contactInfo.via}</p>
                                  
                                </div>
                               
                </div>
                <div className = "details">
                                 <div className="duration ">
                                    <p>Duration : {Math.floor(props.contactInfo.duration /60)+ " Hr and "+(props.contactInfo.duration % 60)+" Minutes"}</p>
                                </div>
                </div>
                <div className = "statusdetails details">
                                 <div className="status answered" style = {{opacity: props.contactInfo.call_type === "answered" ? 1 : 0.1 }}>Answered</div>
                                 <div className="status missed" style = {{opacity: props.contactInfo.call_type === "missed" ? 1 : 0.1 }}>Missed</div>
                                 <div className="status voicemail" style = {{opacity: props.contactInfo.call_type === "voicemail" ? 1 : 0.1 }}>Voicemail</div>
                </div>
                <div className = "bottom-buttons">
                        <button onClick = {props.shrinkView}>Close</button>
                        <button onClick = {props.archive}>{props.contactInfo.is_archived ? "Unarchive" : "Archive"}</button>
                </div>
            </div>
        </div>
        );
};


export default ExpandedView;