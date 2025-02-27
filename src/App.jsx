const title = 'React';

function App() {
  // can perform some logic here before returning the JSX
  // variables and functions defined inside this function (before the return statement) will be redefined on each render
  
  const greeting = 'Hello React'; // this var will be redefined on each render
  
  return (
    <div>
      {/* cannot define variables or functions directly inside the return statement */}
      <h1>{greeting}</h1>
      <p>{`Welcome to ${title}`}</p> {/* inline expression */}
    </div>
  );
}

export default App;