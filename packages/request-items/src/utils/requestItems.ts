import { item, product } from '../types';

function sortProducts(products: product[] | undefined, dimension: string) {
    const ps = [...(products || [])];
    ps.sort((a, b) => {
        return a[dimension] > b[dimension] ? -1 : a[dimension] < b[dimension] ? 1 : 0;
    });
    return ps;
}

function selectQuantityForProduct(product: product, requested: number) {
    const pUnits = product.units || 0;
    if (!pUnits) return [];
    const rest = requested % pUnits;
    const quantity = (requested - rest) / pUnits;
    return [quantity, rest];
}
export function requestItems(products: product[], requested: number | undefined) {
    let r = requested || 0;
    const sortedProducts = sortProducts(products, 'units');

    let items: item[] = [];
    let i = 0;
    const n = sortedProducts.length;
    while (r > 0 && i < n) {
        const [selectedQuantity, remainingR] = selectQuantityForProduct(sortedProducts[i], r);
        r = remainingR;
        if (selectedQuantity > 0) {
            items = [
                ...items,
                { id: sortedProducts[i].id, quantity: selectedQuantity, product: { ...sortedProducts[i] } },
            ];
        }
        i++;
    }
    if (r > 0) {
        // there are requested items/quantity no consumable.
        // this is not a problem, but the request is not fully fulfilled
    }
    return items;
}

export default requestItems;
