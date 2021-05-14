 import { Logger } from '@nestjs/common';
import { OnGatewayConnection,
         OnGatewayDisconnect, 
         OnGatewayInit, 
         SubscribeMessage, 
         WebSocketGateway, 
         WsResponse } 
  from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  private logger:Logger = new Logger("App Gateway");
  afterInit(server: Server) {
    this.logger.log("Initialized....");
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client Disconnected ' +`${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client Connected '+`${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    return {event:'message',data:'Hello World'};
  }
}
