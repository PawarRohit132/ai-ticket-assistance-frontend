import React,{useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getAllUsers} from "../store/Slice/authSlice.js"
import Admin from '../componets/Admin.jsx'
import Loading from '../componets/Loading.jsx'

const AdminPage = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.auth.allUserData);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.getAllUsersError);

    

    useEffect(() => {
        dispatch(getAllUsers());
    },[dispatch])
    
    if(loading){
        return <Loading/>
    }

    if(error){
        return (
            <p className='text-red-500'>
                {error}
            </p>
        )
    }

  return (
    <div>
      <Admin users={allUsers}/>
    </div>
  )
}

export default AdminPage;
