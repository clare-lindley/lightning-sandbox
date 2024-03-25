import ImageSearch from './ImageSearch'
import './App.css';

function App() {
  return (
    <div className="App">
     <h1>VISUAL LOCAL RESTAURANT SEARCH</h1>
    <ol>
      <li>Choose an image (OR Find an image and paste in the url)</li>
      <li>The app will recommend local restaurants based on the image you provided</li>
    </ol>
     <ImageSearch />
    </div>
  );
}

export default App;
