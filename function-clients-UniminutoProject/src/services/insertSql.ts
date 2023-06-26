const sql = require('mssql');

const config = {
    user: 'Jsuarezpachon', 
    password: 'JimmyBuckets1022*?', 
    server: 'unidevserver.database.windows.net', 
    port: 1433, 
    database: 'DBUniminutoGroup3',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}
export const connectAndInsertQuery = async (documentId:number,nameClient:string,typeDocument:string,typeQuote:string,doctorName:string,dateQuote:any,ageClient:number): Promise<any> =>{
    try {
        var poolConnection = await sql.connect(config);
        console.log("Insert Query...");                    
        var resultSet = await poolConnection.request().query(`INSERT INTO [dbo].[Clients] VALUES (${documentId}, '${nameClient}', '${typeDocument}', '${typeQuote}', '${doctorName}','${dateQuote}',${ageClient});`);
        console.log("Culminate Insert Query....");
        // let validateResult = resultSet.recordset.length;
        // return resultSet.recordset.length;
        if (resultSet.rowsAffected.length>0){
           poolConnection.close();
           return {status:200,value:"Correct insert of Quote."};
        }else{
           poolConnection.close();
           return {status:300,body:"Failed Insert process, verify the process in Azure Resource,"}
        };
    } catch (err) {
        console.error(err.message);
    }
}
