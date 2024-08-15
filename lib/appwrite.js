import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
import { Platform } from "react-native";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ok.aora',
    projectId: '66b93f5e002f65ff3d35',
    databaseId: '66bbd16400135f277ad0',
    userCollectionId: '66bbd19f000375f495ff',
    videoCollectionId: '66bbd1bf00358b0c1619',
    storageId: '66bbd31700043f212ac2'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
;

//const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const account = new Account(client);

export async function createUser(email, password, username) {
    try{
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl,
            }
          );
    
        return newUser;

    }catch(error){
        console.log(error);
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

export async function getCurrentUser() {
try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
} catch (error) {
    console.log(error);
    return null;
}
}
