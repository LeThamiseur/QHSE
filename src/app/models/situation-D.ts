import { RisqueP } from "./RisqueP";

// classe représentant une situation dangereuse
export class SituationD {
  id !: string;
  libelle ! : string;
  description ! : string;
  risques  : RisqueP [] = []
}
