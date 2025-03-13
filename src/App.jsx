import * as React from 'react';

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

  const [searchTerm, setSearchTerm] = React.useState('React');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Example of using spread operator to copy an object
  const newStory = {
    title: 'New Story',
    url: 'https://newstory.com',
    author: 'Author Name',
    num_comments: 0,
    points: 0,
    objectID: 2,
  };

  const updatedStories = [...stories, newStory]; // Adding a new story to the existing stories array

  // Example of using rest operator to collect remaining properties
  const { title, url, ...rest } = newStory;
  console.log(rest); // { author: 'Author Name', num_comments: 0, points: 0, objectID: 2 }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

// props gave us access to the data we needed, but another approach is to use destructuring to get the data we need directly from the props object
const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

// Example of nested destructuring
// Instead of accessing these properties individually like this:
// const { title, url, author, num_comments, points } = props.item;
const Item = ({ item: { title, url, author, num_comments, points } }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

export default App;
