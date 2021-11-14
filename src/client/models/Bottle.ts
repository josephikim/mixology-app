export interface IBottle {
  id: number;
  category: string;
  name: string;
  producer: string;
  country: string;
  price: number;
  rating?: number;
}

export interface IWine extends IBottle {
  style: string;
  abv: number;
  vintage?: number;
}

export interface ISpirit extends IBottle {
  type: string;
  proof: number;
  year?: number;
}
