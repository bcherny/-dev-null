var ____Class7T=React.Component;for(var ____Class7T____Key in ____Class7T){if(____Class7T.hasOwnProperty(____Class7T____Key)){App[____Class7T____Key]=____Class7T[____Class7T____Key];}}var ____SuperProtoOf____Class7T=____Class7T===null?null:____Class7T.prototype;App.prototype=Object.create(____SuperProtoOf____Class7T);App.prototype.constructor=App;App.__superConstructor__=____Class7T;

  function App(props) {"use strict";
    ____Class7T.call(this,props)
    this.state = {
      orgs: null,
      user: null,
      isLoggingIn: false
    }
  }

  Object.defineProperty(App.prototype,"getUser",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user')
  }});

  Object.defineProperty(App.prototype,"getOrgs",{writable:true,configurable:true,value:function() {"use strict";
    return $.get('/user/orgs')
  }});

  Object.defineProperty(App.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";

    this
      .setState({ isLoggingIn: true })

    this

      // when the component loads, check if the user is signed in
      .getUser()
      .done(function($App_)  {return this.setState({ user: $App_ });}.bind(this))
      .fail(function($App_)  {return this.setState({ user: null });}.bind(this))
      .always(function($App_)  {return this.setState({ isLoggingIn: false });}.bind(this))

      // then, fetch their github orgs
      .then(function($App_)  {return this.getOrgs();}.bind(this))
      .done(function($App_)  {return this.setState({ orgs: $App_ });}.bind(this))
      .fail(function($App_)  {return this.setState({ orgs: null });}.bind(this))
      .always(function($App_)  {return this.setState({ isLoggingIn: false });}.bind(this))

  }});

  Object.defineProperty(App.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
    return (
      React.createElement("div", null, 
        React.createElement(GithubLogin, {user:  this.state.user, orgs:  this.state.orgs, isLoggingIn:  this.state.isLoggingIn}), 
        React.createElement(QueryBar, null), 
        React.createElement(FavList, {user:  this.state.user, orgs:  this.state.orgs, isLoggingIn:  this.state.isLoggingIn})
      )
    )
  }});




var ____Class7U=React.Component;for(var ____Class7U____Key in ____Class7U){if(____Class7U.hasOwnProperty(____Class7U____Key)){FavList[____Class7U____Key]=____Class7U[____Class7U____Key];}}var ____SuperProtoOf____Class7U=____Class7U===null?null:____Class7U.prototype;FavList.prototype=Object.create(____SuperProtoOf____Class7U);FavList.prototype.constructor=FavList;FavList.__superConstructor__=____Class7U;

  function FavList(props) {"use strict";
    ____Class7U.call(this,props)
  }

  Object.defineProperty(FavList.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    if (!this.props.user || !this.props.orgs) {
      return React.createElement("div", null)
    }

    // "_json" means something to the react transpiler :|
    const items = [
      { avatar_url: this.props.user['_json'].avatar_url, login: 'Mine' },
      { avatar: '', login: 'Public' }
    ]
      .concat(this.props.orgs || [])
      .map(function($FavList_)  {return React.createElement("li", null, React.createElement("img", {src:  $FavList_.avatar_url}),  $FavList_.login);})

    return (
      React.createElement("section", {className: "FavList"}, 
        React.createElement("h2", null, "Favorites"), 
        React.createElement("ul", null,  items ), 
         this.props.isLoggingIn ? React.createElement("em", null, "Loading orgs...") : React.createElement("small", null, "Last updated ",  moment().format('h:mma') )
      )
    )

  }});



var ____Class7V=React.Component;for(var ____Class7V____Key in ____Class7V){if(____Class7V.hasOwnProperty(____Class7V____Key)){GithubLogin[____Class7V____Key]=____Class7V[____Class7V____Key];}}var ____SuperProtoOf____Class7V=____Class7V===null?null:____Class7V.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class7V);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class7V;

  function GithubLogin(props) {"use strict";
    ____Class7V.call(this,props)
  }

  Object.defineProperty(GithubLogin.prototype,"login",{writable:true,configurable:true,value:function() {"use strict";
    window.location.pathname = '/login'
  }});

  Object.defineProperty(GithubLogin.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    if (this.props.isLoggingIn) {
      return React.createElement("div", null, "Signing in...")
    }

    console.info('got user', this.props.user, this.props.orgs)

    var githubLogin = this.props.user
      ? React.createElement("div", null, "logged in!")
      : React.createElement("a", {onClick: this.login.bind(this)}, "Sign into Github")

    return (
      React.createElement("div", {className: "GithubLogin"}, 
         githubLogin 
      )
    )
  }});



var ____Class7W=React.Component;for(var ____Class7W____Key in ____Class7W){if(____Class7W.hasOwnProperty(____Class7W____Key)){QueryBar[____Class7W____Key]=____Class7W[____Class7W____Key];}}var ____SuperProtoOf____Class7W=____Class7W===null?null:____Class7W.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class7W);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class7W;

  function QueryBar(props) {"use strict";
    ____Class7W.call(this,props)
    this.state = {}
  }

  Object.defineProperty(QueryBar.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
    return (
      React.createElement("input", {className: "QueryBar", placeholder: "Enter a query...", type: "text"})
    )
  }});




React.render(
  React.createElement(App, null),
  document.querySelector('#main')
)