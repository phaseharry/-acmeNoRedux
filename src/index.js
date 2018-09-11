import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router} from 'react-router-dom';
import Main from './components/Main';

ReactDOM.render(<Router><Main/></Router>, document.getElementById('app'))