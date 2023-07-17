import { RemoteInfo, createSocket } from "node:dgram";

const client = createSocket("udp4");

// const serverIP = "49.232.246.246"; // 服务器的IP地址
const serverIP = "127.0.0.1"; // 服务器的IP地址
const serverPort = 53; // 服务器的端口号

// 构建DNS请求数据包
const message = Buffer.alloc(512); // 初始化 512 字节的缓冲区
const transactionID = Math.floor(Math.random() * 65536); // 随机生成一个事务ID
message.writeUInt16BE(transactionID, 0); // Transaction ID
message.writeUInt16BE(0x0100, 2); // Flags
message.writeUInt16BE(0x0001, 4); // Questions count

// 添加查询部分
// const queryName = "www.baidu.com";
// const queryName = "customer3-app-7f000101.nip2.zeze.work";
const queryName = "127.0.0.22.nip2.zeze.work";
// const queryName = "www.nip2.zeze.abc";
const queryNameParts = queryName.split(".");
let offset = 12;
for (const part of queryNameParts) {
  message.writeUInt8(part.length, offset++); // 部分长度
  message.write(part, offset, part.length, "ascii"); // 部分内容
  offset += part.length;
}
message.writeUInt8(0, offset++); // 结束标记
message.writeUInt16BE(0x0001, offset); // Query type (A record)
offset += 2;
message.writeUInt16BE(0x0001, offset); // Query class (IN)

client.send(message, serverPort, serverIP, err => {
  if (err) {
    console.log("An error occurred while sending the message.");
  }
  client.close();
});
