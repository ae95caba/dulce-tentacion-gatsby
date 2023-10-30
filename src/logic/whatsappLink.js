export function createWhatsAppLink(messageData) {
  const message = createMessage(messageData);

  const phoneNumber = `5491121690959`;

  // Encode the message text for use in the URL
  const encodedMessage = encodeURIComponent(message);

  // Create the WhatsApp link with the phone number and pre-filled message
  var link =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodedMessage;

  // Return the link
  return link;
}
// to make a line break use "\n"
//tabs are visible on whatsapp
function createMessage({ cartItems, deliveryInfo, totalPrice }) {
  function createCartItemsList() {
    let cartItemsList = "";
    //fill itemList
    cartItems.forEach((cartItem) => {
      const product = cartItem.product;
      console.log(`product is ${product}`);
      if (!product.flavours) {
        cartItemsList += `\u{1F6D2} ${product.name} X ${
          cartItem.count
        } | $${cartItem.getTotalPrice()}\n`;
      } else {
        //flavours
        let flavours = "		*Sabores*:\n";
        product.flavours.forEach((flavour) => {
          flavours += `			-${flavour}\n`;
        });

        cartItemsList += `\u{1F6D2} ${product.name} | $${product.price}:
  ${flavours}`;
      }
    });
    cartItemsList += `*Total: $${totalPrice}*`;
    return cartItemsList;
  }

  return `*Orden*:		
${createCartItemsList()}	

${
  deliveryInfo.isChecked
    ? `*Datos para el delivery*:
		Barrio: ${deliveryInfo.neighborhood}
		Direccion: ${deliveryInfo.address}
		Entrecalles: ${deliveryInfo.crossStreets}${
        deliveryInfo.aditionalInfo
          ? `\n		Extra: ${deliveryInfo.aditionalInfo}`
          : ""
      }`
    : `*Retira en el local*`
}
`;
}
