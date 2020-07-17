export type Sizes= "s"|"m"|"l"
export type Skins="highlight"|"primary"|"success"|"danger";

export type Vehicle={
    id:number
    name:string
    manufacturerName:string
    manufactrerLogo:string
}
export type Tyre={
    id:number
    brand:string
    season:string
    price:number
    size:string
}