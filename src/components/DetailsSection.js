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
      <ul>
        {createDescriptionItem(true, product.name, product.price)}

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
              <div className="salsas-subsection">
                <h6>Salsas:</h6>
                <ul>
                  {sauces.chosenSauces.map((sauce) => (
                    <li key={sauce}>
                      {sauce} <span>${sauces.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rocklets subsection */}
            {rocklets.included && (
              <div className="rocklets-subsection">
                <p>
                  <h6>Rocklets: </h6> <span>${rocklets.price}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Only show total if there are add-ons */}
        {hasAddOns && (
          <p>
            {product.name} + aderezos: <span>${priceWithAddOns}</span>
          </p>
        )}
      </ul>
    </div>
  );
};

export default DetailsSection;
