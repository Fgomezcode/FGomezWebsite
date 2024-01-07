import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CardComponent } from './card/card.component';
import { ResumeComponent } from './resume/resume.component';
import { GuitarAlmanacComponent } from './guitar-almanac/guitar-almanac.component';
import { TriviaQuizComponent } from './trivia-quiz/trivia-quiz.component';
@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HomeComponent,
    NotfoundComponent,
    CardComponent,
    GuitarAlmanacComponent,
    TriviaQuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
