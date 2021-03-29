import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Industry } from "./industry";
import { studentSubject } from "./studentSubject";
import { User } from "./User";

export class Experience {
    id: number;
    occupation: string;
    industry: Industry;
    studentSubject: studentSubject;
    startDate : Date; 
    endDate : Date;
    preExp : string;
    badWithExp : string;
    goodWithExp : string;
    userid: number;
}
