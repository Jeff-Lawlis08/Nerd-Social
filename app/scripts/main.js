import ReactDom from 'react-dom';
import React from 'react';
import router from './router';

let container = document.getElementById('container');

ReactDom.render(router, container);
