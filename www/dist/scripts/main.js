var ____Class4O=React.Component;for(var ____Class4O____Key in ____Class4O){if(____Class4O.hasOwnProperty(____Class4O____Key)){App[____Class4O____Key]=____Class4O[____Class4O____Key];}}var ____SuperProtoOf____Class4O=____Class4O===null?null:____Class4O.prototype;App.prototype=Object.create(____SuperProtoOf____Class4O);App.prototype.constructor=App;App.__superConstructor__=____Class4O;

  function App(props) {"use strict";
    ____Class4O.call(this,props)
    this.state = {}
  }

  Object.defineProperty(App.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
    return (
      React.createElement("div", null, 
        React.createElement(GithubLogin, null), 
        React.createElement(QueryBar, null)
      )
    )
  }});




var ____Class4P=React.Component;for(var ____Class4P____Key in ____Class4P){if(____Class4P.hasOwnProperty(____Class4P____Key)){GithubLogin[____Class4P____Key]=____Class4P[____Class4P____Key];}}var ____SuperProtoOf____Class4P=____Class4P===null?null:____Class4P.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class4P);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class4P;

  function GithubLogin(props) {"use strict";
    ____Class4P.call(this,props)
    this.state = {
      didCheckLogin: false
    }
  }

  Object.defineProperty(GithubLogin.prototype,"getUser",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user')
  }});

  Object.defineProperty(GithubLogin.prototype,"getOrgs",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user/orgs')
  }});

  Object.defineProperty(GithubLogin.prototype,"login",{writable:true,configurable:true,value:function() {"use strict";
    window.location.pathname = '/login'
  }});

  Object.defineProperty(GithubLogin.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";

    this

      // when the component loads, check if the user is signed in
      .getUser()
      .done(function($GithubLogin_)  {return this.setState({ user: $GithubLogin_ });}.bind(this))
      .fail(function($GithubLogin_)  {return this.setState({ user: null });}.bind(this))
      .always(function($GithubLogin_)  {return this.setState({ didCheckLogin: true });}.bind(this))

      // then, fetch their github orgs
      .then(function($GithubLogin_)  {return this.getOrgs();}.bind(this))
      .done(function($GithubLogin_)  {return this.setState({ orgs: $GithubLogin_ });}.bind(this))
      .fail(function($GithubLogin_)  {return this.setState({ orgs: null });}.bind(this))
      .always(function($GithubLogin_)  {return this.setState({ didCheckLogin: true });}.bind(this))

  }});

  Object.defineProperty(GithubLogin.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    if (!this.state.didCheckLogin) {
      return React.createElement("div", null, "...")
    }

    console.info('got user', this.state.user, this.state.orgs)

    var githubLogin = this.state.user
      ? React.createElement("div", null, "logged in!")
      : React.createElement("a", {onClick: this.login.bind(this)}, "Sign into Github")

    return (
      githubLogin
    )
  }});



var ____Class4Q=React.Component;for(var ____Class4Q____Key in ____Class4Q){if(____Class4Q.hasOwnProperty(____Class4Q____Key)){QueryBar[____Class4Q____Key]=____Class4Q[____Class4Q____Key];}}var ____SuperProtoOf____Class4Q=____Class4Q===null?null:____Class4Q.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class4Q);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class4Q;

  function QueryBar(props) {"use strict";
    ____Class4Q.call(this,props)
    this.state = {}
  }

  Object.defineProperty(QueryBar.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
    return (
      React.createElement("input", {className: "QueryBar", type: "text"})
    )
  }});




React.render(
  React.createElement(App, null),
  document.querySelector('#main')
)