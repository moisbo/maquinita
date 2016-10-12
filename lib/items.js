//ITEMS

export function select(item, products) {
  return products.filter((product) => {
    return item === product.item;
  })[0];
}
