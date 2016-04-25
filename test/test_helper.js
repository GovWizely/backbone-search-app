import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.process.env.TRADE_API = {
  KEY: JSON.stringify('0ooVzDG3pxt0azCL9uUBMYLS'),
  HOST: JSON.stringify('https://api.govwizely.com')
};
