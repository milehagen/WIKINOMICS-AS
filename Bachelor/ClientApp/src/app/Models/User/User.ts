import { Community } from "../Communities/Community";
import { Experience } from "./Experience";
import { Industry } from "./industry";
import { studentSubject } from "./studentSubject";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  experience: Experience;
  communities: Community[];
  role: string;
}
