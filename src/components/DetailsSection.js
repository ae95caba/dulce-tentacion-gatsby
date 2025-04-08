import React from "react";

const DetailsSection = ({ product, rocklets, sauces }) => {
  const totalPrice =
    sauces.chosenSauces.length * sauces.price +
    product.price +
    (rocklets.included ? rocklets.price : 0);
  return (
    <div className="details-section">
      <h4>Detalle:</h4>
      <ul>
        {createDescriptionItem(true, product.name, product.price)}
        {/* List of chosen flavors */}

        {sauces.chosenSauces.map((sauce) => {
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
function createDescriptionItem(shouldDisplay, name, price) {
  if (shouldDisplay) {
    return (
      <li>
        🛒{name}: <span>${price}</span>
      </li>
    );
  }
}
export default DetailsSection;
