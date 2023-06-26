export function messageFinal (message:string, status:number, headers?:any){
    let context = {
        headers: headers,
        status: status,
        body: message
    };
    return context;
}
