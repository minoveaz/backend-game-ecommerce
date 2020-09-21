import chalk from 'chalk';
import MongoClient from 'mongodb';

class Database{
    async init(){
        try{
        const MONGO_DB = process.env.DATABASE || 'mongodb://localhost:27017/meang-online-shop';
        const client = await MongoClient.connect(
            MONGO_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const db = client.db();

        if (client.isConnected()){
            console.log('===================================DATABASE==========================');
            console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
            console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);
        }
        }
        catch(err){console.log(err);}        
    }
}

export default Database; 