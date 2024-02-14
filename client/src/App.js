import Chat from "./components/Chat";


function App() {
  return (
    <main>
      <header className="w-full text-center p-10">
        <h1 className="text-3xl font-[500] text-violet-100">Simple Chat Using OpenAI API</h1>
        <p className="text-violet-100 font-[300] text-sm p-2">Chat GPT clone app, just to practise working with openAI api and node JS.</p>
      </header>
      <section className="p-5">
        <Chat />
      </section>
    </main>
  );
}

export default App;
