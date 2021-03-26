import { Industry } from "./industry";
import { StudentSubject } from "./StudentSubject";
import { User } from "./User";

export class Experience {
    id: number;
    occupation: string;
    industry: Industry;
    studentSubject: StudentSubject;
    startDate : Date; 
    endDate : Date;
    userid: number;
}
