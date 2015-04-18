var ____Class4L=React.Component;for(var ____Class4L____Key in ____Class4L){if(____Class4L.hasOwnProperty(____Class4L____Key)){App[____Class4L____Key]=____Class4L[____Class4L____Key];}}var ____SuperProtoOf____Class4L=____Class4L===null?null:____Class4L.prototype;App.prototype=Object.create(____SuperProtoOf____Class4L);App.prototype.constructor=App;App.__superConstructor__=____Class4L;

  function App(props) {"use strict";
    ____Class4L.call(this,props)
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




var ____Class4M=React.Component;for(var ____Class4M____Key in ____Class4M){if(____Class4M.hasOwnProperty(____Class4M____Key)){GithubLogin[____Class4M____Key]=____Class4M[____Class4M____Key];}}var ____SuperProtoOf____Class4M=____Class4M===null?null:____Class4M.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class4M);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class4M;

  function GithubLogin(props) {"use strict";
    ____Class4M.call(this,props)
    this.state = {
      didCheckLogin: false
    }
  }

  Object.defineProperty(GithubLogin.prototype,"getUser",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user')
  }});

  Object.defineProperty(GithubLogin.prototype,"getOrgs",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/orgs')
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



var ____Class4N=React.Component;for(var ____Class4N____Key in ____Class4N){if(____Class4N.hasOwnProperty(____Class4N____Key)){QueryBar[____Class4N____Key]=____Class4N[____Class4N____Key];}}var ____SuperProtoOf____Class4N=____Class4N===null?null:____Class4N.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class4N);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class4N;

  function QueryBar(props) {"use strict";
    ____Class4N.call(this,props)
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