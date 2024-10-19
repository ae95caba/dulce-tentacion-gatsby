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
function createMessage({
  cartItems,
  deliveryInfo,
  totalPrice,
  totalItemsPrice,
  totalDiscountAmmount,
  paymentMethod,
}) {
  function createCartItemsList() {
    let cartItemsList = "";
    //fill itemList
    cartItems.forEach((cartItem) => {
      const product = cartItem.product;

      cartItemsList += `\u{1F6D2} ${product.name} X ${
        cartItem.count
      } | $${cartItem.getTotalPrice()}\n`;
      if (product.choosenFlavours) {
        let flavoursList = `		*${
          product.choosenFlavours > 1 ? "Sabores" : "Sabor"
        }*:\n`;
        product.choosenFlavours.forEach((flavour) => {
          flavoursList += `			-${flavour}\n`;
        });

        cartItemsList += `${flavoursList}`;
      }
    });

    return cartItemsList;
  }

  return `*Orden*:		
${createCartItemsList()}	
${totalItemsPrice != totalPrice ? `\n*Productos:* $${totalItemsPrice}` : ""}${
    totalDiscountAmmount ? `\n*Descuentos:* $${totalDiscountAmmount}` : ""
  }
*Total:* $${totalPrice}

*${paymentMethod == "cash" ? "Paga en efectivo" : "Paga con transferencia"}*

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
