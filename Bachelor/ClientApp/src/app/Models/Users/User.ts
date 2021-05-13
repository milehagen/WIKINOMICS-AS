import { Community } from "../Communities/Community";
import { Experience } from "./Experience";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  age: Date;
  email: string;
  password: string;
  gender: string;
  experience: Experience[];
  communities: Community[];
  emailUpdates: boolean;
  role: string;
}
