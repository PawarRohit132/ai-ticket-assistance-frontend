import React, { useEffect } from "react";
import { useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SelectedTicket from "../componets/SelectedTicket.jsx";
import Loading from "../componets/Loading.jsx";
import { getTicketById } from "../store/Slice/ticketSlice.js";

function TicketDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();


  useEffect(() => {
    dispatch(getTicketById(id));
    
  }, [dispatch]);

  const ticket = useSelector((state) => state.ticket.selectedTicket);
  

  const ticketError = useSelector((state) => state.ticket.getTicketByIdError);
  const loading = useSelector((state) => state.ticket.loading);

  if (loading) {
    return <Loading />;
  }

  if (ticketError) {
    return <p className="text-red-500">{ticketError}</p>;
  }
  if (!ticket) {
    return <p className="text-red-500"> No Ticket Found </p>;
  }

  return (
    <div>
      <SelectedTicket
        id={id}
        title={ticket.ticket.title}
        description={ticket.ticket.description}
        status={ticket.ticket.status}
        createdAt={ticket.ticket.createdAt}
        assignedTo={ticket.ticket.assignedTo}
        priority={ticket.ticket.priority}
        relatedSkills={ticket.ticket.relatedSkills}
        helpfulNotes={ticket.ticket.helpfulNotes}
        createdBy={ticket.ticket.createdBy}
      />
    </div>
  );
}

export default TicketDetails;
