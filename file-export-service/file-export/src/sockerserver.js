// socketcuster-server
//this is a simple example socketcluster
const http = require("http");
const socketClusterServer = require("socketcluster-server");

let options = {
  // ...
};

let httpServer = http.createServer();
let agServer = socketClusterServer.attach(httpServer, options);
// --- in server.js ---

// SocketCluster/WebSocket connection handling loop.
(async () => {
  for await (let { socket } of agServer.listener("connection")) {
    (async () => {

      // Set up a loop to handle remote transmitted events.
      //give any channel name as u like
      for await (let data of socket.receiver("channelName")) {

        //view data from
        console.log(data);

        //send data to client
        try {
          // Publish data; wait for an acknowledgement from the back end broker (if it exists).
          agServer.exchange.transmitPublish(
            "channelName",
            "This is some data sended from server " + Math.random()
          );
        } catch (error) {
          // ... Handle potential error if broker does not acknowledge before timeout.
        }

      }
    })();
  }
})();


// port 8000
httpServer.listen(8000);
