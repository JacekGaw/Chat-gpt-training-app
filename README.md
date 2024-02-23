# Chat GPT Clone

Clone of Chat GPT that have similar functionalities:
- Writting to and receiving messages from OpenAI api,
- Creating multiple conversations with chat,
- Checking history of your previous conversations, when they were created and how many messages they have,
- Continuing old conversations from history,
- Deleting conversations from history.

#### Stack:
- ReactJS
- TailwindCSS
- NodeJS with Express
- MongoDB database
- OpenAI api

#### ALERT
To use this project you need your own API key. Go to https://openai.com/, create account, generate API key and copy it.
I have created .env-sample file where you need to paste it. Below I have provided full install instruction where I have included this step.
  
#### Installation guide:
Clone this repository by using:
<pre>git clone https://github.com/JacekGaw/Chat-gpt-training-app.git</pre>
Next step is to install packages using npm:
<pre>npm install</pre>
Do the same step in client folder:
<pre>
  cd client
  /client npm install
</pre>
Go to https://openai.com/, create account and generate your own API key. Then open provided .env-sample file and paste it there
<pre>OPENAI_API_KEY=Paste it here!</pre>
Save file and change file name from .env-sample to .env:
<pre>mv .env-sample .env</pre>
Then run this command in root directory: 
<pre>npm run dev</pre>
It will open express server on port localhost:3000.
Then go to /client folder and run:
<pre>npm start</pre>
That will create localhost server on some port.
Then go to your browser and open that second localhost server.

And that should be all, enjoy!
