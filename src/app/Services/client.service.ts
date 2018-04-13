import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Client } from './../models/clients';

@Injectable()
export class ClientService 
{
  /*clients: AngularFireList<any[]>;
  clientObj: AngularFireObject<any>;*/

  clients: Client[];

  
  constructor(public ngFireDB: AngularFireDatabase) 
  { 
    ngFireDB.list('/clients').valueChanges().subscribe( clients =>{
      this.clients = clients;
      console.log(this.clients)
    })
  }

  getClients()
  {
    return this.ngFireDB.list('/clients').valueChanges();
  }



}
