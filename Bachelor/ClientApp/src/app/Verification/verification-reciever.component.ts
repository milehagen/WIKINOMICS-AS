import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VerificationService } from "./verification.service";



@Component({
  selector: 'app-home',
  template: `<b>Hello</b>
             `,
  providers: [VerificationService]
})

export class VerificationReceiverComponent {
  experienceIDEncoded: string;

  constructor(private router: Router, private route: ActivatedRoute, private verificationSerivce: VerificationService) {

  }

  ngOnInit() {
    this.experienceIDEncoded = this.route.snapshot.queryParamMap.get("Exp");
    this.verify(this.experienceIDEncoded);
  }

  //Calls for verification of user
  verify(userIdEncoded: string) {
    var experienceID = Number(this.Base64Decode(userIdEncoded));

    this.verificationSerivce.verifyExperience(experienceID);
  }

  //Decodes Base64 string from url parameter
  Base64Decode(encoded: string) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    do {
      enc1 = keyStr.indexOf(encoded.charAt(i++));
      enc2 = keyStr.indexOf(encoded.charAt(i++));
      enc3 = keyStr.indexOf(encoded.charAt(i++));
      enc4 = keyStr.indexOf(encoded.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    } while (i < encoded.length);

    return output;
  }
}
