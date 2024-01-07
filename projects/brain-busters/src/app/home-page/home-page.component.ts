import { Component, OnInit, Input } from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { TriviaAPIService } from '../trivia-api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor( private trivia: TriviaAPIService) { }
  ngOnInit(): void {

  }
  
  questionType:string ='multiple' // constant only multchoice quiz

  gesture: String = "";
  temporaryCategories:any;

  difficultyOption = ['easy', 'medium', 'hard']

  localCategories: any;
  
  //Quiz Default Settings
  displayCategory:string = 'General Knowledge'; // default category to display
  userCategory:any = 9; // default category id to send
  userDifficulty:any = 1; //default to medium difficulty
  userRounds:any= 5; //default to 5 rounds
  
  quizQuestions:any;
  
  quizButtonText:string = 'START QUIZ';
  showQuiz:boolean = false;
  howToPlay:boolean = false;
  howToText:string ='HOW TO PLAY'


  prediction(event: PredictionEvent){
      this.gesture = event.getPrediction();
  }


  //toggle what is displayed on the home page.
  startQuiz(){
    this.quizButtonText = 'Generating Questions...'    
    this.sendQuizInfo()
    this.howToPlay = false
    this.howToText='HOW TO PLAY'
    
    setTimeout(() => {
      this.quizQuestions = this.trivia.triviaQuestions;
      console.log(this.quizQuestions)
      this.showQuiz = !this.showQuiz;
      this.quizButtonText = 'START QUIZ'    
    }, 2000)
  }

  setUserDifficulty(n:number){
    this.userDifficulty = n
  }


  setUserRounds(x:any){
    let temp = Number((x.target as HTMLTextAreaElement).value)
    
    if(temp > 10){
      temp = 10;
    }

    if(temp <= 0){
      temp = 1
    }
    this.userRounds = temp
  }

  getCategories(){
    this.temporaryCategories= localStorage.getItem('categories');

    if(this.temporaryCategories == null){
      this.temporaryCategories = this.trivia.categories;
    }      
    this.localCategories = JSON.parse(this.temporaryCategories)['trivia_categories'];
  }


  sendQuizInfo(){
    this.trivia.getQuestions(this.userRounds,this.userCategory,this.difficultyOption[this.userDifficulty])
  }

  showHelp(){
    this.howToPlay = !this.howToPlay
    if(!this.howToPlay){
      this.howToText='HOW TO PLAY'
    }else{
      this.howToText='CLOSE'
    }
  }

  

}
