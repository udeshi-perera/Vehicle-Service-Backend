import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()

export class VehicleService{


//     constructor(){
//       // socketcuster-server
// //this is a simple example socketcluster
// const http = require("http");
// const socketClusterServer = require("socketcluster-server");

// let options = {
//   // ...
// };

// let httpServer = http.createServer();
// let agServer = socketClusterServer.attach(httpServer, options);
// // --- in server.js ---

// // SocketCluster/WebSocket connection handling loop.
// (async () => {
//   for await (let { socket } of agServer.listener("connection")) {
//     (async () => {
//       // Set up a loop to handle remote transmitted events.
//       //give any channel name as u like
//       for await (let data of socket.receiver("channelName")) {
//         //view data from
//         console.log(data);

//         //send notifications to client repeatedly
//         try {
//           // Publish data; wait for an acknowledgement from the back end broker (if it exists).
//           setInterval(() => {
//             agServer.exchange.transmitPublish(
//               "channelName",
//               "This is some data sended from server " + Math.random()
//             );
//           }, 10000);
//         } catch (error) {
//           // ... Handle potential error if broker does not acknowledge before timeout.
//         }
//       }
//     })();
//   }
// })();

// // port 8000
// //httpServer.listen(8000);

//     }
    
    
//     onModuleInit() {
  
        
//     }
    // socketcuster-server
//this is a simple example socketcluster
 http = require("http");
 socketClusterServer = require("socketcluster-server");

 options = {
  // ...
};

 httpServer = this.http.createServer();
 agServer = this.socketClusterServer.attach(this.httpServer, this.options);
   
 
 
 constructor(){
  
// --- in server.js ---

// SocketCluster/WebSocket connection handling loop.
(async () => {
  for await (let { socket } of this.agServer.listener("connection")) {
    (async () => {
      // Set up a loop to handle remote transmitted events.
      //give any channel name as u like
      for await (let data of socket.receiver("channelName")) {
        //view data from
        console.log(data+"From client");

        //send notifications to client repeatedly
        try {
          // Publish data; wait for an acknowledgement from the back end broker (if it exists).
          // setInterval(() => {
            this.agServer.exchange.transmitPublish(
              "channelName",
              "This is some data sended from server " + Math.random()
            );
          // }, 70000000);
        } catch (error) {
          // ... Handle potential error if broker does not acknowledge before timeout.
        }
      }
    })();
  }
})();

 

// port 8000
this.httpServer.listen(8000);

    }
    async  sendMessage() {
      console.log("messages Sended to client");
     await this.agServer.exchange.transmitPublish(
        "channelName",
        "This is some data sended from server " + Math.random()
      );
    }
    
    
}
