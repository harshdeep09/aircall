import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Home from './screens/home';
const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Home/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
 