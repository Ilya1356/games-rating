const http = require('http');
const path = require('path');

const gameRouteController = require("./controllers/game");
const mainRouteController = require("./controllers/main");
const voteRouteController = require("./controllers/vote");
const defaultRouteController = require("./controllers/default");
const staticFile = require("./appModules/http-utils/static-file");
const mimeTypes = require("./appModules/http-utils/mime-types");

const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case "/game":
            gameRouteController(res);
            break;
        case "/":
            res.statusCode = 200;
            staticFile(res, "/index.html", ".html");
            mainRouteController(res, "/index.html", ".html");
            break;
        case "/vote":
            voteRouteController(req, res);
            break;
        default:
            defaultRouteController(res, url);
            const extname = String(path.extname(url)).toLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, url, extname);
            } else {
                res.statusCode = 404;
                res.end("Not Found");
            }

    }
});

server.listen(3005);