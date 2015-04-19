var ____Class7b=React.Component;for(var ____Class7b____Key in ____Class7b){if(____Class7b.hasOwnProperty(____Class7b____Key)){App[____Class7b____Key]=____Class7b[____Class7b____Key];}}var ____SuperProtoOf____Class7b=____Class7b===null?null:____Class7b.prototype;App.prototype=Object.create(____SuperProtoOf____Class7b);App.prototype.constructor=App;App.__superConstructor__=____Class7b;

  function App(props) {"use strict";
    ____Class7b.call(this,props)
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
        React.createElement(FavList, {orgs:  this.state.orgs, isLoggingIn:  this.state.isLoggingIn})
      )
    )
  }});




var ____Class7c=React.Component;for(var ____Class7c____Key in ____Class7c){if(____Class7c.hasOwnProperty(____Class7c____Key)){FavList[____Class7c____Key]=____Class7c[____Class7c____Key];}}var ____SuperProtoOf____Class7c=____Class7c===null?null:____Class7c.prototype;FavList.prototype=Object.create(____SuperProtoOf____Class7c);FavList.prototype.constructor=FavList;FavList.__superConstructor__=____Class7c;

  function FavList(props) {"use strict";
    ____Class7c.call(this,props)
  }

  Object.defineProperty(FavList.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    const items = ['Mine', 'Public']
      .map(function($FavList_)  { return { login: $FavList_ }}) // damn es6 is weird
      .concat(this.props.orgs || [])
      .map(function($FavList_)  {return React.createElement("li", null,  $FavList_.login);})

    return (
      React.createElement("section", {className: "FavList"}, 
        React.createElement("h2", null, "Favorites"), 
        React.createElement("ul", null,  items ), 
         this.props.isLoggingIn ? React.createElement("em", null, "Loading orgs...") : React.createElement("small", null, "Last updated ",  moment().format('h:ma') )
      )
    )

  }});



var ____Class7d=React.Component;for(var ____Class7d____Key in ____Class7d){if(____Class7d.hasOwnProperty(____Class7d____Key)){GithubLogin[____Class7d____Key]=____Class7d[____Class7d____Key];}}var ____SuperProtoOf____Class7d=____Class7d===null?null:____Class7d.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class7d);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class7d;

  function GithubLogin(props) {"use strict";
    ____Class7d.call(this,props)
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



var ____Class7e=React.Component;for(var ____Class7e____Key in ____Class7e){if(____Class7e.hasOwnProperty(____Class7e____Key)){QueryBar[____Class7e____Key]=____Class7e[____Class7e____Key];}}var ____SuperProtoOf____Class7e=____Class7e===null?null:____Class7e.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class7e);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class7e;

  function QueryBar(props) {"use strict";
    ____Class7e.call(this,props)
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