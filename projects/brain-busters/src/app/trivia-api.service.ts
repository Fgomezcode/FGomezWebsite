import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TriviaAPIService {
  constructor() { }

  categories:any = localStorage.getItem('categories') == null ? this.cats(): localStorage.getItem('categories')
  
  triviaQuestions:any;


  // use the trivia API to get the categories
  // but we only want to call the API if we dont have a local copy
  // in memory, this way we avoid going over our call amount.
  cats(){
    // API URL
    const apiUrl = 'https://opentdb.com/api_category.php';
    
    //  GET request
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('getting categories from API') // lets us know we had to call the API
        localStorage.setItem('categories', JSON.stringify(data)) // store it so we dont call API again
        this.categories =  data;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }



    //this is the API call to get the questions
    getQuestions(rounds:any,category:any,difficulty:any  ){
      //'https://opentdb.com/api.php'

      let mainURL = 'https://opentdb.com/api.php'


      const questionURL = `${mainURL}?amount=${rounds}&category=${category}
                           &difficulty=${difficulty}&type=multiple`
      console.log(questionURL)
     
       //  GET request
       fetch(questionURL)
       .then(response => {
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         return response.json();
       })
       .then(data => {
         console.log('getting questions from API') // lets us know we had to call the API
         this.triviaQuestions = data;
         //console.log(this.triviaQuestions)
         
       })
       .catch(error => {
         console.error('Error:', error);
       });

      }




}


