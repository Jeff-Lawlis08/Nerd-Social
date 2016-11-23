import ReactDom from 'react-dom';
import React from 'react';
import router from './router';
import config from './config';

let container = document.getElementById('container');

ReactDom.render(router, container);
