import React from "react";

export function SharedCardDescription({ product, units = 1 }) {
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty string
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to format description with line breaks and dots
  const formatDescription = (description) => {
    if (!description) return ""; // Handle empty description
    const sentences = description
      .split(".")
      .map((line) => line.trim())
      .filter(Boolean); // Split by dot and trim
    return sentences.map((line, index) => (
      <span key={index}>
        {line}
        {line && "."} {/* Add a dot at the end of each line */}
        <br /> {/* Add line break after each line */}
      </span>
    ));
  };
  return (
    <div className="description">
      <p className="name">{product.name}</p>
      <p className="price">$ {product.price * units}</p>
      <p className="description-string">
        {formatDescription(capitalizeFirstLetter(product.description))}
      </p>
    </div>
  );
}
