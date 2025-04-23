import React, { useEffect, useState } from "react";

export function SharedCardDescription({ product, units = 1 }) {
  const [animate, setAnimate] = useState(false);

  // Trigger animation when units change
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false); // Reset animation class after it completes
    }, 500); // Match this duration with your CSS animation duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [units]);

  return (
    <div className="description">
      <p className="name">{product.name}</p>
      <p className={`subtotal ${animate ? "animate" : ""}`}>
        $ {product.price * units}
      </p>
      <p className="description-string">
        {formatDescription(capitalizeFirstLetter(product.description))}
      </p>
    </div>
  );
}
