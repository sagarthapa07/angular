export interface Product{
    title:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id: number,
    thumbnail: string,
    brand:string,
    stock:number,
    expanded?: boolean;
    discountPercentage:number,
    rating:number,
}