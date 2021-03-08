import { Community } from "./Communities/Community";
import { Industry } from "./Industry";
import { studentSubject } from "./studentSubject";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  occupation: string;
  gender: string;
  subject: studentSubject;
  industry: Industry;
  communities: Community[];
  role: string;
}
