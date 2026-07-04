import { data1 } from "./data-1";
import { data2 } from "./data-2";

export const arrayCards = [
  ...data1,
  ...data2,
];

export const TITLE = `${arrayCards.length} Projects using Wix Studio`;
