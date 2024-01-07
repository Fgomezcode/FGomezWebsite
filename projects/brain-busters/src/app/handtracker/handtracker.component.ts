import { Input, Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as handTrack from 'handtrackjs';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-handtracker',
  templateUrl: './handtracker.component.html',
  styleUrls: ['./handtracker.component.css']
})


export class HandtrackerComponent implements OnInit {
  @Output() onPrediction = new EventEmitter<PredictionEvent>();
  @ViewChild('htvideo') video: ElementRef;
  
  /* 
  SAMPLERATE determines the rate at which detection occurs (in milliseconds)
  500, or one half second is about right, but feel free to experiment with faster
  or slower rates
  */
  SAMPLERATE: number = 1500; 
  
  detectedGesture:string = "None"
  width:string = "400"
  height:string = "400"

  private model: any = null;
  private runInterval: any = null;

  @Input() correct:boolean;

  //handTracker model
  private modelParams = {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
  };

  constructor() {
  }
  
  ngOnInit(): void{
    handTrack.load(this.modelParams).then((lmodel: any) =>{
        this.model = lmodel;
        console.log("loaded");
    });
  }

  ngOnDestroy(): void{
      this.model.dispose();
  }

  startVideo(): Promise<any> {
    return handTrack.startVideo(this.video.nativeElement).then(function(status: any){
        return status;
    }, (err: any) => { return err; }) 
  }

  startDetection(){
    this.startVideo().then(()=>{
        //The default size set in the library is 20px. Change here or use styling
        //to hide if video is not desired in UI.
        this.video.nativeElement.style.height = "200px"

        console.log("starting predictions");
        this.runInterval = setInterval(()=>{
            this.runDetection();
        }, this.SAMPLERATE);
    }, (err: any) => { console.log(err); });
  }

  stopDetection(){
    console.log("stopping predictions");
    clearInterval(this.runInterval);
    handTrack.stopVideo(this.video.nativeElement);
  }

  /*
    runDetection demonstrates how to capture predictions from the handTrack library.
    It is not feature complete! Feel free to change/modify/delete whatever you need
    to meet your desired set of interactions
  */
  runDetection(){
    if (this.model != null){
        let predictions = this.model.detect(this.video.nativeElement).then((predictions: any) => {
            if (predictions.length <= 0) return;
            
            let openhands = 0;
            let closedhands = 0;
            let pointing = 0;

            let userSelectionA = 0;
            let userSelectionB = 0;
            let userSelectionC = 0;
            let userSelectionD = 0;

            let aSector  = 0;
            let bSector = 0;
            let cSector = 0;
            let dSector  = 0;


            for(let p of predictions){
                //uncomment to view label and position data
                //console.log(p.label + " at X: " + p.bbox[0] + ", Y: " + p.bbox[1] + " at X: " + p.bbox[2] + ", Y: " + p.bbox[3]);
                //console.log(p.label)

                if(p.label == 'open') openhands++;
                if(p.label == 'closed') closedhands++;
                if(p.label == 'point') pointing++;


                //if(p.label == 'pinch') pinching++;
                //if(p.label == 'face') face++;

                if (p.label == 'open' && openhands == 1 &&  p.bbox[0] > 200  && p.bbox[1] < 200) aSector++; // user is just moving hand around
                if (p.label == 'open' && openhands == 1 &&  p.bbox[0] < 200  && p.bbox[1] < 200) bSector++; 


                if (p.label == 'open' && openhands == 1 &&   p.bbox[0] > 200  && p.bbox[1] > 200) cSector++;
                if (p.label == 'open' && openhands == 1 &&   p.bbox[0] < 200  && p.bbox[1] > 200) dSector++;


                if (p.label == 'closed' && closedhands == 1 &&   p.bbox[0] > 200  && p.bbox[1] < 200) userSelectionA++; //user is in a sector and made a selection
                if (p.label == 'closed' &&  closedhands == 1 &&  p.bbox[0] < 200  && p.bbox[1] < 200) userSelectionB++;


                if (p.label == 'closed' && closedhands == 1 &&  p.bbox[0] > 200  && p.bbox[1] > 200) userSelectionC++;
                if (p.label == 'closed' && closedhands == 1 && p.bbox[0] < 200  && p.bbox[1] > 200) userSelectionD++;

            }

        
            //custom gesture position and hand shape
            if (aSector == 1) this.detectedGesture = 'Hand in sector: A'
            if (bSector == 1) this.detectedGesture = 'Hand in sector: B'
            if (cSector == 1) this.detectedGesture = 'Hand in sector: C'
            if (dSector == 1) this.detectedGesture = 'Hand in sector: D'
         
            //custom gesture position and hand shape
            if (userSelectionA == 1) this.detectedGesture = 'Your Choice Is: A'
            if (userSelectionB == 1) this.detectedGesture = 'Your Choice Is: B'
            if (userSelectionC == 1) this.detectedGesture = 'Your Choice Is: C'
            if (userSelectionD == 1) this.detectedGesture = 'Your Choice Is: D'


            //default gestures only changing the return value
            if (openhands >= 2) this.detectedGesture = 'Show Answer'  //1
            if (closedhands >= 2) this.detectedGesture = 'Skip Question'//2
            if (pointing >= 2) this.detectedGesture = 'Quit Game'//3
            if (closedhands ==1 && pointing ==1) this.detectedGesture = 'Play Music'//5 play music
            if (closedhands ==1 && openhands ==1) this.detectedGesture = 'Stop Music'//4 pause music
            

            if(this.detectedGesture == 'Quit Game'){
              this.stopDetection()
            }

    
            if (aSector == 0 &&  bSector == 0 && cSector == 0 && dSector == 0 && openhands == 0 && closedhands == 0 && pointing == 0 && userSelectionA == 0 &&  userSelectionB == 0 && userSelectionC == 0 && userSelectionD == 0 ){
                  this.detectedGesture = "None";
            }

            this.onPrediction.emit(new PredictionEvent(this.detectedGesture))


        }, (err: any) => {
            console.log("ERROR")
            console.log(err)
        });
    }else{
        console.log("no model")
    }
  }
}
