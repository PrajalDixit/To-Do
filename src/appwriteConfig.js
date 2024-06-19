import {ID, Client, Account, Teams, Databases} from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('666fca7e002c3093cb67');

const account = new Account(client);
const teams = new Teams(client);
const databases = new Databases(client);

export { ID, client, account, teams, databases};
