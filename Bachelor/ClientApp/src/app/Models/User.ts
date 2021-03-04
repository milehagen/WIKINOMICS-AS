import { Community } from "./Communities/Community";
import { Industry } from "./Industry";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  occupation: string;
  gender: string;
  industry: Industry;
  communities: Community[];
  role: string;
}
