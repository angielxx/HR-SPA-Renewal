import HomePage from './page/HomePage.js';
import SignupPage from './page/SignupPage.js';
import Header from './components/Header.js';

const routes = [
  {
    path: '/web/',
    view: HomePage,
  },
  {
    path: '/web/signup',
    view: SignupPage,
  },
];

const App = async () => {
  new Header(document.querySelector('.app'));

  const main = document.createElement('main');
  main.id = 'page_content';
  document.querySelector('.app').appendChild(main);

  const pageMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: window.location.pathname === route.path,
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

  new match.route.view(document.querySelector('#page_content'));
};

export const navigate = (url) => {
  window.history.pushState({}, null, url);
  App();
};

App();
