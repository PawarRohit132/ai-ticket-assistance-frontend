import React,{useEffect} from "react";
import UpdateInformation from "../componets/UpdateInformation";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../store/Slice/authSlice";

function UpdateInformationPage() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth?.status);
  
  
  useEffect(() => {
    dispatch(getCurrentUser())
  },[dispatch])
  


  return (
    <div>
      {userStatus && (

      <UpdateInformation/>
      )}
    </div>
  );
}

export default UpdateInformationPage;
