import React from 'react';
import classes from './toast.module.scss';

interface ToastProps {
  message: string;
  resetMessage: Function;
}

const Toast = (props: ToastProps) => {
  return (
    <div
      className={`${classes.toast} ${
        props.message !== '' ? classes.toastIn : classes.toastOut
      }`}
    >
      <button
        className={`btn-close ${classes.closeButton}`}
        aria-label="Close"
        onClick={() => {
          props.resetMessage();
        }}
      />
      <span className={classes.messageDisplay}>{props.message}</span>
    </div>
  );
};

export default Toast;
