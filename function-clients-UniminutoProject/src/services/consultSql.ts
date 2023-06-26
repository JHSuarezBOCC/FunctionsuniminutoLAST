//import sql from 'mssql';
//import {config} from "./util/constans"
 const sql = require('mssql');


     const config = {
         user: 'Jsuarezpachon', // better stored in an app setting such as process.env.DB_USER
         password: 'JimmyBuckets1022*?', // better stored in an app setting such as process.env.DB_PASSWORD
         server: 'unidevserver.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
         port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
         database: 'DBUniminutoGroup3', // better stored in an app setting such as process.env.DB_NAME
         authentication: {
             type: 'default'
         },
         options: {
             encrypt: true
         }
     }
    // console.log("Starting... Insert");
    // const response:any = connectionSql();
    // const response1:any = consultSql();
    // console.log("Respuesta Consulta:", response1)
    // insertclient("Zapata","Carlos");
    // console.log("Starting... Consult");
    // connectAndQuery();
    export const connectAndQuery = async (documentId:number): Promise<any> =>{
         try {
             var poolConnection = await sql.connect(config);
             console.log("Consult Query...");
             var resultSet = await poolConnection.request().query(`SELECT * FROM [dbo].[Clients] WHERE ID = ${documentId}`);
             console.log("Culminate Query");
             let validateResult = resultSet.recordset.length;
             //return resultSet.recordset.length;
             if (resultSet.recordset.length!= 0){
                poolConnection.close();
                return {status:200, value:resultSet.recordset};
             }else{
                poolConnection.close();
                return {status:400,body:"Not exits Data with value ID indicate."}
             };
         } catch (err) {
             console.error(err.message);
         }
     }

     async function insertclient(name:string, lastName:string){
         try {
             var poolConnection = await sql.connect(config);
             console.log("Insert rows into the Table testx");
             var resultSet = await poolConnection.request().query(`INSERT INTO [dbo].[tests] VALUES (1022427506,'${lastName}','${name}',45);`);
             console.log("Erro Status:", resultSet.Status)
             console.log(`${resultSet.recordset.length} rows returned.`);

             // output column headers
             var columns = "";
             for (var column in resultSet.recordset.columns) {
                 columns += column + ", ";
             }
             console.log("%s\t", columns.substring(0, columns.length - 2));

             // ouput row contents from default record set
             resultSet.recordset.forEach(row => {
                 console.log("%s\t%s", row.CategoryName, row.ProductName);
             });

             // close connection only when we're certain application is finished
             poolConnection.close();
         } catch (err) {
             console.error(err.message);
         }
     }