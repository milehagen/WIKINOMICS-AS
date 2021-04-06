import { Injectable } from '@angular/core';
import { User } from '../Models/Users/User';
import { Experience } from '../Models/Users/Experience';
import { Industry } from '../Models/Users/Industry';
import { StudentSubject } from '../Models/Users/StudentSubject';
import { HttpClient } from '@angular/common/http';
import { rejects } from 'assert';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor(private http : HttpClient) { }

    private token : any;
    private userid : any;
    private user : User;
    public AllIndustries : Array<Industry>;

    //Users

    //ADD User
   async addUser(user : User) {
       return new Promise((resolve, reject) => {
        this.http.post('api/User/addUser', user, { responseType: 'text' }).subscribe(response => {
             if(response) {
                  resolve("Bruker lagt til");
             } else {
                 reject("Bruker kunne ikke legges til");
                }
           });
       });
   }

    //Get user
    async GetUser(id : any) {
        return new Promise((resolve, reject) => {
            this.http.get<User>("api/User/GetUser/" + id).subscribe(user => {
                this.user = user;
                resolve(user);
            })
        })
    }

 //Log in
 async LogIn(user : User) {
     return new Promise((resolve, reject) => {
        if(this.http.post("api/User/LogIn", user)) {
            resolve(true);
        } else { reject(false); }
     })
 }

    //Storage

    // Get Cookiecontent
   async GetCookieContent(CookieName : string) {
       return new Promise((resolve, reject) => {
            this.http.get("api/Cookie/GetCookieContent/" + CookieName, { responseType : 'text' }).subscribe(response => {
                if(response != null) {
                    resolve(response);
                } else { reject(null); }
            })
       })
   }

     //Validate token
  async ValidateToken(token : any) {
      return new Promise((resolve, reject) => {
        this.http.get("api/JwtToken/ValidateToken/" + token, { responseType : 'text' }).subscribe(value => {
            if(value) {
                resolve("Token er valid");
            } else { reject("Token er ikke valid"); }
        })
      })
      
  }

    // Decode token
    async DecodeToken(token : any) {
        return new Promise((resolve, reject) => {
            this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(response => { 
                if(response != null) {
                    resolve(response);
                } else { reject("Kunne ikke dekode token"); }
            });
          });
    }

   async GetToken(email : string) {
    return new Promise((resolve, reject) => {
        this.http.get("api/User/GetToken/" + email, { responseType : 'text' }).subscribe(gotToken => {
            if(gotToken) {
                resolve("Token er hentet");
            } else {
                reject("Token kunne ikke hentes")
            }
        });
    });
}

    async CreateLoggedInCookie(value : number) {
        return new Promise((resolve, reject) => {
            this.http.get("api/Cookie/CreateLoggedInCookie/" + value).subscribe(CookieCreated => {
                if(CookieCreated) {
                    resolve("Cookie ble laget");
                } else {
                    reject("Cookie kunne ikke lages");
                }
            });
        });
    }

    async CreateAnonymousCookie() {
        return new Promise((resolve) => {
            this.http.get("api/Cookie/CreateAnonymousCookie").subscribe(response => {
                    resolve(response);
            });
        });
    }

    //Random

    GetIndustries() : Promise<Industry[]> {
        return new Promise((resolve, reject) => {
            this.http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
                if(data != null) {
                    resolve(data);
                } else { reject("Couldn't fetch industries"); }
            })
        });
    }

    GetStudentSubjects() : Promise<StudentSubject[]> {
        return new Promise((resolve, reject) => {
            this.http.get<StudentSubject[]>("api/User/GetAllStudentSubjects").subscribe(data => {
                if(data != null) {
                    resolve(data);
                } else { reject("Couldn't fetch student subjects"); }
            })
        });
    }

    async test() {
            this.http.get("api/User/GetUser/" + "4").toPromise().then(response => {
                return response;
        });
    }
}