import { Industry } from "./industry";
import { studentSubject } from "./studentSubject";
import { User } from "./User";

export class Experience {
    id: number;
    occupation: string;
    industry: Industry;
    studentSubject: studentSubject;
    user: User;
}
