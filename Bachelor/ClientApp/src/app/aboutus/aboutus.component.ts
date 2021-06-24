
import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fade } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Component for English page
@Component({
  selector: 'app-home',
  templateUrl: './aboutus.component.html',
  styleUrls: [ './aboutus.component.css' ],
  animations: [
    fade
  ]
})
export class AboutUsComponent {
  constructor(private titleService: Title) {
    this.setTitle("KnowONE - About us");
  }

  // Scrolls to first section
  scrollToSection1() {
    document.getElementById("section1").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to second section
  scrollToSection2() {
    document.getElementById("section2").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to third section
  scrollToSection3() {
    document.getElementById("section3").scrollIntoView({behavior: "smooth"});
  }

  //Sets title of HTML document
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}