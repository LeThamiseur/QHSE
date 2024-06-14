// classe représentant une dotation

import { User } from "./user";

export class Dotation {
  id!: string;
  service!: string;
  date!: string;
  nom_beneficiaire!: string;
  fonction!: string;
  metier ! : string;
  retour : boolean = false;
  id_Equi: number[]= []

  // user !: User;
}
