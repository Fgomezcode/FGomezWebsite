import { Component, OnInit, Input } from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { HandtrackerComponent } from '../handtracker/handtracker.component';
import { HomePageComponent } from '../home-page/home-page.component';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor( ) { }
  ngOnInit(): void {
    this.updateDisplay();
    this.playMusic() // start music when the game starts
  }
  
  //inputs from the home component
  @Input() category:string;
  @Input() rounds:number;
  @Input() difficulty:number;
  @Input() quizQuery:any;
  
  //global index
  i:number = 0;

  gesture: String = "Press START To Begin Gesture Detection.";

  //answer key since we dont know the index of the correct answer everytime
  answerKeys:any = {0: 'A', 1: 'B', 2:'C', 3: 'D'}

  displayDifficulty:any = ['Easy', "Medium", "Hard"]

  //used to update the scrren 
  allAnswers:any [];
  correctAnswer:string;
  question:string;
  currentRound:number;

  currentScore:number = 0 ;

  keyForTracker:any;
  
  
  informationForUser:string = '';
  
  isGameOver:boolean = false; // when the game is over display information for the user. accuray total points, highscore
  isCorrect:boolean =false;
  
  isPlayMusic:boolean = true;
  audio = new Audio();
   
playMusic(){
  this.audio.src = 'assets/quizSong.mp3';
  this.audio.loop = true;

  if(this.isPlayMusic == true){
    this.audio.play();
    console.log('music playing')
  }else{
    this.audio.pause()
  }

}



// pass the correct answetr to hand tracker if it is correct then say correct on the screen
// and go to next question.
  updateDisplay(){
    if(this.i >= this.rounds){
      this.informationForUser = '!GAME OVER!'
      setTimeout(() => { // the user is correct but delay so it feels smoother
        this.i = 0;
        this.currentScore = 0;
        this.gesture =''
        this.informationForUser = ''
        location.reload()
      }, 2000)
    }

    this.currentRound = this.i+1;

    this.question = this.quizQuery['results'][this.i]['question']
    this.correctAnswer = this.quizQuery['results'][this.i]['correct_answer']
    this.allAnswers = this.quizQuery['results'][this.i]['incorrect_answers']
 
    
    // if we havent added the correct answer to selection do so, else do nothing
    if(!this.allAnswers.includes(this.correctAnswer)){
      this.allAnswers.push(this.correctAnswer)
    }


    
   // shuffle the answers so that D isnt always the correct answer
   // start from the end so that the most recent entry is more likely to shift
    for (var i= this.allAnswers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [this.allAnswers[i], this.allAnswers[j]] = [this.allAnswers[j], this.allAnswers[i]];
    }
      
    // get the index of the newly shuffled correct answer, changes everytime even if the rounds repeat
    let temp = this.answerKeys[this.allAnswers.indexOf(this.correctAnswer)] 
    console.log(`Temp: ${temp}`)
    this.keyForTracker = temp;
      
  }

  nextQuestion(){
    this.i++; // increase index to next question
    this.updateDisplay() // change the contents of the page
  }


  processGesture(){
    let possibleSolutions = ['Your Choice Is: A', 'Your Choice Is: B', 'Your Choice Is: C', 'Your Choice Is: D']
    let userChoice =''
    
    if(possibleSolutions.includes(String(this.gesture))){
      // if the user has made a choice we check the solution
      userChoice = this.gesture.slice(-1)
      this.checkSolution(userChoice)
    }

    if(this.gesture == 'Show Answer'){
      this.informationForUser = `The Answer is: ${this.keyForTracker}`
    }
    
    if(this.gesture =='Skip Question'){
      this.informationForUser = 'Skipping Question'

      //delay a bit so we dont skip too many questions
      setTimeout(() => { // the user is correct but delay so it feels smoother
        this.nextQuestion()
      }, 2000)
    }

    if(this.gesture == 'Quit Game' ){
      this.informationForUser = 'Quitting The Game'
      this.audio.pause()
      //delay a bit so exit is smoother
      setTimeout(() => { // the user is correct but delay so it feels smoother
        this.currentScore = 0;
        this.gesture =''
        this.informationForUser = ''
        location.reload()
      }, 2000)
    }


    if( this.gesture == 'Play Music'){
      this.isPlayMusic = true;
      this.playMusic()
    }

    if( this.gesture == 'Stop Music'){
      this.isPlayMusic = false;
      this.playMusic()
    }
   
    //this.gesture = 'Searching For Gesture.'
   
    console.log(userChoice)
  }


  checkSolution(userValue:String){
    // This only checks if they user is making a selection, no other gestures call this.

    this.isCorrect = (this.keyForTracker == userValue) // compare users current selection to 

    if(this.isCorrect){
      this.isCorrect = false;
      this.informationForUser = 'CORRECT!'
      setTimeout(() => { // the user is correct but delay so it feels smoother
        this.nextQuestion()
        this.currentScore += 100; // add to the users score
        this.informationForUser = ''
      }, 2000)
    }else{
      this.informationForUser = 'WRONG'
    }
    
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
  }



  









}
