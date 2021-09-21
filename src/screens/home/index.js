import React, { Component } from 'react';
import ListItem from './listitem';
import moment from 'moment';
import 'regenerator-runtime/runtime'

class Home extends Component {
    constructor(props) {
        super(props);
          this.state = {
            contacts: [],
            activeListDates: [],
            archivedListDates: [],
            activeList: true
          }
           this.printContact = this.printContact.bind(this);
           this.fetch = this.fetch.bind(this);
           this.updateData = this.updateData.bind(this);
           this.switchbtn = this.switchbtn.bind(this);
      }
   
      async fetch() {
        this.setState({  
            activeListDates: [],
            archivedListDates: []
        })

        const result = await fetch('https://aircall-job.herokuapp.com/activities')
        const data = await result.json();
        this.setState({ contacts: data })
        data.map((contact) => (
            contact.is_archived ?

                    this.state.archivedListDates.indexOf(moment(contact.created_at).utc().format("DD MMMM YYYY")) > -1 ?
                    console.log("not added because the value already exsist in archivedListDates") :
                    this.setState({
                        archivedListDates: this.state.archivedListDates.concat(moment(contact.created_at).utc().format("DD MMMM YYYY"))
                    })

             : 
                    this.state.activeListDates.indexOf(moment(contact.created_at).utc().format("DD MMMM YYYY")) > -1 ? 
                    console.log("not added because the value already exsist in activeListDates") :
                    this.setState({
                        activeListDates: this.state.activeListDates.concat(moment(contact.created_at).utc().format("DD MMMM YYYY"))
                    })
            ))
    }


    async updateData(id, is_archived){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: !is_archived })
        };
        const result = await fetch('https://aircall-job.herokuapp.com/activities/'+id, requestOptions)

        this.fetch()
        
       
    }

    componentDidMount() {
        this.fetch()
    }

    switchbtn(value){
        if(value === "active"){
            this.setState({
                activeList : true
            });
        } else{
            this.setState({
                activeList : false
            });
        }
    }
    printContact(){
        console.log(this.state.archivedListDates)
    }

    render() {
        return (
          
                    <div className="container-view">
                        <div className="switch-btn">
                            <div className={this.state.activeList ? "left-btn active" : "left-btn"} onClick={() => this.switchbtn("active")}> 
                                Activity Feed
                            </div>
                            <div className={this.state.activeList ? "right-btn" : "active right-btn"} onClick={() => this.switchbtn("archived")}>
                                Archive 
                            </div>

                        </div>
                        {   this.state.activeList ?
                                    this.state.contacts ?
                                        this.state.activeListDates.map((date) => (
                                            <div key ={moment(date).format("DDMMYY")} className="Top Date">
                                                <div className="Top Date">
                                                    <p>{date}</p>
                                                </div>
                                                {
                                                    this.state.contacts.map((contact) => (
                                                            moment(contact.created_at).utc().format("DD MMMM YYYY") === date && !contact.is_archived ? 
                                                            <ListItem key={contact.id} contact = {contact} update = {this.updateData}/> :
                                                            <div  key={contact.id} className="to-be-hidden"></div>
                                                    )) 
                                                }
                                            </div>
                                        )): 
                                    <p>Loading</p>
                            :
                                    this.state.contacts ?
                                    this.state.archivedListDates.map((date) => (
                                        <div key ={moment(date).format("DDMMYY")} className="Top Date">
                                            <div className="Top Date">
                                                <p>{date}</p>
                                            </div>
                                            {
                                                this.state.contacts.map((contact) => (
                                                        moment(contact.created_at).utc().format("DD MMMM YYYY") === date && contact.is_archived ? 
                                                        <ListItem key={contact.id} contact = {contact} update = {this.updateData}/> :
                                                        <div  key={contact.id} className="to-be-hidden"></div>
                                                )) 
                                            }
                                        </div>
                                    )): 
                                <p>Loading</p>
                        }
                       
                    </div>
                    
  );
}

}
export default Home;