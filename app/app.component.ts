import { Component } from '@angular/core';
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


  items: Observable<any[]>;
  constructor(private db: AngularFirestore) {
    this.items = db.collection('chat', ref => ref.orderBy('time')).valueChanges();
  }
  public clearMessage(data) {
  	data.message = '';
  }
  public open(event, data) {
  	var timenow = Date.now() / 1000;
	const chatCollection = this.db.collection<Item>('chat');
	chatCollection.add({time: timenow, name: 'item', message: data.message });
	this.clearMessage(data);
  }

  public keyDownFunction(event, data) {
	if(event.keyCode == 13) {
  		this.open(event, data);
  		this.clearMessage(data);
	}
  }

}
