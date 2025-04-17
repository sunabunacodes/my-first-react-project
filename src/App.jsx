import * as React from 'react';

// Simulates fetching stories asynchronously
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000 // Simulates a 2-second delay
    )
  );

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const initialStories = [
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

const App = () => {

  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  const [stories, setStories] = React.useState([]); // State to hold stories
  const [isLoading, setIsLoading] = React.useState(false); // State to track loading status
  const [isError, setIsError] = React.useState(false); // State to track error status. No error in our simulated enviroment but there could be with the use of an API

  React.useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching starts
    // Fetch stories asynchronously when the component mounts(is first rendered)
    getAsyncStories().then((result) => {
      setStories(result.data.stories); // Update state with fetched stories
      setIsLoading(false); // Set loading to false when fetching is done
    });
  }, []); // Empty dependency array ensures this runs only once

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (isLoading) {
  //   return <p>Loading ...</p>; // Show loading message while fetching but only loading will render and nothing else
  // }

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
      {isError && <p>Something went wrong ...</p>} {/* instead of tenerary operator where one side returns null, we can use && to conditionally render the error message*/}
      {isLoading ? (
        <p>Loading ...</p> // Show loading message while fetching stories
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
      )}
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {

  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default App;