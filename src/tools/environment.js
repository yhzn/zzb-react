let baseUrl="";
if(process.env.NODE_ENV==="development"){
    baseUrl="http://localhost:9001/zzb/";
}
export {baseUrl}