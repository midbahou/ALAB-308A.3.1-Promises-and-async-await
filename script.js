// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// central: database identifies which database the users are stored within
const val = await central(1);
console.log(val); // returns-> db1

// db1, db2. db3: databases contain the user's basic information, including username, website, and company.
const val2 = await db1(1)
console.log(val2);

// val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
const val3 = await vault(1);
console.log(val3);




async function getUserData(id) {
    try {
        const dbs = {
            db1: db1,
            db2: db2,
            db3: db3,
        };
        const dbCenter = await central(id);

        if (id > 10) {
            throw new Error ("Hey dummy this data base does not exist!")
        }
          
          console.log(dbCenter);
        
        
          const [dbData, vaultData] = await Promise.all([dbs[dbCenter](id), vault(id)])
          return {
            name: vaultData.name,
            username: dbData.username,
            email: vaultData.email,
          }
    } catch (error) {
       return Promise.reject(error.message);
        
    }

}

const user = await getUserData(15);
console.log(user);
