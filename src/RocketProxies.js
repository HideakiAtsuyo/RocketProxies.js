//Shitty code go brrrrrrrrr
const https = require("https"),
    http = require("http");

module.exports = class RocketProxies {
    /**
     * @constructor
     * @param {boolean} Premium Are you Premium ?
     * @param {string} IP The user IP
     * @param {string} Key The API Key
     * @param {boolean} Debug Want to see some useless stuff ?
     */
    constructor(Premium = null, PremiumType = null, IP = null, Key = null, Debug = false) {
        if (Premium == null) throw new Error("[RocketProxies] Specify the User Account Premium Status !");
        this.Premium = Premium;
        if (Premium) {
            if (PremiumType == null) throw new Error("[RocketProxies] Specify the User Account Premium Type(1 = 1k/2 = 2k/3 = 3k) !");
            this.PremiumType = PremiumType;
            if (IP == null) throw new Error("[RocketProxies] Specify the User Account IP !");
            this.IP = IP;
            if (Key == null) throw new Error("[RocketProxies] Specify the User Account API Key !");
            this.Key = Key;
        }
        this.Debug = Debug;
        this.APIInfos = [
            "www.proxies.gay", //API "Domain" (subdomain)
            80, //API Port
            /*Ports*/
            [
                /*Sticky*/
                [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],

                /*Dedicated*/
                [ /*GB*/ 1340, /*US*/ 1341, /*DE*/ 1342, /*CA*/ 1343],

                /*Rotating*/
                [[3000, 3001, 3002], [4000, 4001, 4002], [5000, 5001, 5002]]
            ]
        ];
    }

    /**
     * Activate the API Key on a user username
     * @param {string} username The user username that will get the key
     * @returns {Promise<boolean>}
     */
    activateKey(username = null) {
        if (username == null) throw new Error("[RocketProxies] You need to specify a username.");
        return new Promise(async (resolve, reject) => {
            var req = http.request({
                host: this.APIInfos[0],
                port: this.APIInfos[1],
                path: `/activate?ip=${this.IP}&username=${username}&api_key=${this.Key}`,
                method: "GET"
            }, res => {
                if (this.Debug) console.log("[RocketProxies] Activation Request Sent !");
                return resolve(res.statusCode == 200 ? true : false);
            });
            req.write("[RocketProxies] HelloWorld");
            req.end();
        });
    }

    /**
     * Change the authorized IP
     * @param {string} newIP The new IP
     * @returns {Promise<boolean>}
     */
    changeIP(newIP = null) {
        if (!newIP == null) throw new Error("[RocketProxies] You need to specify a the new IP.");
        return new Promise(async (resolve, reject) => {
            if (!this.Premium) return resolve("You Need To Be Premium.");
            var req = http.request({
                host: this.APIInfos[0],
                port: this.APIInfos[1],
                path: `/change_ip?ip=${newIP}&api_key=${this.Key}`,
                method: "GET"
            }, res => {
                if (this.Debug) console.log("[RocketProxies] Change IP Request Sent !");
                return resolve(res.statusCode == 200 ? true : false);
            });
            req.write("[RocketProxies] HelloWorld");
            req.end();
        });
    }

    /**
     * Return a boolean to know if an IP is blacklisted or no.
     * @param {string} IP IP
     * @returns {Promise<boolean>}
     */
    isBlacklisted(IP) { //RIP LMAO
        if (!IP) throw new Error("Specify a IP.");

        return new Promise(async (resolve, reject) => {
            var req = http.request({
                host: this.APIInfos[0],
                port: this.APIInfos[1],
                path: `/is_blacklisted?ip=${IP}`,
                method: "GET"
            }, res => {
                if (this.Debug) console.log("[RocketProxies] IP Blacklist Verification Request Sent !");
                return resolve(res.statusCode == 200 ? true : false);
            });
            req.write("[RocketProxies] HelloWorld");
            req.end();
        });
    }

    /**
     * Return pools list.
     * @returns {Promise<JSON>}
     */
    getPools() {
        return new Promise(async (resolve, reject) => {
            var req = http.request({
                host: this.APIInfos[0],
                port: this.APIInfos[1],
                path: `/get_pool`,
                method: "GET"
            }, res => {
                if (this.Debug) console.log("[RocketProxies] Pools List Request Sent !");
                res.on("data", body => {
                    return resolve(res.statusCode == 200 ? body.toString() : "{}");
                })
            });
            req.write("[RocketProxies] HelloWorld");
            req.end();
        });
    }

    /**
     * Return stats of a client IP.
     * @param {string} IP IP
     * @returns {Promise<JSON>}
     */
    getStats(IP) {
        if (!IP) throw new Error("Specify a IP.");
        return new Promise(async (resolve, reject) => {
            var req = http.request({
                host: this.APIInfos[0],
                port: this.APIInfos[1],
                path: `/get_stats?IP=${IP}`,
                method: "GET"
            }, res => {
                if (this.Debug) console.log("[RocketProxies] IP Stats Request Sent !");
                res.on("data", body => {
                    return resolve(res.statusCode == 200 ? body.toString() : "{}");
                })
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
        switch (type) {
            case "Sticky":
                type = 0;
                randomPort = this.APIInfos[2][type][Math.floor(Math.random() * this.APIInfos[2][type].length)];
                break;
            case "Dedicated":
                if (country < 0) throw new Error("Specify a Country: 0 = GB, 1 = US, 2 = DE, 3 = CA.");
                type = 1;
                randomPort = this.APIInfos[2][type][country];
                break;
            case "Rotating":
                type = 2;
                var index = this.PremiumType-1;
                randomPort = this.APIInfos[2][type][index][Math.floor(Math.random() * this.APIInfos[2][type][index].length)];
                break;
        }

        return new Promise(async (resolve, reject) => {
            http.request({
                host: '188.34.138.149', //188.34.138.149
                port: !this.Premium ? 6968 : randomPort,
                method: 'CONNECT',
                path: 'api.ipify.org:443',
            }).on('connect', function(res, socket, head) {
                var req = https.get({
                    host: 'api.ipify.org',
                    socket: socket,
                    agent: false
                }, res => {
                    res.on('data', (IP) => {
                        if (this.Debug) console.log(`[RocketProxies] Got a Proxy: ${IP} !`);
                        return resolve(IP.toString());
                    });
                });
            }).end();
        });
    }
}