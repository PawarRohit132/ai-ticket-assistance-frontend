import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TicketList from '../componets/TicketList.jsx'
import {getTickets} from "../store/Slice/ticketSlice.js"
import Loading from "../componets/Loading.jsx"


function Alltickets() {
    const dispatch = useDispatch();
    const tickets = useSelector((state)=> state.ticket?.tickets || []);
    
    const pendingTickets = tickets?.filter((ticket) => ticket?.status !== "SOLVED")
    
    
    const ticketError = useSelector((state)=> state.ticket.ticketError)
    const loading = useSelector((state)=> state.ticket.loading);

    useEffect(()=>{
        dispatch(getTickets());
    },[dispatch])

    if(loading){
        return <Loading/>
    }
    if(ticketError){
        return (
            <p className='text-red-500'>
                {ticketError}
            </p>
        )
    }
  return (
    <div>
      <TicketList tickets={pendingTickets}/>
    </div>
  )
}

export default Alltickets
