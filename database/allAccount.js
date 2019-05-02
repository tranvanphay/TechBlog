import Realm from 'realm'
export const ACCOUNT_LIST='AccountList';
export const ACCOUNT_SCHEMA ='Account';
export const AccountSchema={
    name: ACCOUNT_SCHEMA,
    primaryKey:'id',
    properties:{
        id:'int',
        name:{ type:'string', indexed:true },
        done:{ type: 'bool', default:false},


    }
};
//Account database
export const AccountList= {
    name: ACCOUNT_LIST,
    primaryKey: 'id',
    properties:{
        id: 'int',
        user_name: 'string',
        password: 'string',
        todos:{type: 'list', objectType: ACCOUNT_SCHEMA},
    }

};
const databaseAccountOptions = {
    path:'listAccount.realm',
    schema:[AccountList,AccountSchema],
    schemaVersion:0,
};
export const insertAccount = newAccount => new Promise((resolve, reject) => {
    Realm.open(databaseAccountOptions).then(realm => {
            realm.write(() => {
                    realm.create(ACCOUNT_LIST, newAccount);
                    resolve(newAccount);
            });
    }).catch((error) => reject(error));
    
});
export const queryAllAccount = () => new Promise((resolve,reject) => {
    Realm.open(databaseAccountOptions).then(realm => {
        let allAccount = realm.objects(ACCOUNT_LIST);
        resolve(allAccount);
    }).catch((error) => reject(error));
});

export default new Realm(databaseAccountOptions);