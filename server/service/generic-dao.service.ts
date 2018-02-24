import { MongoClient } from 'mongodb';

import {ObjectID} from "bson";

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {Subject} from "rxjs/Subject";

import * as _ from 'lodash';

// export const dbUrl = 'mongodb://localhost:27017';

export const dbUrl = 'mongodb://cabindb:27017';

export const dbName = 'cabin';

export class GenericDao {

  save(collection: string, object: any) : Observable<boolean> {

    let response = new Subject<boolean>();

    this.connect().subscribe(client => {

       const _update = { $set: _.omit(object,['_id']) };

       const db = client.db(dbName);
       db.collection(collection)
         .updateOne({ _id: ObjectID(object._id) }, _update, (err, res) => {

            if(err) {
               response.error(err);
               response.complete();
               return;
            }

             response.next(true);
             response.complete();

         });

    }, err => {
        response.error(err);
        response.complete();
    });

    return response;

  }

  getSingleton(collection: string) : Observable<any> {

    const response = new ReplaySubject<any>(1);

    this.connect().subscribe(client => {

       const db = client.db(dbName);
       db.collection(collection)
         .find({})
         .limit(1)
         .toArray((err, docs) => {

              if(checkMongoError(err, client, response) == true)  return;

              client.close();

              let value = docs.length > 0 ? docs[0] : null;
              response.next(value);
              response.complete();
         });

    });


    return response;
  }

  connect() : Observable<any> {

    let response = new Subject<any>();

    MongoClient.connect(dbUrl, (err, client) => {

      if(err) {
        response.error(err);
        response.complete();
        client.close();
        return;
      }

      response.next(client);
      response.complete();

    });

    return response;
  }


  checkError(err, client, response: Subject<any>) : boolean {

      if(err) {
        client.close();
        response.error(err);
        response.complete();
        return true;
      }

      return false;
  }


  get(collection: string, id: string) : Observable<any> {

    const response = new ReplaySubject<any>(1);

    MongoClient.connect(dbUrl, (err, client) => {

      const db = client.db(dbName);

      if (err) {
        client.close();
        response.error(err);
        response.complete();
        return;
      }

      db.collection(collection)
        .find({_id: new ObjectID(id)}).limit(1).next((err, doc) => {
            if (err) {
              client.close();
              response.error(err);
              response.complete();
              return;
            }

            client.close();
            response.next(doc)
            response.complete();

          });
      });

    return response;
  }

  insertOne(collection: string, value: any) : Observable<boolean> {

    const response = new ReplaySubject<boolean>(1);

    MongoClient.connect(dbUrl, (err, client) => {

      const db = client.db(dbName);

      if (err) {
        client.close();
        response.error(err);
        response.complete();
        return;
      }

      // console.log('insert one: ');

      db.collection(collection)
        .insertOne(value, (err, result) => {

          if (err) {
            client.close();
            response.error(err);
            response.complete();
            return;
          }

          client.close();
          response.next(true)
          response.complete();

        });
    });

    return response;
  }

  query(collection: string, params?: any, sort?: any) : Observable<Array<any>> {

    const response = new ReplaySubject<Array<any>>(1);

    MongoClient.connect(dbUrl, (err, client) => {

      const db = client.db(dbName);

      if (err) {
        client.close();
        response.error(err);
        response.complete();
        return;
      }

      const findParams = params ? params : {};

      let find;
      if(sort) {
         find = db.collection(collection).find(params).sort(sort);
      } else {
        find = db.collection(collection).find(params);
      }

      find.toArray((err, docs) => {

        if(err) {
          client.close();
          response.error(err);
          response.complete();
          return;
        }

        client.close();
        response.next(docs);
        response.complete();

      });

    });

    return response;
  }






  delete(collection: string, id: string) : Observable<boolean> {

    const response = new ReplaySubject<boolean>(1);

    MongoClient.connect(dbUrl, (err, client) => {

      const db = client.db(dbName);

      if (err) {
        client.close();
        response.error(err);
        response.complete();
        return;
      }
      db.collection(collection)
        .deleteOne({_id: new ObjectID(id) }, (err, r) => {

        if(err) {
          client.close();
          response.error(err);
          response.complete();
          return;
        }

          console.log('delete');
          console.log(r);

        client.close();
        response.next(true);
        response.complete();

      });

    });

    return response;
  }


}


export function checkMongoError(err, client, response: Subject<any>) : boolean {

  if(err) {
    client.close();
    response.error(err);
    response.complete();
    return true;
  }

  return false;
}

