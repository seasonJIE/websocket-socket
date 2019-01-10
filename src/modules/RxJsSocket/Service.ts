import io from "socket.io-client"
import {Observable} from 'rxjs';
export class ChatService {
  private socket: io;

  sendMessage(message) {
    this.socket.emit('message', message);
  }

  getMessages() {
    return Observable.create(observer => {
      this.socket = io('ws://localhost:8001/');
      this.socket.on('message', (data) => {
        observer.next({data,type:"message"});
      });
      this.socket.on('enter', (data) => {
        observer.next({data,type:"enter"});
      });
      this.socket.on('leave', (data) => {
        observer.next({data,type:"leave"});
      });
      this.socket.on('enterSelf', (data) => {
        observer.next({data,type:"enterSelf"});
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}