import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Cau hinh Redux
import {Provider} from 'react-redux';
import {store} from './Redux/configStore';
// thu vien ant.design
import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

// sự kiện BACK TO TOP khi cuộn window
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById('backToTop').style.display = "block";
  } else {
      document.getElementById('backToTop').style.display = "none";
  }
}
window.onscroll = function() {scrollFunction()};

