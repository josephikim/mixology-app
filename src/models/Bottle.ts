export interface Bottle {
  id: number;
  category: string;
  name: string;
  producer: string;
  country: string;
  price: number;
  rating?: number;
}

export interface Wine extends Bottle {
  style: string;
  abv: number;
  vintage?: number;
}

export interface Spirit extends Bottle {
  type: string;
  proof: number;
  year?: number;
}
