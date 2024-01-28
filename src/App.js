import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookComments from './components/BookComments';
import MovieComments from './components/MovieComments';
import EventComments from './components/EventComments';

const App = () => {
  const [key, setKey] = useState('books');

  return (
    <div className="App">
      <h1>MEGA YORUMLUYOR</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="books" title="Kitaplar">
          <div className="content">
            <BookComments bookTitle="Gece Yarısı Kütüphanesi" bookImage="gyk.jpg" />
          </div>
        </Tab>
        <Tab eventKey="movies" title="Filmler">
          <div className="content movies">
            <MovieComments filmTitle="The Shawshank Redemption" filmImage="eb.jpg" />
          </div>
        </Tab>
        <Tab eventKey="events" title="Etkinlikler">
          <div className="content events">
            <EventComments eventTitle="Meram Belediyesi'nin Mega Yorumluyor Etkinlikleri" eventImage="mb.jpg" />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;
