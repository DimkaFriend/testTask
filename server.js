
const http = require("http");

const url = require("url");

const path = require("path");

const fs = require("fs");
const port = process.argv[2] || 8888;

const server = http.createServer((req, res) => {
	
    const uri = url.parse(req.url).pathname;

    let filename = path.join(process.cwd(), uri);

    fs.stat(filename, (err, stats) => {
        if (err) {
			
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.write("404 Not Found");
            res.end();
            return;
        }

        if (stats.isDirectory()) {
            filename += "/index.html";
        }

        fs.readFile(filename, "binary", (err, file) => {
            if (err) {
				
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.write(err + "\n");
                res.end();
                return;
            }

            res.writeHead(200);
            res.write(file, "binary");
            res.end();
        });
    });
});

server.listen(parseInt(port, 10));

console.log("Static file server running at \n => http://localhost:" + port + "/\nCTRL + C to shutdown");