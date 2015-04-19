'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _FavList = require('./FavList');

var _FavList2 = _interopRequireWildcard(_FavList);

var _TopHeader = require('./TopHeader');

var _TopHeader2 = _interopRequireWildcard(_TopHeader);

var _QueryBar = require('./QueryBar');

var _QueryBar2 = _interopRequireWildcard(_QueryBar);

var App = (function (_React$Component) {
  function App(props) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
    this.state = {
      orgs: null,
      user: null,
      isLoggingIn: false
    };
  }

  _inherits(App, _React$Component);

  _createClass(App, [{
    key: 'getUser',
    value: function getUser() {
      return $.get('/user');
    }
  }, {
    key: 'getOrgs',
    value: function getOrgs() {
      return $.get('/user/orgs');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.setState({ isLoggingIn: true });

      this

      // when the component loads, check if the user is signed in
      .getUser().done(function (_) {
        return _this.setState({ user: _ });
      }).fail(function (_) {
        return _this.setState({ user: null });
      }).always(function (_) {
        return _this.setState({ isLoggingIn: false });
      })

      // then, fetch their github orgs
      .then(function (_) {
        return _this.getOrgs();
      }).done(function (_) {
        return _this.setState({ orgs: _ });
      }).fail(function (_) {
        return _this.setState({ orgs: null });
      }).always(function (_) {
        return _this.setState({ isLoggingIn: false });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(_TopHeader2['default'], { user: this.state.user, orgs: this.state.orgs, isLoggingIn: this.state.isLoggingIn }),
        React.createElement(_QueryBar2['default'], null),
        React.createElement(_FavList2['default'], { user: this.state.user, orgs: this.state.orgs, isLoggingIn: this.state.isLoggingIn })
      );
    }
  }]);

  return App;
})(React.Component);

exports['default'] = App;
module.exports = exports['default'];
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var FavList = (function (_React$Component) {
  function FavList(props) {
    _classCallCheck(this, FavList);

    _get(Object.getPrototypeOf(FavList.prototype), 'constructor', this).call(this, props);
  }

  _inherits(FavList, _React$Component);

  _createClass(FavList, [{
    key: 'render',
    value: function render() {

      if (!this.props.user || !this.props.orgs) {
        return React.createElement('div', null);
      }

      // "_json" means something to the react transpiler :|
      var items = [{ avatar_url: this.props.user._json.avatar_url, login: 'Mine' }, { avatar: '', login: 'Public' }].concat(this.props.orgs || []).map(function (_) {
        return React.createElement(
          'li',
          null,
          React.createElement('img', { src: _.avatar_url }),
          _.login
        );
      });

      return React.createElement(
        'section',
        { className: 'FavList' },
        React.createElement(
          'h2',
          null,
          'Favorites'
        ),
        React.createElement(
          'ul',
          null,
          items
        ),
        this.props.isLoggingIn ? React.createElement(
          'em',
          null,
          'Loading orgs...'
        ) : React.createElement(
          'small',
          null,
          'Last updated ',
          moment().format('h:mma')
        )
      );
    }
  }]);

  return FavList;
})(React.Component);

exports['default'] = FavList;
module.exports = exports['default'];
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var GithubLogin = (function (_React$Component) {
  function GithubLogin(props) {
    _classCallCheck(this, GithubLogin);

    _get(Object.getPrototypeOf(GithubLogin.prototype), 'constructor', this).call(this, props);
  }

  _inherits(GithubLogin, _React$Component);

  _createClass(GithubLogin, [{
    key: 'login',
    value: function login() {
      window.location.pathname = '/login';
    }
  }, {
    key: 'render',
    value: function render() {

      if (this.props.isLoggingIn) {
        return React.createElement(
          'div',
          null,
          'Signing in...'
        );
      }

      console.info('got user', this.props.user, this.props.orgs);

      var githubLogin = this.props.user ? React.createElement(
        'div',
        null,
        this.props.user.username
      ) : React.createElement(
        'a',
        { onClick: this.login.bind(this) },
        'Sign into Github'
      );

      return React.createElement(
        'div',
        { className: 'GithubLogin' },
        githubLogin
      );
    }
  }]);

  return GithubLogin;
})(React.Component);

exports['default'] = GithubLogin;
module.exports = exports['default'];
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var QueryBar = (function (_React$Component) {
  function QueryBar(props) {
    _classCallCheck(this, QueryBar);

    _get(Object.getPrototypeOf(QueryBar.prototype), "constructor", this).call(this, props);
    this.state = {};
  }

  _inherits(QueryBar, _React$Component);

  _createClass(QueryBar, [{
    key: "render",
    value: function render() {
      return React.createElement("input", { className: "QueryBar", placeholder: "Enter a query...", type: "text" });
    }
  }]);

  return QueryBar;
})(React.Component);

exports["default"] = QueryBar;
module.exports = exports["default"];
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SettingsGear = (function (_React$Component) {
  function SettingsGear(_) {
    _classCallCheck(this, SettingsGear);

    _get(Object.getPrototypeOf(SettingsGear.prototype), "constructor", this).call(this, _);
  }

  _inherits(SettingsGear, _React$Component);

  _createClass(SettingsGear, [{
    key: "click",
    value: function click() {}
  }, {
    key: "render",
    value: function render() {

      return React.createElement("a", { className: "SettingsGear", onClick: this.click });
    }
  }]);

  return SettingsGear;
})(React.Component);

exports["default"] = SettingsGear;
module.exports = exports["default"];
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _GithubLogin = require('./GithubLogin');

var _GithubLogin2 = _interopRequireWildcard(_GithubLogin);

var _SettingsGear = require('./SettingsGear');

var _SettingsGear2 = _interopRequireWildcard(_SettingsGear);

var TopHeader = (function (_React$Component) {
  function TopHeader(_) {
    _classCallCheck(this, TopHeader);

    _get(Object.getPrototypeOf(TopHeader.prototype), 'constructor', this).call(this, _);
  }

  _inherits(TopHeader, _React$Component);

  _createClass(TopHeader, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'header',
        { className: 'TopHeader' },
        React.createElement(
          'h1',
          null,
          'ack.mo'
        ),
        React.createElement(
          'div',
          { className: 'pull-right' },
          React.createElement(_GithubLogin2['default'], { user: this.props.user, orgs: this.props.orgs, isLoggingIn: this.props.isLoggingIn }),
          React.createElement(_SettingsGear2['default'], null)
        )
      );
    }
  }]);

  return TopHeader;
})(React.Component);

exports['default'] = TopHeader;
module.exports = exports['default'];
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _App = require('./App');

var _App2 = _interopRequireWildcard(_App);

React.render(React.createElement(_App2['default'], null), document.querySelector('#main'));
