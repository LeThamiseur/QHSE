import { RisqueP } from "./RisqueP";

// classe représentant une situation dangereuse
export class SituationD {
  id !: string;
  label ! : string;
  description ! : string;
  risques  : RisqueP [] = []
}
