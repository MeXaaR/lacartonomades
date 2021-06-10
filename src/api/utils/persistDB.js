import localforage from "localforage";
import { extendPrototype as extendGetItems } from "localforage-getitems";
import { extendPrototype as extendSetItems } from "localforage-setitems";
import { LocalCollection } from "meteor/minimongo";

extendGetItems(localforage);
extendSetItems(localforage);

Mongo.Collection.prototype._isCommon = false;

Mongo.Collection.prototype.isCommon = function (bool) {
  this._isCommon = bool || true;
};

Mongo.Collection.prototype._isSyncing = new ReactiveVar(false);

Mongo.Collection.prototype.isSyncing = function () {
  return this._isSyncing.get();
};

Mongo.Collection.prototype.setPersisted = function (data) {
  const store = localforage.createInstance({
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: "persisted_collections",
    storeName: this._name,
  });

  return store.setItems(data);
};

Mongo.Collection.prototype.getPersisted = function (ids) {
  const store = localforage.createInstance({
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: "persisted_collections",
    storeName: this._name,
  });

  if (typeof ids === "string") return store.getItem(ids);
  else if (typeof ids !== "string" || !ids) return store.getItems(ids || null);
  else throw new Error("Invalid id('s) argument.");
};

Mongo.Collection.prototype.removePersisted = function (ids) {
  const store = localforage.createInstance({
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: "persisted_collections",
    storeName: this._name,
  });

  if (typeof ids === "string") return store.removeItem(ids);
  else if (typeof ids !== "string")
    return Promise.all(ids.map((id) => store.removeItem(id)));
  else throw new Error("Invalid id('s) argument.");
};

Mongo.Collection.prototype.clearPersisted = function () {
  const store = localforage.createInstance({
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: "persisted_collections",
    storeName: this._name,
  });

  return store.clear();
};

Mongo.Collection.prototype.syncPersisted = function () {
  const col = this;

  return new Promise((resolve, reject) => {
    col._isSyncing.set(true);

    const store = localforage.createInstance({
      driver: [
        localforage.WEBSQL,
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
      ],
      name: "persisted_collections",
      storeName: col._name,
    });

    const inserted = [];
    const updated = [];
    const removed = [];

    store
      .getItems()
      .then((pc) => {
        for (let key in pc) {
          if (pc.hasOwnProperty(key)) {
            const doc = pc[key];

            if (col._isCommon)
              if (doc === false) {
                removed.push(key);
              } else if (doc._insertedOffline && doc._updatedOffline) {
                delete doc._insertedOffline;
                delete doc._updatedOffline;

                inserted.push(doc);
              } else if (doc._insertedOffline) {
                delete doc._insertedOffline;

                inserted.push(doc);
              } else if (doc._updatedOffline) {
                delete doc._updatedOffline;

                updated.push(doc);
              }

            if (doc !== false) {
              doc._id = key;

              col._collection._docs.set(key, doc);
            }
          }
        }

        col._collection.queries.forEach((query) => {
          col._collection._recomputeResults(query);
        });

        col._isSyncing.set(false);

        resolve({ inserted, updated, removed });
      })
      .catch(reject);
  });
};

Mongo.Collection.prototype.detachPersisters = function (ids) {
  const persisters = this._persisters;

  let removeIds = [];

  if (typeof ids === "string") removeIds.push(ids);
  else if (typeof ids !== "string") removeIds = ids;
  else if (ids) throw new Error("Invalid id('s) argument.");

  if (!ids)
    for (let id in persisters) {
      if (persisters.hasOwnProperty(id)) {
        const persister = persisters[id];

        persister._observeHandle.stop();

        delete this._persisters[id];
      }
    }
  else
    removeIds.forEach((id) => {
      const persister = persisters[id];

      persister._observeHandle.stop();

      delete this._persisters[id];
    });
};

Mongo.Collection.prototype.attachPersister = function (selector, options) {
  const col = this;

  if (!col._persisters) col._persisters = {};

  const persisterId = col._collection.next_qid;
  const persister = {};

  col._persisters[persisterId] = persister;

  persister._store = localforage.createInstance({
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: "persisted_collections",
    storeName: col._name,
  });

  persister._observeHandle = col.find(selector || {}, options || {}).observe({
    added(doc) {
      const _id = doc._id;
      delete doc._id;

      if (!Meteor.status().connected && col._isCommon)
        doc._insertedOffline = true;

      persister._store.setItem(_id, doc).catch(console.error);
    },
    changed(doc) {
      const _id = doc._id;
      delete doc._id;

      if (!Meteor.status().connected && col._isCommon)
        doc._updatedOffline = true;

      persister._store.setItem(_id, doc).catch(console.error);
    },
    removed(doc) {
      if (!Meteor.status().connected && col._isCommon)
        persister._store.setItem(doc._id, false).catch(console.error);
      else persister._store.removeItem(doc._id).catch(console.error);
    },
  });

  return persisterId;
};


Mongo.Collection.prototype._defineBatchInsert = function(){
  var self = this;

  // don't define a method for a null collection
  if ( ! self._name || ! self._connection ) return;
  var m = {};

  m['/' + self._name + '/batchInsert'] = function( docs ){
    check( docs, [Object]);
    // 'this' refers to method context
    if ( this.isSimulation){
      return docs.map( function( doc ){
        if (! doc._id)
          doc._id = self._makeNewID();
        return self.insert( doc );
      });
    }

    //client returned so server code below
    var userId = this.userId;
    var generatedIds = docs.map( function( doc ){
      if( ! _.has( doc, '_id') ){
        return self._makeNewID();
      } else
        return doc._id;
    });

    docs.forEach( function( doc, ii ){
      if ( this.connection ) {
        //server method called by client so check allow / deny rules.
        if (!( (doc && _type(doc) ) &&
              !EJSON._isCustomType(doc))) {
           throw new Error("Invalid modifier. Modifier must be an object.");
        }
        // call user validators.
        // Any deny returns true means denied.
        if (_.any(self._validators.insert.deny, function(validator) {
          return validator(userId, docToValidate(validator, doc, generatedIds[ii]));
        })) {
          throw new Meteor.Error(403, "Access denied");
        }
        // Any allow returns true means proceed. Throw error if they all fail.
        if (_.all(self._validators.insert.allow, function(validator) {
          return !validator(userId, docToValidate(validator, doc, generatedIds[ii]));
        })) {
          throw new Meteor.Error(403, "Access denied");
        }
      }

      doc._id =  generatedIds[ii];
    }, this );  // pass context of method into forEach
    return _batchInsert(self, docs);
    //end of method definition
  };

  self._connection.methods( m );
};
const _batchInsert = function (collection, docs, cb) {
  var connection = MongoInternals.defaultRemoteCollectionDriver().mongo;
  var write = connection._maybeBeginWrite();
  var _collection = collection.rawCollection();
  var future = new Future;
  _collection.insert( replaceTypes( docs, replaceMeteorAtomWithMongo), {safe:true}, future.resolver());
  try {
    var result = future.wait();
    result = getIdsFromMongoResult(result);
    docs.forEach( function( doc ){
      Meteor.refresh( { collection: collection._name, id: doc._id } );
    });
    write.committed();
    if (cb)
      return cb(null, result);
    return result;
  } catch (e){
    write.committed();
    if (cb)
      return cb(e);
    throw (e);
  }
}

Mongo.Collection.prototype.batchInsert = function( /*args*/ ){
  var self = this;

  var args = _.toArray(arguments);
  var cb;
  if (typeof args[ args.length - 1] === 'function'){
    cb = args.pop();
  }

  if ( ! self._name || ! self._connection) {
    var res, err;
    try {
      res = args[0].map( function( doc ){
        return self._collection.insert( doc );
      });
    } catch (e){
      if ( ! cb )
        throw e;
      err = e;
    };
    cb && cb( err, res );

    return res;
  } else if (self._connection && self._connection === Meteor.server) {
    docs = args[0].map( function (doc){
      if (! doc._id) doc._id = self._makeNewID();
      return doc;
    })
    return _batchInsert( self, docs, cb);
  }
  if ( cb )
    return self._connection.apply( '/'+ self._name + '/batchInsert', args, {returnStubValue: true}, cb );

  return self._connection.apply( '/'+ self._name + '/batchInsert', args, {returnStubValue: true});
};

// CollectionExtensions.addExtension(function (name, options) {
//   this._defineBatchInsert();
// });

Meteor.Collection = Mongo.Collection;

//function copied from MDG Mongo.Collection._validateInsert.  Needed in allow / deny checks.

function docToValidate(validator, doc, generatedId) {
  var ret = doc;
  if (validator.transform) {
    ret = EJSON.clone(doc);
    // If you set a server-side transform on your collection, then you don't get
    // to tell the difference between "client specified the ID" and "server
    // generated the ID", because transforms expect to get _id.  If you want to
    // do that check, you can do it with a specific
    // `C.allow({insert: f, transform: null})` validator.
    if (generatedId !== null) {
      ret._id = generatedId;
    }
    ret = validator.transform(ret);
  }
  return ret;
};

function _type (v) {
  if (typeof v === "number")
    return 1;
  if (typeof v === "string")
    return 2;
  if (typeof v === "boolean")
    return 8;
  if ( _.isArray(v) )
    return 4;
  if (v === null)
    return 10;
  if (v instanceof RegExp)
    // note that typeof(/x/) === "object"
    return 11;
  if (typeof v === "function")
    return 13;
  if (v instanceof Date)
    return 9;
  if (EJSON.isBinary(v))
    return 5;
  if (v instanceof LocalCollection._ObjectID)
    return 7;

  return 3; // object

    // XXX support some/all of these:
    // 14, symbol
    // 15, javascript code with scope
    // 16, 18: 32-bit/64-bit integer
    // 17, timestamp
    // 255, minkey
    // 127, maxkey
};