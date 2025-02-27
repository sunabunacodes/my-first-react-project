import js from "@eslint/js";

function getTitle(title) {
  return title;
}

// JSX uses camelCase for attributes instead of HTML's kebab-case (e.g., htmlFor instead of for).
// JSX is a syntax extension to JavaScript. Build tools are used to recognize JSX in .js files.
// React doesn't require you to use JSX, but it's intuitive and commonly used.
// You can embed JavaScript expressions in JSX using {}.
// JSX can't be directly rendered by browsers and needs to be compiled.

function App() {
  return (
    <div>
      <h1>Hello {getTitle('React')}</h1> {/* {} used to interpolate JavaScript expression */}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" /> {/* If you look at attributes like id, HTML can almost be used in its native form */}
    </div>
  );
}

export default App;