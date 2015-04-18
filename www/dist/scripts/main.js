var ____Class2Y=React.Component;for(var ____Class2Y____Key in ____Class2Y){if(____Class2Y.hasOwnProperty(____Class2Y____Key)){App[____Class2Y____Key]=____Class2Y[____Class2Y____Key];}}var ____SuperProtoOf____Class2Y=____Class2Y===null?null:____Class2Y.prototype;App.prototype=Object.create(____SuperProtoOf____Class2Y);App.prototype.constructor=App;App.__superConstructor__=____Class2Y;

  function App(props) {"use strict";
    ____Class2Y.call(this,props)
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




var ____Class2Z=React.Component;for(var ____Class2Z____Key in ____Class2Z){if(____Class2Z.hasOwnProperty(____Class2Z____Key)){GithubLogin[____Class2Z____Key]=____Class2Z[____Class2Z____Key];}}var ____SuperProtoOf____Class2Z=____Class2Z===null?null:____Class2Z.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class2Z);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class2Z;

  function GithubLogin(props) {"use strict";
    ____Class2Z.call(this,props)
    this.state = {
      githubOauthClientId: '5dda5e640b390bc40468',
      githubOauthState: Math.random()*100000000000000000
    }
  }

  Object.defineProperty(GithubLogin.prototype,"login",{writable:true,configurable:true,value:function() {"use strict";

    const scope = ['user:email', 'read:org'].join(',')

    window.location.href = ("https://github.com/login/oauth/authorize?client_id=" +  this.state.githubOauthClientId + "&state=" +  this.state.githubOauthState + "&scope=" +  scope)

  }});

  Object.defineProperty(GithubLogin.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    var code = null,
        state = null

    try {
      code = window.location.search.match(/code=([^&]+)/)[1]
      state = window.location.search.match(/state=([^&]+)/)[1]
    } catch (e){}

    console.log(code, state, this.state.githubOauthState)

    if (code && state && !this.state.token) {

      // if (state != this.state.githubOauthState) {
      //   throw new Error ('states don\'t match, possible XSF attack. aborting!')
      // }

      $
      .post(("https://github.com/login/oauth/access_token/client_id=" +  this.state.githubOauthClientId + "&client_secret=af9b23df713de6a5cfc819a92e0ae6f799a800b3&code=" +  code))
      .then(function(data)  {
       console.log(data.token)
      })

    }

    var githubLogin = code
      ? React.createElement("div", null, "logged in!")
      : React.createElement("a", {href: "#", onClick: this.login.bind(this)}, "Sign into Github")

    return (
      githubLogin
    )
  }});



var ____Class30=React.Component;for(var ____Class30____Key in ____Class30){if(____Class30.hasOwnProperty(____Class30____Key)){QueryBar[____Class30____Key]=____Class30[____Class30____Key];}}var ____SuperProtoOf____Class30=____Class30===null?null:____Class30.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class30);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class30;

  function QueryBar(props) {"use strict";
    ____Class30.call(this,props)
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