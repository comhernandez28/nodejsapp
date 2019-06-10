const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form>"
    );
    res.write("<h1>Home Page</h1>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1].replace(/\+/g, " ");
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      console.log(parsedBody);
    });
  }

  res.setHeader("Content-Type", " text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>Test1</h1>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

/*
multiple exports
module.exports = {
  handler: requestHandler,
  someText: "Some text"
};
*/

//Same way to export but with a specific name
//module.export.handler = requestHandler;
