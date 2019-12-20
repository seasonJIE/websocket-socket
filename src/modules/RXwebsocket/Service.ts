import {Observable, ReplaySubject} from 'rxjs';

export class ChatService {
  public subject: any;
  private ws: any;

  constructor() {
    this.subject = new ReplaySubject(1, 6000 /* windowTime */);
  }


  sendMessage(message) {
    this.ws.send(message)
  }

  getMessages() {
    return Observable.create(observer => {
      this.ws = new WebSocket("ws://localhost:8001/");
      this.ws.onopen = function () {
        observer.next({data:"连接",type: "enter"});
      };

      this.ws.onmessage = function (data) {
        observer.next({data:JSON.parse(data.data), type: "text"});
      };

      this.ws.onclose = function (data) {
        observer.next({data:JSON.parse(data.data), type: "left"});
      };
      return () => {
        this.ws.close()
      }
    });
  }
}