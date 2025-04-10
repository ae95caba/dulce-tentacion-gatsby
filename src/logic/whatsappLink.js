export function createWhatsAppLink(messageData) {
  const message = createMessage(messageData);

  const phoneNumber = `5491121690959`;

  // Encode the message text for use in the URL
  const encodedMessage = encodeURIComponent(message);

  // Create the WhatsApp link with the phone number and pre-filled message
  // Usar el esquema adecuado según el dispositivo
  const link = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Return the link
  return link;
}
// to make a line break use "\n"
//tabs are visible on whatsapp
function createMessage({
  cartItems,
  deliveryInfo,
  totalCartPriceWithDiscount,
  totalCartPriceWithoutDiscount,

  totalDiscountAmmount,
  paymentMethod,
}) {
  const CART_ITEM_BULLET = "•";
  const INDENT = "    "; // Four spaces for indentation

  const createCartItemsList = () => {
    return cartItems
      .map((cartItem) => {
        const product = cartItem.product;

        const itemLine = `${CART_ITEM_BULLET} ${product.name} X ${
          cartItem.count
        } | $${product.price * cartItem.count}\n`;

        // Check for add-ons
        let addOnsDetails = "";
        let subtotalLine = ""; // Initialize subtotal line for this item
        let hasAddOns =
          product.addOns?.rocklets?.included ||
          product.addOns?.sauces?.chosenSauces?.length > 0;
        if (hasAddOns) {
          if (product.addOns.rocklets.included) {
            addOnsDetails += `${INDENT}*Rocklets*: $${product.addOns.rocklets.price}\n`;
          }
          if (product.addOns.sauces.chosenSauces?.length > 0) {
            addOnsDetails += `${INDENT}*Salsas*:\n`;
            product.addOns.sauces.chosenSauces.forEach((sauce) => {
              addOnsDetails += `${INDENT}${INDENT}-${sauce} ($${product.addOns.sauces.price})\n`;
            });
          }

          // Calculate subtotal for this item if it has add-ons

          subtotalLine = `${INDENT}Subtotal: $${cartItem.getTotalCartItemPrice()}\n`;
        }

        // Logic to display chosen flavours
        if (product.chosenFlavours) {
          let flavoursList = `${INDENT}*${
            product.chosenFlavours.length > 1 ? "Sabores" : "Sabor"
          }*:\n`;
          product.chosenFlavours.forEach((flavour) => {
            flavoursList += `${INDENT}${INDENT}-${flavour}\n`;
          });

          return itemLine + flavoursList + addOnsDetails + subtotalLine; // Combine item line with add-ons details, subtotal, and flavours
        }

        return itemLine + addOnsDetails + subtotalLine; // Combine item line with add-ons details and subtotal if no flavours
      })
      .join(""); // Join all cart items into a single string
  };

  const cartItemsList = createCartItemsList();

  return (
    `*Orden*:\n${cartItemsList}` +
    `*Total:* $${totalCartPriceWithDiscount}\n\n` +
    (paymentMethod === "cash"
      ? "*Paga en efectivo*"
      : `*Paga con transferencia*: \nALIAS: ${process.env.GATSBY_ALIAS}\nTITULAR: ${process.env.GATSBY_OWNER}\n`) +
    (deliveryInfo.isChecked
      ? `*Datos para el delivery*:\n${INDENT}Barrio: ${deliveryInfo.neighborhood}\n${INDENT}Direccion: ${deliveryInfo.address}\n${INDENT}Entrecalles: ${deliveryInfo.crossStreets}` +
        (deliveryInfo.aditionalInfo
          ? `\n${INDENT}Extra: ${deliveryInfo.aditionalInfo}`
          : "")
      : "*Retira en el local*")
  );
}
