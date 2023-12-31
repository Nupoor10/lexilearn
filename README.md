<h1 align="center">LexiLearn</h1>
<h3 align="center">"Building Equity in Education"</h3>
<p align="center">
  <img src="https://res.cloudinary.com/du9wkwhju/image/upload/v1704000054/logo_dm5wwf.png" height="250px">
</p>

<b>This is the frontend repo of the lexilearn project, the backend repo can be found [here](https://github.com/Nupoor10/lexilearn-backend)</b>

## Table Of Contents

* [Demo and Links](#demo-and-links)
* [About the Project](#about)
* [Built With](#built-with)
* [Features](#features)
* [How it works](#how-it-works)
* [Local Setup](#local-setup)
  * [Prerequisites](#prerequisites)
  * [Frontend](#frontend)
  * [Backend](#backend)

## Demo and Links

- Link to frontend repo can be found [here](https://github.com/Nupoor10/lexilearn)
- Link to backend repo can be found [here](https://github.com/Nupoor10/lexilearn-backend)
- Link to online demo can be found [here](https://lexilearn-tau.vercel.app/)

## About

Welcome to LexiLearn : the ultimate tool for your educational needs. Committed to advancing accessibility and equity in learning, LexiLearn delivers indispensable tools designed to cater to the unique needs of individuals with dyslexia and other learning disabilities. From sophisticated speech-to-text and text-to-speech functionalities to the integration of smart flashcards employing object detection, LexiLearn meticulously tailors an inclusive educational journey. 

<b>This project won the first prize🥇 in Hack Odisha 3.0, India's largest student run hackathon.</b>

## Built With

<div align="center">
    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"> 
    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> 
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> 
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/TensorFlow-FF6F80?style=for-the-badge&logo=tensorflow&logoColor=white"> 
    <img alt="Git" src="https://img.shields.io/badge/Git-F09032?style=for-the-badge&logo=git&logoColor=white" />
</div>

LexiLearn is primarily built using the MERN stack and integrates several SDKs and APIs for performing tasks regarding AI and ML.

- React.Js: React.Js is utilized for building the frontend components of the application. React.Js is a popular Javascript framework preferred for building frontend apps due to its component based architecture.

- CSS3 - Styling for the entire application is done using plain CSS3 utilizing appropriate media queries to ensure responsiveness across devices.

- Express.Js: The backend server of the project is built using Express.js which is a minimal and lightweight framework for building servers with Node.Js. The express server consists of controller logic, backend routes along with middleware for authentication.

- MongoDB: Mongo Atlas is used as the database to store application data. In addition, Mongoose is used which is a ORM for integrating MongoDB with Node.Js reducing the need of boilerplate code and provides important native MongoDB capabilities.

- Deepgram SDK: This project utilizes the deepgram SDK for speech to text conversion. Deepgram is a flexible platform supports multiple languages and use cases, making it a powerful tool for diverse needs.

- Cohere-AI: For text summarization functionality Cohere-AI's Node.Js SDK is utilized. It condenses key information into concise summaries, with adjustable length and style options to fit your needs.

- PlayHT: Text to Speech conversion was provided by PlayHT which is used to generate high-quality MP3 or WAV audio from your text in seconds, customize pronunciation and tone, and integrate speech seamlessly into videos, podcasts, or e-learning projects.

- Tensorflow.js: For the smart flash card functionality, Tensorflow.js is used for object detection. Tensorflow provides several models to choose from and this project utilizes their COCO SSD model in order to detect objects from a video stream.

- Unsplash API: Used to fetch high quality HD images for generating Flash Cards for the user.

## Features 

Lexilearn boasts a number of helpful features designed keeping in mind the needs of students especially those having learning disabilities.

- Notes: Users can create notes within the app by providing a title and content. The application allows users to view, update, delete their notes along with a basic search functionality in the frontend.

- Speech to Text: Users can record their audio and the applications transcribes it using the Deepgram SDK for Speech to Text conversion. In the frontend ```react-audio-voice-recorder``` library is used to record the user's audio and the buffer is send to the backend API which transcribes it by uploading the buffer to Deepgram. Deepgram then returns a transcript which is passed to the frontend and displayed to the user.

- Summary: A user can paste in the content they wish to summarize in the frontend component and the applications handles subsequent backend requests. For summarization, we have used the Cohere platform, which provides the ```cohere-ai``` npm package. We pass in parameter like required length and model to Cohere which subsequently returns the summarized version of the input text.

- Text to Speech: For text to speech conversion PlayHT is used which gives various options to generate AI voices with a generous free tier. We pass the text as well as the AI voice we want and the PlayHT SDK provides the URL for the audio generated.

- Flash Cards: The smart flash cards work in a multi-step process. First step is the object detection where we use the Tensorflow.js library with the pre-trained COCO-SSD model. Firstly the video stream is obtained by using ```react webcam```, users are given the option to start and stop detection and COCO-SSD model detects object from the video stream. Once object is correctly detected, the user sends an API request to the backend to create a flash card. In the backend, the controller fetches an HD image of the object detected from the Unsplash API and creates a flash card with the object name and image.

## How it works

1. Users can create a new account on the Registration page. The frontend sends user data to the backend API, where express router is used to attach handler functions i.e controllers to the specific API endpoint. A mongoose schema is created for saving user data to the database with basic details like name, email and password. The user password is hashed using the bcrypt library to ensure data protection.

![Registration Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000895/register_giecbo.png)

2. On successful registration, users are redirected to the Login page where they can login using their email and password. In the backend, the user entered password is hashed and compared with the hashed password stored in the database and then user is authenticated to access the application. A JSON Web Token is created for the authentication with the User ID which is then passed to the frontend.  Async-await along with try..catch is used to make code more readable and less error-prone along with handling promises gracefully. 

![Login Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000054/login_ktnlko.png)

3. Once the backend API checks that the user credentials are correct, the frontend stores the user details in a global state variable using React Context API to keep track of the currently logged in user. This global 'user' object is also used in subsequent backend requests where the JWT token is passed in the 'Authorization' header and the backend authentication middleware ensures that the token is valid and the user making the request exists in the database.

4. The User is redirected to the Dashboard Page where they can see all the features of the application upfront. For this, a responsive tab-like UI is developed so that users can navigate between various components a.k.a features with ease across various devices. Along with this, users are also given the option to Logout of the application which subsequently sets the global user state variable as null and clears the local storage

![Dashboard Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000903/dashboard_ha1hsc.png)

![Dashboard Page Mobile View](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000904/dashboardmob_dvomt8.png)

5. The first feature a user can access is the notes feature. This feature allows the user to create notes and save all their notes in a single place. To create a new note users need to provide a note title along with its content. A new collection is created in the database to store all user notes with each Note document belonging to a single user.

![Create a Note Component](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000055/newnote_xtbt8x.png)

Users can view all their notes and search for their notes using the 'title' property of the note

![Search Notes using Title](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000895/search_nlkzig.png)

Users can view their notes using a responsive modal

![View Note Modal](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000899/viewnote_hbac1p.png)

Users are also given the option to edit their note title or content

![Edit Note Modal](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000053/editnote_qc3syy.png)

Users can delete their notes as well. The appropriate axios requests are made to the backend endpoints to achieve the CRUD operations

![Delete Notes](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000051/deletenote_jyrj5e.png)

5. Next feature is the speech to text conversion, which allows a user to record an audio, and the send it to the backend which transcribes and returns the text to the user. To record the audio in the frontend we have used the ```react-audio-voice-recorder``` library that records user's voice and gives an audio blob object. This Blob is converted to a Buffer to enable transcription by the backend. We use multer which is a node. js middleware for handling multipart/form-data, in order to upload our audio file. The deepgram SDK used is provided with the pre-recorded audio passing the buffer and file type. The SDK returns the transcript which is passed to the frontend and can be copied by the user.

![Recording Audio](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000859/recording_oufixs.png)

![Recorded Audio](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000067/recorded_nw0jug.png)

![Audio Transcript](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000897/transcript_scaa8h.png)

6. The summarization feature in the application is powered by Cohere. Cohere provides Large Language Models(LLMs) that perform a variety of tasks from text generation, classification, semantic search along with summarization. We can use the summarization model providing arguments including text format, expected summary size by integrating its Node.js SDK into our application. This allows users to get a quick gist of a lengthy piece of text saving time and effort.

![Summarize Text](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000896/summary_oz5kp2.png)

7. For the Text to Speech conversion, we have used the PlayHT AI voice generator. PlayHT allows users to convert text into speech by leveraging AI generated voices with an extensive library to choose from. It provides a Node.js SDK for easy integration along with a generous free tier for users. In our frontend, we prompt the users to enter the text they wish to convert, passing it to the backend controller generate() function of the SDK generating a URL of the audio which the frontend passes to an ```<audio>``` tag.

![Convert text into speech](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000896/text_fcusx4.png)

8. The final feature is the flashcard feature. This feature was introduced keeping in mind that students especially those with learning disabilities learn better wiht multiple inputs like sound, text and images. Users  can scan a particular object, which they wish to remember in the future. The application generates a flashcard so users can remember what that object is called along with its spelling. 

Firstly, we use Tensorflow.js in our frontend for object detection, in particular the pre-trained COCO-SSD model. We utilize ```react-webcam``` library to fetch the live video stream of the user, We provide controls like stop and start detection to the user to allow them to capture the object. Finally the user can create a card of the object detected. This sends an API request to the Unsplash API in the backend and fetches an HD image of the object detected and creates a flash card using the object name and the image. This is stored in a new collection in the database with each document belonging to single user. Users can view as well as delete their created flash cards.

![Detect the object from webcam](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000053/detect_ghog7b.png)

![Add the flash card](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000901/addcard_hq7if4.png)

![View all cards](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000902/allcards_kwxbgi.png)

![Delete a card](https://res.cloudinary.com/du9wkwhju/image/upload/v1704000906/deletecard_d94mxo.png)

## Local setup

### Prerequisites

#### Install Node.JS latest version: 

I recommend using NVM to manage your Node.Js versions. You can install NVM for windows from [here](https://github.com/coreybutler/nvm-windows). 

For installing the latest Node.Js version using nvm use command:

```nvm install latest``` and then type ```nvm use <version>```

Alternatively the link to install Node.js can be found [here](https://nodejs.org/en/download)

### Backend

1. Clone the repo:

```
git clone https://github.com/Nupoor10/lexilearn-backend.git
```

2. Install all dependencies:

```
npm install
```

3. Copy the .env file

```
copy .env.example .env
```

4. Specify the .env variables like PORT, JWT_SECRET and MONGO_URI

5. For obtaining the API keys for the external APIs refer:

- [Cohere](https://www.nightfall.ai/ai-security-101/cohere-api-key#:~:text=To%20get%20a%20Cohere%20API%20key%2C%20developers%20need%20to%20sign,key%20from%20the%20Cohere%20dashboard.)

- [Deepgram](https://developers.deepgram.com/docs/create-additional-api-keys)

- [PlatHT](https://docs.play.ht/reference/api-getting-started)

- [Unsplash](https://unsplash.com/documentation)

6. Run the development server:

```
npm run dev
```

### Frontend

1. Clone the repo:

```
git clone https://github.com/Nupoor10/lexilearn.git
```

2. Install all dependencies:

```
npm install
```

3. Copy the .env file

```
copy .env.example .env
```

4. Replace the VITE_BACKEND_URL by your backend url specifying the port. The default value is: 

```
http://localhost:8080/api/v1
```

5. Run the development server:

```
npm run dev
```
