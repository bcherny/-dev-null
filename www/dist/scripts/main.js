var ____Class3Z=React.Component;for(var ____Class3Z____Key in ____Class3Z){if(____Class3Z.hasOwnProperty(____Class3Z____Key)){App[____Class3Z____Key]=____Class3Z[____Class3Z____Key];}}var ____SuperProtoOf____Class3Z=____Class3Z===null?null:____Class3Z.prototype;App.prototype=Object.create(____SuperProtoOf____Class3Z);App.prototype.constructor=App;App.__superConstructor__=____Class3Z;

  function App(props) {"use strict";
    ____Class3Z.call(this,props)
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




var ____Class40=React.Component;for(var ____Class40____Key in ____Class40){if(____Class40.hasOwnProperty(____Class40____Key)){GithubLogin[____Class40____Key]=____Class40[____Class40____Key];}}var ____SuperProtoOf____Class40=____Class40===null?null:____Class40.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class40);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class40;

  function GithubLogin(props) {"use strict";
    ____Class40.call(this,props)
    this.state = {
      githubOauthClientId: '5dda5e640b390bc40468',
      githubOauthState: Math.random()*100000000000000000,
      didCheckLogin: false
    }
  }

  // TODO: do this better
  Object.defineProperty(GithubLogin.prototype,"user",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user')
  }});

  Object.defineProperty(GithubLogin.prototype,"login",{writable:true,configurable:true,value:function() {"use strict";

    window.location.pathname = '/login'

    // $.get('/login').then(console.log)

    // const scope = ['user:email', 'read:org'].join(',')

    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${ this.state.githubOauthClientId }&state=${ this.state.githubOauthState }&scope=${ scope }`

  }});

  Object.defineProperty(GithubLogin.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";

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

    console.log('user', this.state.user)

    var githubLogin = this.state.user
      ? React.createElement("div", null, "logged in!")
      : React.createElement("a", {onClick: this.login.bind(this)}, "Sign into Github")

    return (
      githubLogin
    )
  }});



var ____Class41=React.Component;for(var ____Class41____Key in ____Class41){if(____Class41.hasOwnProperty(____Class41____Key)){QueryBar[____Class41____Key]=____Class41[____Class41____Key];}}var ____SuperProtoOf____Class41=____Class41===null?null:____Class41.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class41);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class41;

  function QueryBar(props) {"use strict";
    ____Class41.call(this,props)
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