import { MongoClient } from 'mongodb';

import {ObjectID} from "bson";

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export const dbUrl = 'mongodb://localhost:27017';

export const dbName = 'cabin';

export class GenericDao {

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

      console.log('insert one: ');

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
