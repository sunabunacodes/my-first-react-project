import * as React from 'react'; 

const App = () => { // React Function Component
  const stories = [ // Lists in React
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

  const handleSearch = (event) => { // Handler Function in JSX
    console.log(event.target.value); // [4: Callback Handlers in JSX]: handleSearch logs search term
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* This is an instance of the Search component, so we say it's an element */}
      <Search onSearch={handleSearch} /> {/* React Props */}

      <hr />

      <List list={stories} /> {/* React Props */} {/* [5: Callback Handlers in JSX]: App passes stories to List */}
    </div>
  );
};

/*
React Component Overview
- Root components are always at the top of a component tree
- Leaf components do not render other components
- Components can have zero, one, or many child components
- Refactoring involves extracting components
*/
const Search = (props) => { 
  /*
  React State
  - stateful value that changes over time
  - React.useState is called a react hook
  - state or prop changes cause a re-render
  */
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => { // Callback Handlers in JSX
    setSearchTerm(event.target.value); // [2: Callback Handlers in JSX]: handleChange updates searchTerm

    props.onSearch(event); // React Props // [3: Callback Handlers in JSX]: handleChange calls onSearch
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} /> {/* [1: Callback Handlers in JSX]: "Testing" in search input */}

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};

const List = (props) => ( 
  <ul>
    {props.list.map((item) => ( // Lists in React
      <Item key={item.objectID} item={item} /> // React Props
    ))}
  </ul>
);

const Item = (props) => ( 
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App; 