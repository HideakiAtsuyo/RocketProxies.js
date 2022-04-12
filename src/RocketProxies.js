//Shitty code go brrrrrrrrr

const https = require("https"),
    http = require("http"),
    APIInfos = [
        "www.proxies.gay",
        80,
        /*Ports*/
        [
            /*General*/
            [1339],

            /*Sticky*/
            [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009],

            /*Dedicated*/
            [ /*GB*/ 1340, /*US*/ 1341, /*DE*/ 1342, /*CA*/ 1343],

            /*LoadBalancer*/
            [2000, 2001, 2002, 2003, 2004, 2005]
        ]
    ];

module.exports = class RocketProxies {
    /**
     * @constructor
     * @param {boolean} Premium Are you Premium ?
     * @param {string} IP The user IP
     * @param {string} Key The API Key
     * @param {boolean} Debug Want to see some useless stuff ?
     */
    constructor(Premium = null, IP = null, Key = null, Debug = false) {
        if (Premium == null) throw new Error("[RocketProxies] Specify the User Account Premium Status !");
        this.Premium = Premium;
        if (Premium) {
            if (IP == null) throw new Error("[RocketProxies] Specify the User Account IP !");
            this.IP = IP;
            if (Key == null) throw new Error("[RocketProxies] Specify the User Account API Key !");
            this.Key = Key;
        }
        this.Debug = Debug;
    }

    /**
     * Activate the API Key on a user username
     * @param {string} username The user username that will get the key
     * @returns {Promise<string>}
     */
    activateKey(username = null) {
        if (username == null) throw new Error("[RocketProxies] You need to specify a username.");
        return new Promise(async (resolve, reject) => {
            var req = http.request({
                host: APIInfos[0],
                port: APIInfos[1],
                path: `/activate?ip=${this.IP}&username=${username}&api_key=${this.Key}`,
                method: "POST"
            }, function(res) {
                if (this.Debug) console.log("[RocketProxies] Activation Request Sent !");
                return resolve(res.statusCode == 200 ? "OK" : "Error or Already Registered !")
            });
            req.write("[RocketProxies] HelloWorld");
            req.end();
        });
    }

    /**
     * Change the authorized IP
     * @param {string} newIP The new IP
     * @returns {Promise<string>}
     */
    changeIP(newIP = null) {
        if (!newIP == null) throw new Error("[RocketProxies] You need to specify a the new IP.");
        return new Promise(async (resolve, reject) => {
            if (!this.Premium) return resolve("You Need To Be Premium.");
            var req = http.request({
                host: APIInfos[0],
                port: APIInfos[1],
                path: `/change_ip?ip=${newIP}&api_key=${this.Key}`,
                method: "POST"
            }, res => {
                if (this.Debug) console.log("[RocketProxies] Change IP Request Sent !");
                return resolve(res.statusCode == 200 ? "OK" : "Error or Already Registered !")
                //return resolve(res);
            });
            req.write("[RocketProxies] HelloWorld");
            req.end();
        });
    }

    /**
     * Return a proxy
     * @param {string} type Proxy Type
     * @param {number} country Proxy Type
     * @returns {Promise<string>}
     */
    getProxy(type, country = 0) { //RIP LMAO
        if (!type) throw new Error("Specify a Type: General, Sticky, Dedicated, LoadBalancer.");
        var randomPort = 0;
        switch(type){
            case "General":
                type = 0;
                break;
            case "Sticky":
                type = 1;
                break;
            case "Dedicated":
                if (country < 0) throw new Error("Specify a Country: 0 = GB, 1 = US, 2 = DE, 3 = CA.");
                type = 2;        
                break;
            case "LoadBalancer":
                type = 3;
                break;
        }
        if (type != 2)
            randomPort = APIInfos[2][type][Math.floor(Math.random() * APIInfos[2][type].length)];
        else
            randomPort = APIInfos[2][type][country];

        return new Promise(async (resolve, reject) => {
            http.request({
                host: 'proxies.gay',
                port: !this.Premium ? 6968 : randomPort,
                method: 'CONNECT',
                path: 'api.ipify.org:443',
            }).on('connect', function(res, socket, head) {
                var req = https.get({
                    host: 'api.ipify.org',
                    socket: socket,
                    agent: false
                }, function(res) {
                    res.setEncoding('utf8');
                    res.on('data', (IP) => {
                        if (this.Debug) console.log(`[RocketProxies] Got a Proxy: ${IP} !`);
                        return resolve(IP);
                    });
                });
            }).end();
        });
    }
}