import React from "react";

function BeautifulTextInput({
  value,
  onChange,
  placeholder = "Enter your message...",
  backgroundColor = "#fff",
  borderColor = "#1976d2",
  style = {}
}) {
  const combinedStyle = {
    "--bg-color": backgroundColor,
    "--border-color": borderColor,
    ...style,
  };

  return (
    <>
      <style>
        {`
          .beautiful-text-input {
            background-color: var(--bg-color, #fff);
            border: 1px solid var(--border-color, #1976d2);
            color: #333;
            padding: 0.8rem 1.2rem;
            border-radius: 12px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            width: 100%;
            box-sizing: border-box;
          }

          .beautiful-text-input:focus {
            border-color: var(--border-color, #1976d2);
            box-shadow: 0px 3px 5px rgba(25, 118, 210, 0.2);
          }

          .beautiful-text-input::placeholder {
            color: #aaa;
          }
        `}
      </style>
      <input
        type="text"
        className="beautiful-text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={combinedStyle}
      />
    </>
  );
}

export default BeautifulTextInput; 