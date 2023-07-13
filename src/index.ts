const dgram = require("dgram");

// 创建 UDP 服务
const server = dgram.createSocket("udp4");

// function parseHost(msg) {
//   let num = msg.readUInt8(0);
//   let offset = 1;
//   let host = "";
//   while (num !== 0) {
//     host += msg.subarray(offset, offset + num).toString();
//     offset += num;
//     num = msg.readUInt8(offset);
//     offset += 1;

//     if (num !== 0) {
//       host += ".";
//     }
//   }
//   return host;
// }

// function copyBuffer(src, offset, dst) {
//   for (let i = 0; i < src.length; ++i) {
//     dst.writeUInt8(src.readUInt8(i), offset + i);
//   }
// }

// function resolve(msg, rinfo) {
//   const queryInfo = msg.subarray(12);
//   const response = Buffer.alloc(28 + queryInfo.length);
//   let offset = 0;
//   // Transaction ID
//   const id = msg.subarray(0, 2);
//   copyBuffer(id, 0, response);
//   offset += id.length;
//   // Flags
//   response.writeUInt16BE(0x8180, offset);
//   offset += 2;
//   // Questions
//   response.writeUInt16BE(1, offset);
//   offset += 2;
//   // Answer RRs
//   response.writeUInt16BE(1, offset);
//   offset += 2;
//   // Authority RRs & Additional RRs
//   response.writeUInt32BE(0, offset);
//   offset += 4;
//   copyBuffer(queryInfo, offset, response);
//   offset += queryInfo.length;
//   // offset to domain name
//   response.writeUInt16BE(0xc00c, offset);
//   offset += 2;
//   const typeAndClass = msg.subarray(msg.length - 4);
//   copyBuffer(typeAndClass, offset, response);
//   offset += typeAndClass.length;
//   // TTL, in seconds
//   response.writeUInt32BE(600, offset);
//   offset += 4;
//   // Length of IP
//   response.writeUInt16BE(4, offset);
//   offset += 2;
//   "11.22.33.44".split(".").forEach((value) => {
//     response.writeUInt8(parseInt(value), offset);
//     offset += 1;
//   });
//   server.send(response, rinfo.port, rinfo.address, (err) => {
//     if (err) {
//       console.log(err);
//       server.close();
//     }
//   });
// }

// function forward(msg, rinfo) {
//   const client = dgram.createSocket("udp4");
//   client.on("error", (err) => {
//     console.log(`client error:\n${err.stack}`);
//     client.close();
//   });
//   client.on("message", (fbMsg, fbRinfo) => {
//     server.send(fbMsg, rinfo.port, rinfo.address, (err) => {
//       err && console.log(err);
//     });
//     client.close();
//   });
//   client.send(msg, 53, "192.168.199.1", (err) => {
//     if (err) {
//       console.log(err);
//       client.close();
//     }
//   });
// }

/**
 * 获取
 */
server.on("message", (msg, rinfo) => {
  console.log(typeof msg);
  
  console.log(ms);
  
  // const host = parseHost(msg.subarray(12));
  // console.log(`query: ${host}`);

  // if (/guangguangguang/.test(host)) {
  //   resolve(msg, rinfo);
  // } else {
  //   forward(msg, rinfo);
  // }
});

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(53);
