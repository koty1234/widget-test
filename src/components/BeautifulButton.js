import React from "react";

function BeautifulButton({ title, icon, backgroundColor = "#1976d2", onClick, style = {} }) {
  const combinedStyle = {
    "--bg-color": backgroundColor,
    ...style,
  };

  return (
    <>
      <style>
        {`
          .beautiful-button {
            background-color: var(--bg-color, #1976d2);
            color: #fff;
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 0.5rem; /* Space between icon and text */
          }

          .beautiful-button:hover {
            transform: translateY(-2px);
            box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
          }

          .beautiful-button:active {
            transform: translateY(0);
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .button-icon {
            display: inline-block;
            width: 1rem;
            height: 1rem;
          }
        `}
      </style>
      <button
        className="beautiful-button"
        style={combinedStyle}
        onClick={onClick}
      >
        {icon && <span className="button-icon">{icon}</span>}
        {title}
      </button>
    </>
  );
}

export default BeautifulButton; 