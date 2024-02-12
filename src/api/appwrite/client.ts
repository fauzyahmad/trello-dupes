import { Account, Client, Databases, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);


const account = new Account(client);
const database = new Databases(client);

export { client, account, database, ID };
