export interface IProduct {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  max: number;
  quantity?: number;
}
