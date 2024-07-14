export class Task {
      map(arg0: (taskSD: any) => any): number[] {
        throw new Error('Method not implemented.');
      }
      id!: number;
      nom!: string;
      id_UT!: number;
      dangers?: number[]; //Ajout de ce champ pour stocker les ID des dangers sélectionnés
}
