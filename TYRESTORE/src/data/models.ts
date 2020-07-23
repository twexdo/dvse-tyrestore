export type Sizes= "s"|"m"|"l"
export type Skins="highlight"|"primary"|"success"|"danger";
export type OrderTypes="cheap"|"expensive"|"null";

export type Vehicle={
    id:number
    name:string
    manufacturerName:string
    manufacturerLogo:string
}
export type Tire={
    id:number
    brand:string
    season:string
    part:string
    price:number
    stock:number
    tyreId:number
    size:string
}
export type BasketTires=Tire & {
    amount:number
}

