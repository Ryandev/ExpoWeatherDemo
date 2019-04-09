'use strict';

const queryString = require('querystring');


const API_URL = 'https://api.apixu.com/';
const API_VERSION = 'v1';
const FORMAT = 'json';
const HTTP_TIMEOUT = 20000;
const DOC_WEATHER_CONDITIONS_URL = 'https://www.apixu.com/doc/Apixu_weather_conditions.';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const config = {
  apikey: null,
};

class Apixu {
  constructor(config) {
    this.config = config;
  }

  conditions() {
    const url = DOC_WEATHER_CONDITIONS_URL + FORMAT;
    return request(url);
  }

  current(query) {
    const params = {
      key: this.config.apikey,
      q: query,
    };
    const url = getUrl('current', params);
    return request(url);
  }

  forecast(query, days) {
    const params = {
      key: this.config.apikey,
      q: query,
      days: days,
    };
    const url = getUrl('forecast', params);
    return request(url);
  }

  history(query, since) {
    if (!(since instanceof Date)) {
      return new Promise((resolve, reject) => {
        const error = new Error('Param \'since\' must be of Date type.');
        reject(error);
      });
    }

    const params = {
      key: this.config.apikey,
      q: query,
      dt: since.getFullYear() + '-' +
          (since.getMonth() + 1) + '-'
          + since.getDate(),
    };
    const url = getUrl('history', params);
    return request(url);
  }

  search(query) {
    const params = {
      key: this.config.apikey,
      q: query,
    };
    const url = getUrl('search', params);
    return request(url);
  }
}

module.exports = {
  config: config,
  Apixu: Apixu,
};

const getUrl = (method, params) => {
  return API_URL +
      API_VERSION + '/' +
      method + '.' + FORMAT +
      '?' + queryString.stringify(params);
};

const request = function(url) {
  let response = '';
  return new Promise(function(resolve, reject) {
    fetch(url)
	  .then(function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  }

		  // Examine the text in the response
		  response.json().then(function(data) {
			resolve(data)
		  });
		})
	  .catch(function(err) {
		console.log('Fetch Error :-S', err);
		reject(err);
	  });
  });
}