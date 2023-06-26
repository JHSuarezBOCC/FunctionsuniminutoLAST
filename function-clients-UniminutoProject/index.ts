import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {messageFinal} from "./src/services/message"
import {connectAndQuery} from "./src/services/consultSql"
import {connectAndInsertQuery} from "./src/services/insertSql"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let documentId = Number(req.query.documentId);
    let documentId1 = Boolean(req.query.documentId1);
    let typeProcess = String(req.query.typeProcess);
    let typeProcess1 = Boolean(req.query.typeProcess);
    let nameClient = String(req.query.nameClient);
    let nameClient1 = Boolean(req.query.nameClient);
    let typeDocument = String(req.query.typeDocument);
    let typeDocument1 = Boolean(req.query.typeDocument);
    let typeQuote = String(req.query.typeQuote);
    let typeQuote1 = Boolean(req.query.typeQuote);
    let doctorName = String(req.query.doctorName);
    let doctorName1 = Boolean(req.query.doctorName);
    let dateQuote = (req.query.dateQuote);
    let dateQuote1 = Boolean(req.query.dateQuote);
    let ageClient = Number(req.query.ageClient);
    let ageClient1 = Boolean(req.query.ageClient);
    
    if (!typeProcess1){
        let message = messageFinal("Need query param (typeProcess), Do you need consult or insert process??", 400)
        context.res = message;
    }else if (typeProcess === "consult"){
         const response:any = await connectAndQuery(documentId);
         if (!documentId || !typeProcess){
             let message = messageFinal("indicate in query params (documentId:number), for consult process.", 400);
             context.res = message;
         }else if(response.status==200){
             let message = messageFinal(response,200);
             context.res = message;
         }else {
             context.res=response;
         };
    }else if (typeProcess === "insert"){
        console.log ("Ingreso al validador");
            if(!typeQuote ){
            let message = messageFinal("indicate in query params (documentId:number), (nameClient:String), "+
            "(typeDocument:String), (typeQuote:String), (doctorName:String), "+
            "(dateQuote:Date(yyyy/MM/DD)), (ageClient:number), for insert process.",400);
            context.res = message;
        }else{ 
            const response1:any = await connectAndInsertQuery(documentId,nameClient,typeDocument,typeQuote,doctorName,dateQuote,ageClient);
            if (response1.status === 200){
                let message = messageFinal(response1,200);
                context.res = message;
            } 
            // let message = messageFinal("indicate in query params (documentId:number) and (typeProcess:String), for consult process.",400);
            // context.res = messageFinal;
            let message = messageFinal(response1,215);
            context.res = message;
        }
    }
};
export default httpTrigger;