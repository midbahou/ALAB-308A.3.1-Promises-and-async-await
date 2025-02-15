// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// central: database identifies which database the users are stored within
const val = await central(1);
console.log("Central Data Base (db1, db2 or db3): ", val); // returns-> db1

// db1, db2. db3: databases contain the user's basic information, including username, website, and company.
const val2 = await db1(1)
console.log("Basic Information(dbs): ", val2);

// val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
const val3 = await vault(1);
console.log("Private Information(vault): ", val3);




async function getUserData(id) {
    try {
        const dbs = {
            db1: db1,
            db2: db2,
            db3: db3,
        };
        const dbCentral = await central(id);
          
          console.log(`The DataBase for the id "${id}" is: ${dbCentral}`);
        
          // console.log(dbs[dbCentral](id))

          // const [dbData, vaultData] = await Promise.all([dbs[dbCentral](id), vault(id)])

          const dbData = dbs[dbCentral](id); // Basic Information
          const vaultData = vault(id); // Private Information

          
          return await Promise.all([dbData, vaultData])
          .then( ([dbData, vaultData]) => {return {
            id: id,
            name: vaultData.name,
            username: dbData.username,
            email: vaultData.email,
            address: vaultData.address,
            phone: vaultData.phone,
            website: dbData.website,
            company: dbData.company
          }}) 
          
          // return Promise.all([dbData, vaultData])
          // .then(result => console.log(result));

        } catch (error) {
          return Promise.reject(error.message);
        }
}

const user = await getUserData(3);
console.log(user);

// getUserData(5);

// getUserData(5).then((data)=> console.log(data))