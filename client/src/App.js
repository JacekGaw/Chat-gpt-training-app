import Chat from "./components/Chat";
import StartConv from "./components/StartConv";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
      <main>
        <header className="w-full text-center p-10">
          <h1 className="text-3xl font-[500] text-violet-100">
            Simple Chat Using OpenAI API
          </h1>
          <p className="text-violet-100 font-[300] text-sm p-2">
            Chat GPT clone app, just to practise working with openAI api and
            node JS.
          </p>
          
        </header>
        <section className="p-5 max-w-screen-xl mx-auto flex flex-col  gap-5">
          <Routes>
            <Route path="/" element={<StartConv />} />
            <Route path="/c/:conversationIDparam" element={<Chat />} />
          </Routes>
        </section>
      </main>
  );
}

export default App;
