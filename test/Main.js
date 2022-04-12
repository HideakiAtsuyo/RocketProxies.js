const https = RocketProxiesClient = new (require('../src/RocketProxies.js'))(false, "127.0.0.1", "KEY", false);
var activated = false;

(async function(){
    
    if(!activated){
        var keyActivated = await RocketProxiesClient.activateKey("Username");
        if(keyActivated == "OK"){
            console.log(keyActivated);
            activated = true;
        } else
            process.exit(-1);
    }

    /*var changeIP = await RocketProxiesClient.changeIP("127.0.0.1");
    console.log(changeIP)*/

    var randomProxy = await RocketProxiesClient.getProxy("General"); //getProxy("Dedicated", 1);
    console.log(randomProxy);
})();