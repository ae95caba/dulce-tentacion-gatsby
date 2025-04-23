import React from "react";

const DetailsSection = ({
  product,
  rocklets,
  sauces,
  priceWithAddOns,
  chosenFlavours = [],
}) => {
  const createDescriptionItem = (condition, name, price) => {
    if (condition) {
      return (
        <li key={name}>
          🛒{name}: <span>${price}</span>
        </li>
      );
    }
    return null;
  };

  // Check if there are any add-ons (sauces or rocklets)
  const hasAddOns = sauces.chosenSauces?.length > 0 || rocklets.included;

  return (
    <div className="details-section">
      <h4>Detalle:</h4>
      <p>
        🛒{product.name}: <span>${product.price}</span>
      </p>

      {/* List of chosen flavors */}
      <ul>
        {chosenFlavours.map((flavour) => (
          <li key={flavour}>🍦{flavour}</li>
        ))}
      </ul>

      {/* Aderezos section */}
      {(sauces.chosenSauces?.length > 0 || rocklets.included) && (
        <div className="aderezos-section">
          <h5>Aderezos:</h5>

          {/* Salsas subsection */}
          {sauces.chosenSauces?.length > 0 && (
            <p>
              <strong>Salsa de {sauces.chosenSauces[0]} </strong>
              <span>${sauces.price}</span>
            </p>
          )}

          {/* Rocklets subsection */}
          {rocklets.included && (
            <p>
              <strong>Rocklets: </strong> <span>${rocklets.price}</span>
            </p>
          )}
        </div>
      )}

      {/* Only show total if there are add-ons */}
      {hasAddOns && (
        <p>
          {product.name} + aderezos: <span>${priceWithAddOns}</span>
        </p>
      )}
    </div>
  );
};

export default DetailsSection;
