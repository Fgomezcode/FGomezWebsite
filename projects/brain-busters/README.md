--Readme document for Felipe Gomez Villalobos Fgomezvi@uci.edu 11521503

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

15/15
- 5/5 Created a functional web app
- 2/2 The ability to control the web app with basic gestures
- 4/4 The ability to control the web app with at least two custom gestures
- 2/2 Following good principles of UI design
- 1/1 Creating a compelling app and application of gestures
- 2/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
    This took over 20 hours. The majority was in the game logic and hand tracker logic. I would say I spent about 4/day over 7 days. 


3. What online resources did you consult when completing this assignment? (list specific URLs)
    Bootstrap.com
    angular.io
    stackoverflow.com - this was for variety of small css/html issue with placement and getting music to work
    https://opentdb.com/ - the trivia API for getting questions 
    I have a DS&A book i used for the shuffle algorithm


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
    None. I did this project alone


5. Is there anything special we need to know in order to run your code?
    - You need to have bootstrap intalled or CDN. 

    I had an issue with another project not compiling for the TA's. Heres how I compiled this one.

    - I am on a windows machine, using powershell terminals, aside from 'ng generate comonent'
        I cd into the src folder, and used 'ng serve'. Aside from bootstrap i didnt install any other dependencies.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
    I designed it for casual users, that like simple games. Users that do not want to mess with a lot of settings. As far as platforms
    go any user with internet access can use this application regardless of their hardware. 

7. Describe the two custom gestures you created.
    I created the closed/pointing, closed/open gestures. They start and stop the background music from playing durring the main game loop. I also modified the open/closed gesture to track positioning.

8. How does your app implement or follow principles of good UI design?
    I created components to compartmentalize portions of the app, and used Angular to render different parts rather than making multiple pages.
    I made sure to keep the users focus where it needs to be by keeping important information in the center of the screen. All buttons are easy to spot
    and give user feedback when they interact.