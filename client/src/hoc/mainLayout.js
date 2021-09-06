import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {showToast} from 'utils/tools'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from 'store/actions';
const MainLayout = (props) => {
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : 'Error'
            showToast('ERROR', msg)
            //clearNotification
            dispatch(clearNotification())
        }
        if(notifications && notifications.success){
            const msg = notifications.msg ? notifications.msg : 'Good Job'
            showToast('SUCCESS', msg)
            dispatch(clearNotification())
        }
       
        //showToast('SUCCESS', 'some error')
    }, [notifications, dispatch])

    return(
        <>
            {props.children}
            <ToastContainer></ToastContainer>
        </>
    )
}

export default MainLayout;