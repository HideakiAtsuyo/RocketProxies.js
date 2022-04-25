# RocketProxies.js

[![](https://www.codefactor.io/repository/github/HideakiAtsuyo/RocketProxies.js/badge)](https://www.codefactor.io/repository/github/HideakiAtsuyo/RocketProxies.js)<br>

## Installation

[![npm package](https://nodei.co/npm/rocketproxies.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rocketproxies.js)<br>
`npm install --save rocketproxies.js`

When you initialize the client =>

1) Premium Status(true/false) => false if you don't have a key.
2) Premium Type(1 = 1k/2 = 2k/3 = 3k) => anything if you are not premium.
3) The Authorized IP
4) Your API Key
5) Debug Mode(some useless console.log)

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

const https = RocketProxiesClient = new (require('../src/RocketProxies.js'))(false/*Premium Status*/, 1/*Premium Type*/, "127.0.0.1"/*Authorized IP*/, "KEY"/*Premium Key*/, false);
var activated = true; //set to false for first usage or make it better :)

(async function(){
    //Premium: getProxy, Activate, changeIP
    //Free: getProxy, isBlacklisted, getPools
    if(!activated){
        var keyActivated = await RocketProxiesClient.activateKey("Username");
        if(keyActivated){
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

    var randomProxy = await RocketProxiesClient.getProxy("Rotating"); //getProxy("Dedicated", 1);
    console.log(randomProxy);
})();
```

## Dedicated Ports

For Dedicated Ports you need to specify a country number

`0` => `GB`<br>
`1` => `US`<br>
`2` => `DE`<br>
`3` => `CA`