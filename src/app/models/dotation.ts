// classe représentant une dotation

import { User } from "./user";

export class Dotation {
  id!: number;
  service!: string;
  date!: Date;
  nom_prenom_beneficiaire!: string;
  fonction!: string;
  user !: User;
}
