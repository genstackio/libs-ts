export type product = {
    id: string;
    units?: number;
};

export type item = {
    id: string;
    quantity: number;
    product: product;
};
