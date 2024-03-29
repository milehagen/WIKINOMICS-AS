import { Injectable } from '@angular/core';
import { User } from '../Models/Users/User';
import { Experience } from '../Models/Users/Experience';
import { Industry } from '../Models/Users/Industry';
import { StudentSubject } from '../Models/Users/StudentSubject';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class UserService {

  //User that is logged in
  public userSource = new BehaviorSubject<User>(new User());
  public userCurrent = this.userSource.asObservable();

  //Id of logged in user
  public userIdSource = new BehaviorSubject<number>(null);
  public userIdCurrent = this.userIdSource.asObservable();

  //Whether a user is logged in or not
  public loggedInSource = new BehaviorSubject<boolean>(null);
  public loggedInCurrent = this.loggedInSource.asObservable();

  private token: any;
  private userid: any;
  private user: User;
  public AllIndustries: Array<Industry>;

    constructor(private http : HttpClient) { }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  changeUserId(userId: number) {
    this.userIdSource.next(userId);
  }

  changeLoggedIn(value: boolean) {
    this.loggedInSource.next(value);
  }

    //Users

    async getUserInit() : Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.get<User>("api/User/GetUserInit").subscribe(user => {
              if (user) {
                this.changeUser(user);
                this.changeLoggedIn(true);
                this.changeUserId(user.id);
                    resolve(user);
                } else { reject("Couldn't get user"); }
            })
        });
    }

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
    async GetUser(id : any) : Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.get<User>("api/User/GetUser/" + id).subscribe(user => {
              this.user = user;
              this.changeUser(user);
              this.changeUserId(user.id);
              this.changeLoggedIn(true);
              resolve(user);
            }, error => {
              console.log(error);
              resolve(null);
            })
        });
    }

 //Log in
 async LogIn(user : User) {
   return new Promise((resolve, reject) => {
     this.http.post("api/User/LogIn", user).subscribe(response => {
       if (response) {
         this.changeLoggedIn(true);
         localStorage.setItem("loggedIn", "1");
         resolve("Logger inn");
       } else {
         this.changeLoggedIn(false);
         reject("Kunne ikke logge inn");
       }
     })
   });
  }

  //Log out
  logOut() {
    this.http.get("api/Cookie/CreateLoggedInCookie/" + 0).toPromise();
    this.DeleteCookie("LoggedIn");
    this.DeleteCookie("userid");
    this.changeLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    this.changeUser(null);
    this.changeUserId(0);
  }

  //Used by other services, normally you should just subscribe
  //To the value above
  checkLoggedIn(): boolean {
    var localLoggedIn = false;
    this.loggedInCurrent.subscribe(log => localLoggedIn = log);

    return localLoggedIn;
  }

 async AddExperience(exp : Experience, userId : number) {
    return new Promise((resolve, reject) => {
        this.http.post("api/User/AddExperience/" + userId, exp).subscribe(response => {
            if(response) {
                resolve("Erfaring ble lagt til");
            } else { reject("Noe gikk galt, prøv igjen senere"); }
        })
    })
 }

 async PostExpInfo(experience : Experience) {
     return new Promise((resolve, reject) => {
        this.http.post("api/User/PostExpInfo", experience).subscribe(res => {
             if(res) {
                 resolve(true);
                } else { reject("Kunne ikke oppdatere informasjonen"); }
         })
     })
 }

 async GetExperience(expId : number) : Promise<Experience> {
     return new Promise((resolve, reject) => {
         this.http.get<Experience>("api/User/GetExperience/" + expId).subscribe(experience => {
             if(experience != null) {
                 resolve(experience);
             } else { reject(null); }
         })
     })
 }

 async patchExperience(exp : Experience) {
    return new Promise((resolve, reject) => {
        this.http.patch("api/User/patchExperience", exp).subscribe(response => {
            if(response) {
                resolve(true);
            } else { reject(false); }
        })
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
                resolve(gotToken);
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

    async DeleteCookie(name : string) {
        return new Promise((resolve, reject) => {
            this.http.get("api/Cookie/DeleteCookie/" + name, {responseType : 'text' }).subscribe(res => {
                if(res) {
                    resolve(true);
                } else { 
                    reject(false);
                 }
            })
        })
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

    async GetExperiences(user : User) : Promise<Experience[]> {
        return new Promise((resolve, reject) => {
            this.http.get<Experience[]>("api/User/GetExperiences/" + user, { responseType : 'json'}).subscribe(data => {
                if(data != null) {
                    resolve(data);
                } else { reject(null); }
            })
        })
    }


    async test() {
            this.http.get("api/User/GetUser/" + "4").toPromise().then(response => {
                return response;
        });
    }
}
