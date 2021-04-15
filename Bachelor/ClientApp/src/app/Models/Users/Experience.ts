import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Industry } from "./industry";
import { StudentSubject } from "./StudentSubject";
import { User } from "./User";

export class Experience {
    id: number;
    occupation: string;
    industry: Industry;
    business : string;
    studentSubject: StudentSubject;
    startDate : Date; 
    endDate : Date;
    questionRole : string;
    questionBest : string;
    questionChallenging : string;
    questionAdvice : string;
    user: User;
    verified: boolean;
}
