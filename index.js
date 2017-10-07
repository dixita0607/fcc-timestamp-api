const http = require('http');

const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

const unixToNatural = unix => {
  const date = new Date(unix * 1000);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const query = decodeURI(req.url).slice(1);
  const unix = parseInt(query);
  if (!isNaN(unix)) {
    res.end(JSON.stringify({unix: unix, natural: unixToNatural(unix)}));
  } else {
    const unix = new Date(query).getTime() / 1000;
    if (!isNaN(unix)) 
      res.end(JSON.stringify({unix, natural: query}))
    else 
      res.end(JSON.stringify({unix: null, natural: null}))
  }
});

server.listen(8080);
