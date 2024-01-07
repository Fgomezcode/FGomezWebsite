import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gestures',
  templateUrl: './gestures.component.html',
  styleUrls: ['./gestures.component.css']
})
export class GesturesComponent {
  closedHand:string = 'assets/images/closedHand.png'
  openHand:string = 'assets/images/openHand.png'
  pointingHand:string = 'assets/images/pointingHand.png'

  @Input() showGestures:boolean = false


  gestures(){

    this.showGestures = !this.showGestures
  }


}


