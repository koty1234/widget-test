import React from "react";

function BeautifulTypography({
  text,
  variant = "body1", // default variant if not provided
  color = "#000",    // default color is black
  style = {}
}) {
  // Determine the tag to render based on the variant.
  let Component;
  if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)) {
    Component = variant;
  } else if (variant === "body1" || variant === "body2") {
    Component = "p";
  } else if (variant === "caption") {
    Component = "span";
  } else {
    Component = "p"; // Fallback to paragraph if an unknown variant is provided.
  }

  const combinedStyle = { color, ...style };

  return (
    <>
      <style>
        {`
          .beautiful-typography {
            margin: 0;
            padding: 0;
          }
          .beautiful-typography.h1 {
            font-size: 2.125rem;
            font-weight: 300;
            line-height: 1.235;
          }
          .beautiful-typography.h2 {
            font-size: 1.5rem;
            font-weight: 300;
            line-height: 1.235;
          }
          .beautiful-typography.h3 {
            font-size: 1.375rem;
            font-weight: 400;
            line-height: 1.334;
          }
          .beautiful-typography.h4 {
            font-size: 1.25rem;
            font-weight: 400;
            line-height: 1.334;
          }
          .beautiful-typography.h5 {
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.6;
          }
          .beautiful-typography.h6 {
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.6;
          }
          .beautiful-typography.body1 {
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
          }
          .beautiful-typography.body2 {
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.43;
          }
          .beautiful-typography.caption {
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 1.66;
          }
        `}
      </style>
      <Component
        className={`beautiful-typography ${variant}`}
        style={combinedStyle}
      >
        {text}
      </Component>
    </>
  );
}

export default BeautifulTypography; 