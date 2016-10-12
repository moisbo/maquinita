
export function add(coin, wallet) {
  return [
    ...wallet,
    coin
  ]
}

export function remove(wallet, index) {
  return [
    ...wallet.slice(0, index),
    ...wallet.slice(index + 1)
  ]
}
