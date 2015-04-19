var ____Class8F=React.Component;for(var ____Class8F____Key in ____Class8F){if(____Class8F.hasOwnProperty(____Class8F____Key)){App[____Class8F____Key]=____Class8F[____Class8F____Key];}}var ____SuperProtoOf____Class8F=____Class8F===null?null:____Class8F.prototype;App.prototype=Object.create(____SuperProtoOf____Class8F);App.prototype.constructor=App;App.__superConstructor__=____Class8F;

  function App(props) {"use strict";
    ____Class8F.call(this,props)
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
        React.createElement(TopHeader, {user:  this.state.user, orgs:  this.state.orgs, isLoggingIn:  this.state.isLoggingIn}), 
        React.createElement(QueryBar, null), 
        React.createElement(FavList, {user:  this.state.user, orgs:  this.state.orgs, isLoggingIn:  this.state.isLoggingIn})
      )
    )
  }});




var ____Class8G=React.Component;for(var ____Class8G____Key in ____Class8G){if(____Class8G.hasOwnProperty(____Class8G____Key)){FavList[____Class8G____Key]=____Class8G[____Class8G____Key];}}var ____SuperProtoOf____Class8G=____Class8G===null?null:____Class8G.prototype;FavList.prototype=Object.create(____SuperProtoOf____Class8G);FavList.prototype.constructor=FavList;FavList.__superConstructor__=____Class8G;

  function FavList(props) {"use strict";
    ____Class8G.call(this,props)
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



var ____Class8H=React.Component;for(var ____Class8H____Key in ____Class8H){if(____Class8H.hasOwnProperty(____Class8H____Key)){TopHeader[____Class8H____Key]=____Class8H[____Class8H____Key];}}var ____SuperProtoOf____Class8H=____Class8H===null?null:____Class8H.prototype;TopHeader.prototype=Object.create(____SuperProtoOf____Class8H);TopHeader.prototype.constructor=TopHeader;TopHeader.__superConstructor__=____Class8H;

  function TopHeader($TopHeader_) {"use strict";
    ____Class8H.call(this,$TopHeader_)
  }

  Object.defineProperty(TopHeader.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    return (
      React.createElement("header", {className: "TopHeader"}, 
        React.createElement("h1", null, "ack.mo"), 
        React.createElement("div", {className: "pull-right"}, 
          React.createElement(GithubLogin, {user:  this.props.user, orgs:  this.props.orgs, isLoggingIn:  this.props.isLoggingIn}), 
          React.createElement(SettingsGear, null)
        )
      )
    )

  }});



var ____Class8I=React.Component;for(var ____Class8I____Key in ____Class8I){if(____Class8I.hasOwnProperty(____Class8I____Key)){SettingsGear[____Class8I____Key]=____Class8I[____Class8I____Key];}}var ____SuperProtoOf____Class8I=____Class8I===null?null:____Class8I.prototype;SettingsGear.prototype=Object.create(____SuperProtoOf____Class8I);SettingsGear.prototype.constructor=SettingsGear;SettingsGear.__superConstructor__=____Class8I;

  function SettingsGear($SettingsGear_) {"use strict";
    ____Class8I.call(this,$SettingsGear_)
  }

  Object.defineProperty(SettingsGear.prototype,"click",{writable:true,configurable:true,value:function() {"use strict";

  }});

  Object.defineProperty(SettingsGear.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    return (
      React.createElement("a", {className: "SettingsGear", onClick: this.click})
    )

  }});



var ____Class8J=React.Component;for(var ____Class8J____Key in ____Class8J){if(____Class8J.hasOwnProperty(____Class8J____Key)){GithubLogin[____Class8J____Key]=____Class8J[____Class8J____Key];}}var ____SuperProtoOf____Class8J=____Class8J===null?null:____Class8J.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class8J);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class8J;

  function GithubLogin(props) {"use strict";
    ____Class8J.call(this,props)
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
      ? React.createElement("div", null,  this.props.user.username)
      : React.createElement("a", {onClick: this.login.bind(this)}, "Sign into Github")

    return (
      React.createElement("div", {className: "GithubLogin"}, 
         githubLogin 
      )
    )
  }});



var ____Class8K=React.Component;for(var ____Class8K____Key in ____Class8K){if(____Class8K.hasOwnProperty(____Class8K____Key)){QueryBar[____Class8K____Key]=____Class8K[____Class8K____Key];}}var ____SuperProtoOf____Class8K=____Class8K===null?null:____Class8K.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class8K);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class8K;

  function QueryBar(props) {"use strict";
    ____Class8K.call(this,props)
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