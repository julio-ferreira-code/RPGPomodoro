import { Pet } from "./pet";

export class Usuario {
  id!:number;
  nome!: string;
  email!:string;
  senha!:string;
  pet!: Pet;
}
