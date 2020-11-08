import { Server, createServer } from "http";
import express, { Express } from "express";
import bodyParser from "body-parser";

export async function startDummyServer(): Promise<{
    server: Server;
    port: number;
}> {
    let app: Express = express();
    let server: Server = createServer(app);

    let port = 3000;
    let emptyPortFound = false;
    while (!emptyPortFound && port < 3050) {
        try {
            await bindPort(server, port);
            emptyPortFound = true;
        } catch (error) {
            port++;
        }
    }

    if (!emptyPortFound) {
        throw "Could not bind to any port from 3000 to 3050; Exiting";
    }

    app.use(bodyParser.json());

    app.all("/", (req, res) => {
        res.send({
            method: req.method,
            query: req.query,
            body: req.body,
            params: req.params,
        });
    });

    app.all("/:id", (req, res) => {
        res.send({
            method: req.method,
            query: req.query,
            body: req.body,
            params: req.params,
        });
    });

    return {
        server,
        port,
    };
}

function bindPort(server: Server, port: number) {
    return new Promise((resolve, reject) => {
        server.on("error", reject).listen(port, resolve);
    });
}
