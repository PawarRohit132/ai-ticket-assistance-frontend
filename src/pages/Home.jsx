import React from "react";
import CreateTicket from "../componets/CreateTicket.jsx";
import Alltickets from "./Alltickets.jsx";

function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <CreateTicket />

      <Alltickets />
    </div>
  );
}

export default Home;
