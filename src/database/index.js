import { MongoClient } from 'mongodb';

let client = undefined;

const MONGO_URL = `mongodb://localhost:27017`;

export async function getClient () {
    
    if (!client) {

        client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});
        await client.connect();

    }  

    return client;

}

export async function getCollection(db, collection) {

    const client = await getClient();
    return client.db(db).collection(collection);
    
}