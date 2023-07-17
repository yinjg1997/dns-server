const { createSocket } = require("dgram");
const dnsPacket = require("dns-packet");

const server = createSocket("udp4");
server.bind(53);

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on("message", (msg, rinfo) => {
  const query = dnsPacket.decode(msg);
  const host = query.questions[0].name;
  if (/.*nip2\.zeze\.work$/.test(host)) {
    const ipAddress = extractIPAddress(host);
    console.log(`${host} maps to ${ipAddress}`);
    if (ipAddress) {
      resolve(query, ipAddress, rinfo);
    }
  } 
});

function extractIPAddress(host) {
  host = host.replace(".nip2.zeze.work", "").replace(/-/g, ".");
  const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;

  const ipAddress = host.match(ipRegex);
  return ipAddress ? ipAddress[0] : null;
}

function resolve(query, ipAddress, rinfo) {
  const response = dnsPacket.encode({
    id: query.id,
    type: "response",
    questions: query.questions,
    answers: [
      {
        name: query.questions[0].name,
        type: "A",
        class: "IN",
        ttl: 300,
        data: ipAddress // 指定解析出的 ip 地址
      }
    ]
  });

  server.send(response, 0, response.length, rinfo.port, rinfo.address, err => {
    if (err) throw err;
    console.log(`Sent response to ${rinfo.address}:${rinfo.port}`);
  });
}
