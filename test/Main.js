const https = RocketProxiesClient = new (require('../src/RocketProxies.js'))(true, 1, "127.0.0.1", "KEY", false);
var activated = true;

(async function(){
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