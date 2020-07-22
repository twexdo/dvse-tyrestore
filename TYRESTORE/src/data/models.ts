export type Sizes= "s"|"m"|"l"
export type Skins="highlight"|"primary"|"success"|"danger";

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
    price:number
    part:string
    tyreId:number
    size:string
}
export type BasketTires=Tire & {
    amount:number
}

