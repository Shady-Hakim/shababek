export const ccyFormat = (num) => num.toFixed(2);

export const subtotal = (cartItems) =>
  cartItems.map(({ price, count }) => price * count).reduce((sum, i) => sum + i, 0);
export const taxesAmount = (taxRate, cartItems) => taxRate * subtotal(cartItems);
export const serviceAmount = (serviceRate, cartItems) => serviceRate * subtotal(cartItems);
export const totalWithTaxesAndService = (taxRate, serviceRate, cartItems) =>
  taxesAmount(taxRate, cartItems) + serviceAmount(serviceRate, cartItems) + subtotal(cartItems);
export const discountAmount = (discountRate, taxRate, serviceRate, cartItems) =>
  (discountRate / 100) * totalWithTaxesAndService(taxRate, serviceRate, cartItems);
export const invoiceTotal = (discountRate, taxRate, serviceRate, cartItems) =>
  totalWithTaxesAndService(taxRate, serviceRate, cartItems) -
  discountAmount(discountRate, taxRate, serviceRate, cartItems);
