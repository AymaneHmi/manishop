
export default function useDiscount (price, discountAmount = null) {

    if(discountAmount === null) {
        return price;
    }

    const discountPrice = (price - (price * (discountAmount / 100))).toFixed(2)
    return discountPrice;
}