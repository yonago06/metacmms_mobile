import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route } from 'react-router-dom';
import Qr from './components/qr';
import AssetEditor from './components/assetEditor';
import RequestEditor from './components/requestEditor';
import RequestList from './components/requestList';
import AssetHistoryList from './components/assetHistoryList';

ReactDOM.render(
  <Router >
      <div>
        <Route exact path="/" component={App} />
        <Route path="/qr" component={Qr} />
        <Route path="/assetEditor/:nid" component={AssetEditor} />
        <Route path="/assetHistoryList/:nid" component={AssetHistoryList} />
        <Route path="/requestEditor/:nid" component={RequestEditor} />
        <Route path="/requestList" component={RequestList} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
