import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  pdfSource="assets/assets/FGVResume.pdf"

  zoom_to = 1;

  zoom_in() {
    this.zoom_to = this.zoom_to + 0.25;
  }

  zoom_out() {
    if (this.zoom_to > 1) {
       this.zoom_to = this.zoom_to - 0.25;
    }
  }


}


