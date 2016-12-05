import ReactDom from 'react-dom';
import React from 'react';
import router from './router';
import config from './config';
import $ from 'jquery';
import store from './store';

const container = document.getElementById('container');

$(document).ajaxSend((evt, xhr, opts) => {
  if(opts.url.indexOf('bomb')===-1) {
    // console.log('intercepted');

    xhr.setRequestHeader('application-id', config.appId);
    xhr.setRequestHeader('secret-key', config.secret);
    xhr.setRequestHeader('application-type', 'REST');
  }
});

ReactDom.render(router, container);
