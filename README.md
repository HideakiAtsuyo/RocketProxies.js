# RocketProxies.js

[![](https://www.codefactor.io/repository/github/HideakiAtsuyo/RocketProxies.js/badge)](https://www.codefactor.io/repository/github/HideakiAtsuyo/RocketProxies.js)<br>

## Installation

`npm install --save rocketproxies.js`


## Example Usage Only Because I Hate ReadMe

When you initialize the client =>

1) Premium Status(true/false) => false if you don't have a key.
2) The Authorized IP
3) Your API Key
4) Debug Mode(some useless console.log)

## Premium & Free

Premium & Free:
- getProxy

Premium:
- activateKey
- changeIP

Free:
- isBlacklisted
- getPools

## Example Code

```js
const https = RocketProxiesClient = new (require('RocketProxies.js'))(false, "127.0.0.1", "KEY", false);
var activated = false;

(async function(){
    //Premium: getProxy, Activate, changeIP
    //Free: getProxy, isBlacklisted, getPools
    if(!activated){
        var keyActivated = await RocketProxiesClient.activateKey("Username");
        if(keyActivated == true){
            console.log(keyActivated);
            activated = true;
        } else {
            console.log("Already Registered or Invalid !");
        }
    }

    /*var changeIP = await RocketProxiesClient.changeIP("127.0.0.1");
    console.log(changeIP)*/

    /*var isBlacklisted = await RocketProxiesClient.isBlacklisted("127.0.0.1");
    console.log(isBlacklisted);*/

    /*var pools = await RocketProxiesClient.getPools();
    console.log(pools);*/
    
    /*var IPStats = await RocketProxiesClient.getStats("127.0.0.1");
    console.log(IPStats);*/

    var randomProxy = await RocketProxiesClient.getProxy("General"); //getProxy("Dedicated", 1);
    console.log(randomProxy);
})();
```

## Dedicated Ports

For Dedicated Ports you need to specify a country number

`0` => `GB`<br>
`1` => `US`<br>
`2` => `DE`<br>
`3` => `CA`
