var ____Class34=React.Component;for(var ____Class34____Key in ____Class34){if(____Class34.hasOwnProperty(____Class34____Key)){App[____Class34____Key]=____Class34[____Class34____Key];}}var ____SuperProtoOf____Class34=____Class34===null?null:____Class34.prototype;App.prototype=Object.create(____SuperProtoOf____Class34);App.prototype.constructor=App;App.__superConstructor__=____Class34;

  function App(props) {"use strict";
    ____Class34.call(this,props)
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




var ____Class35=React.Component;for(var ____Class35____Key in ____Class35){if(____Class35.hasOwnProperty(____Class35____Key)){GithubLogin[____Class35____Key]=____Class35[____Class35____Key];}}var ____SuperProtoOf____Class35=____Class35===null?null:____Class35.prototype;GithubLogin.prototype=Object.create(____SuperProtoOf____Class35);GithubLogin.prototype.constructor=GithubLogin;GithubLogin.__superConstructor__=____Class35;

  function GithubLogin(props) {"use strict";
    ____Class35.call(this,props)
    this.state = {
      githubOauthClientId: '5dda5e640b390bc40468',
      githubOauthState: Math.random()*100000000000000000
    }
  }

  Object.defineProperty(GithubLogin.prototype,"login",{writable:true,configurable:true,value:function() {"use strict";

    $.get('/login').then(console.log)

    // const scope = ['user:email', 'read:org'].join(',')

    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${ this.state.githubOauthClientId }&state=${ this.state.githubOauthState }&scope=${ scope }`

  }});

  Object.defineProperty(GithubLogin.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";

    var code = null,
        state = null

    try {
      code = window.location.search.match(/code=([^&]+)/)[1]
      state = window.location.search.match(/state=([^&]+)/)[1]
    } catch (e){}

    console.log(code, state, this.state.githubOauthState)

    // if (code && state && !this.state.token) {

    //   // if (state != this.state.githubOauthState) {
    //   //   throw new Error ('states don\'t match, possible XSF attack. aborting!')
    //   // }

    //   $
    //   .post(`https://github.com/login/oauth/access_token/client_id=${ this.state.githubOauthClientId }&client_secret=af9b23df713de6a5cfc819a92e0ae6f799a800b3&code=${ code }`)
    //   .then((data) => {
    //    console.log(data.token)
    //   })

    // }

    var githubLogin = code
      ? React.createElement("div", null, "logged in!")
      : React.createElement("a", {href: "#", onClick: this.login.bind(this)}, "Sign into Github")

    return (
      githubLogin
    )
  }});



var ____Class36=React.Component;for(var ____Class36____Key in ____Class36){if(____Class36.hasOwnProperty(____Class36____Key)){QueryBar[____Class36____Key]=____Class36[____Class36____Key];}}var ____SuperProtoOf____Class36=____Class36===null?null:____Class36.prototype;QueryBar.prototype=Object.create(____SuperProtoOf____Class36);QueryBar.prototype.constructor=QueryBar;QueryBar.__superConstructor__=____Class36;

  function QueryBar(props) {"use strict";
    ____Class36.call(this,props)
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