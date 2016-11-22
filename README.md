Nerd Social
- Elevator Pitch:
  This app will allow a user to:
    - build a profile
    - search games
    - review/rate games
- Features:
  - User profiles:
    - users will be able to build an editable profile page that shows their highest rated games, as well as a list of all of their reviews
    - users will be able to search for other users profiles as well as subscribe to other users reviews
  - Game Pages:
    - users will be able to view individual game pages with a list of reviews
    - an average of all the ratings by users will be displayed
    - users will be able to reply to other users' reviews
    - users will be able to subscribe to a game's page

  - API:
    - Giant Bomb
  - Data Modeling:
    - Models:
     - Session
      - Full Name
      - Username
      - Email
      - Password
      - Photo
      - Bio
     - Game
      - Name
      - Company
      - Professional Reviews
      - Trailer
      - Description
      - Release Date
    - Collections:
     - Users
     - Games
     - Reviews

  - Routes:
    - /Home
      - View games and reviews, no user profiles unless logged in with link to login/register
    - /Login
    - /Register
    - /Create Profile
      - allows user to add picture and bio
    - /Search
      - Will display top rated games if no search has occurred
      - Will display a list of game choices (with ratings) based on user input into search
    - Game/:id
        - will allow users to view individual game pages
    - User/:id
      - Will allow users to view other users' profile page
  - Special Features:
    - Users will be able to upload a profile picture








<!--  -->
