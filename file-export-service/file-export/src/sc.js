//socketcluster-client (angular client)
const socketClusterClient = require("socketcluster-client");

let socket = socketClusterClient.create({
  hostname: "localhost",
  port: 8000,
});

//subscribe to the server channel and listen for messages(notifications)
(async () => {
  let channel = socket.subscribe("channelName");
  
  //send data to the  server
  socket.transmit("channelName", "Hi Im a new client ");

  for await (let data of channel) {
    // ... Handle channel data.
    console.log(data + " data received from server");
  }
})();