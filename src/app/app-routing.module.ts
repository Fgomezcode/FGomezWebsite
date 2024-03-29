import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ResumeComponent } from './resume/resume.component';
import { GuitarAlmanacComponent } from './guitar-almanac/guitar-almanac.component';
import { TriviaQuizComponent } from './trivia-quiz/trivia-quiz.component';
const routes: Routes = [
  {
    path: 'guitaralmanac', component: GuitarAlmanacComponent
  },
  {
    path: 'triviaQuiz', component: TriviaQuizComponent 
  },
  {
    path: 'resume', component: ResumeComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: '**', component: NotfoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
