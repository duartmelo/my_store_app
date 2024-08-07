import { Component } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { MainSectionComponent } from "../../sections/main-section/main-section.component";
import { AboutSectionComponent } from "../../sections/about-section/about-section.component";
import { ContactUsSectionComponent } from "../../sections/contact-us-section/contact-us-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarousel, MainSectionComponent, AboutSectionComponent, ContactUsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
