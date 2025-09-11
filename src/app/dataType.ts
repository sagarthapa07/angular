export interface Product {
    title: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number,
    thumbnail: string,
    brand: string,
    stock: number,
    expanded?: boolean;
    discountPercentage: number,
    rating: number,
}
export interface Signup {
    firstName:string
    lastName: string;
    email: string;
    password: string;
    age: number;
}
export interface Login {
    email: string,
    password: string
}
export interface Blogs{
    name:string,
    type:string,
    img:string,
    about:string
}
export interface Items{
    title: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number,
    thumbnail: string,
    brand: string,
    stock: number,
    expanded?: boolean;
    discountPercentage: number,
    rating: number,
}
export interface Categories{
    name:string,
    slug:string,
    url:string
}
