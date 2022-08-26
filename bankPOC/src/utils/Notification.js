import {toast } from 'react-toastify';

 class Notification {
    
   static notify = (data) => toast.info(data, { position: "top-center" });

   static notifyError = (data) => toast.error(data, {
        icon: "🤯",
        position: "top-center"
    });

    static notifySuccess = (data) => toast.success(data, {
        icon: "🚀",
        position: "top-center"
    });
   
}
 
export default Notification;