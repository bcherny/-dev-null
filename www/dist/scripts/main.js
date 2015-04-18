var ____Class4b=React.Component;for(var ____Class4b____Key in ____Class4b){if(____Class4b.hasOwnProperty(____Class4b____Key)){App[____Class4b____Key]=____Class4b[____Class4b____Key];}}var ____SuperProtoOf____Class4b=____Class4b===null?null:____Class4b.prototype;App.prototype=Object.create(____SuperProtoOf____Class4b);App.prototype.constructor=App;App.__superConstructor__=____Class4b;

  function App(props) {"use strict";
    ____Class4b.call(this,props)
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




var ____Class4c=React.Component;for(var ____Class4c____Key in ____Class4c){if(____Class4c.hasOwnProperty(____Class4c____Key)){GithubLogin[____Class4c____Key]=____Class4c[____Class4c____Key];}}var ____SuperProtoOf____Class4c=____Class4c===null?null:____Class4c.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class4c);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class4c;

  function GithubLogin(props) {"use strict";
    ____Class4c.call(this,props)
    this.state = {
      githubOauthClientId: '5dda5e640b390bc40468',
      githubOauthState: Math.random()*100000000000000000,
      didCheckLogin: false
    }
  }

  Object.defineProperty(GithubLogin.prototype,"user",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user')
  }});

  Object.defineProperty(GithubLogin.prototype,"login",{writable:true,configurable:true,value:function() {"use strict";

    window.location.pathname = '/login'

  }});

  Object.defineProperty(GithubLogin.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";

    // when the component loads, check if the user is signed in
    this
      .user()
      .done(function($GithubLogin_)  {return this.setState({ user: $GithubLogin_ });}.bind(this))
      .fail(function($GithubLogin_)  {return this.setState({ user: null });}.bind(this))
      .always(function($GithubLogin_)  {return this.setState({ didCheckLogin: true });}.bind(this))

  }});

  Object.defineProperty(GithubLogin.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    if (!this.state.didCheckLogin) {
      return React.createElement("div", null, "checking...")
    }

    console.info('got user', this.state.user)

    var githubLogin = this.state.user
      ? React.createElement("div", null, "logged in!")
      : React.createElement("a", {onClick: this.login.bind(this)}, "Sign into Github")

    return (
      githubLogin
    )
  }});



var ____Class4d=React.Component;for(var ____Class4d____Key in ____Class4d){if(____Class4d.hasOwnProperty(____Class4d____Key)){QueryBar[____Class4d____Key]=____Class4d[____Class4d____Key];}}var ____SuperProtoOf____Class4d=____Class4d===null?null:____Class4d.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class4d);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class4d;

  function QueryBar(props) {"use strict";
    ____Class4d.call(this,props)
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