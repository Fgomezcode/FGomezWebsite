import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  projects= [
    {
      title:"Guitar Almanac",
      description: "Generates keys from scales for a variety of stringed instruments.",
      technology: "Python - Flask - Django",
      webappUrl: "http://fgomezcode.pythonanywhere.com/",
      blogUrl: "/#/guitaralmanac",
      screenShot: "assets/images/GuitarAlmanac/guitaralmanac_card.png"
    },

  ]
}

/**    {
      title:"Forged In Fire Challenge",
      description: "3 Rounds to make an edged weapon ",
      technology: "JavaScript HTML CSS",
      url: "https://wwww.reddit.com",
      screenShot: "assets/images/FACE.jpg"
  },
    {
      title:"Smart Sprout",
      description: "Indoor plant health and maintenance embedded device.",
      technology: "C++ Python Flask A.W.S. Django",
      url: "https://www.github.com",
      screenShot: "assets/images/FACE.jpg"
    },
    {
      title:"One Piece Trading Card Game",
      description: "Generates keys and scales for stringed instruments.",
      technology: "Python - Flask - Django",
      url: "https://wwww.linkedin.com",
      screenShot: "assets/images/FACE.jpg"
    }, */