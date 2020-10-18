import React from "react";

const Switch = (props) => {
  const { on, pending = "", onClick = () => {}, onChange = () => {} } = props;
  return (
    <>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 55px;
          height: 20px;
          margin: 0px 10px;
        }
        
        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition:left 0.4s;
          border-radius: 2px;
          width: 100%;
        }
        
        .slider:before {
          position: absolute;
          content: '';
          border-radius: 2px;
          /* height: 26px; */
          top: -2px;
          width: 24px;
          left: 0px;
          bottom: -2px;
          background-color: white;
          transition:left 0.4s;
          border: 1px solid #ccc;
        }
        
        input:checked + .slider {
          background-color: #2196f3;
        }
        
        input:checked + .slider::before {
          left: unset;
          right: 0px;
        }
        
        .pending {
          animation: move-right 2s linear infinite reverse;
          background: repeating-linear-gradient(
            -55deg,
            #f8e9db 1px,
            #fff5ed 2px,
            #fff5ed 11px,
            #f8e9db 12px,
            #f8e9db 20px
          );
          background-size: 200% 200%;
        }
        
        @keyframes move-right {
          100% {
            background-position: 100% 100%;
          }
        }
        
      `}</style>
      Dark mode :
      <label className="switch">
        <input
          type="checkbox"
          checked={on ? true : false}
          onClick={onClick}
          onChange={onChange}
        />
        <span className={`${pending ? "pending" : ""} slider`}></span>
      </label>
      <span>isLoading: {String(pending)}</span>
    </>
  );
};

export default Switch;
