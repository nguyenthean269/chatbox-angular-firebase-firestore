import { Component, ViewChildren } from '@angular/core';
import { AppData } from './AppData';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'my-app';
  data = new AppData('');

  private username = prompt("Please enter your name", "Harry Potter");

  items: Observable<any[]>;
  constructor(private db: AngularFirestore) {
    this.items = db.collection('chat', ref => ref.orderBy('time')).valueChanges();
  }
  public clearMessage(data) {
  	//this.message_element = document.querySelector(".display-message");
  	//this.message_element.scrollTo(0,this.message_element.scrollHeight+100);
  	data.message = '';
  }
  public sendMessage(event, data) {
  	var timenow = Date.now() / 1000;
	const chatCollection = this.db.collection<Item>('chat');
	chatCollection.add({time: timenow, name: this.username, message: data.message });
	this.clearMessage(data);
  }

  public keyDownFunction(event, data) {
	if(event.keyCode == 13) {
  		this.sendMessage(event, data);
  		this.clearMessage(data);
	}
  }

  @ViewChildren('allTheseThings') things: QueryList<any>;
  /* Define the callback in ngAfterViewInit hook */
  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }
  ngForRendred() {
  	/*
  	Scroll to bottom (to view newest message) when:
  	- Page load done
  	- Sent new message
  	- Received new message 
  	*/
    this.message_element = document.querySelector(".display-message");
    this.message_element.scrollTo(0,this.message_element.scrollHeight);
  }
}
