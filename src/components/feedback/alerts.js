import swal from "sweetalert";
import { toast } from "react-toastify";

export const notifySuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  
export const notifyFailed = (msg) =>
  toast.warning(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const SweatAlert = (options) => {
  return new Promise((resolve) => {
    swal({
      title: options.title || "Are you sure?",
      text: options?.text,
      icon: options?.icon || "warning",
      buttons: {
        yes: {
          text: "نعم",
          value: true,
          className: "swal-btn-yes",  
        },
        no: {
          text: "لا",
          value: false,
          className: "swal-btn-no",  
        },
      },
      // dangerMode: options.dangerMode || true,
    }).then((willDelete) => {
      resolve(willDelete);
    });
  });
};

export { SweatAlert };