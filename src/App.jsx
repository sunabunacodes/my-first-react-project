import * as React from 'react';

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

const [searchTerm, setSearchTerm] = useStorageState(
  'search',
  'React'
);

  // imperative because it provides step-by-step instructions to update the state
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // declarative
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {/* declarative */}
      <List list={searchedStories} />
    </div>
  );
};

// Imperative: We provide *step-by-step how instructions* (e.g., useRef + useEffect to focus the input directly).
// Declarative: We tell *what to do* and let React handle the details (e.g., List rendering items from props).
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {

  // imperative

  // useRef is used here to directly interact with the DOM element (the input field)
  // avoids unnecessary renders because updating a ref doesn't trigger a re-render
  // e.g. of using useRef for an imperative action: focusing the input
  const inputRef = React.useRef();

  // useEffect is used here with useRef to perform an action (focusing the input)
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]); // Dependency array ensures this runs only when isFocused changes

  return (
    <>
      {/* declarative */}
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef} // ref is attached to the input element
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;