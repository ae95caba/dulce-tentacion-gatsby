import React from "react";

const DetailsSection = ({
  product,
  rocklets,
  sauces,
  totalPrice,
  chosenFlavours,
}) => {
  console.log("--------------------------------");
  console.log(product);
  console.log("--------------------------------");
  const createDescriptionItem = (condition, name, price) => {
    if (condition) {
      return (
        <li key={name}>
          🛒{name}: <span>${price.toFixed(2)}</span>
        </li>
      );
    }
    return null;
  };

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

        {sauces.chosenSauces?.map((sauce) => {
          return createDescriptionItem(true, `Salsa de ${sauce}`, sauces.price);
        })}
        {createDescriptionItem(rocklets.included, "Rocklets", rocklets.price)}
      </ul>
      <p>
        Total: <span>${totalPrice.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default DetailsSection;
