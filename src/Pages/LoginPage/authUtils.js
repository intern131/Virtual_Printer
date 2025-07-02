export const isTokenValid=(token)=>{

    if(!token){
        return false;
    }
    try{
        const payload=JSON.parse(atob(token.split('.')[1]));
        return Date.now()<payload.exp*1000;

    }catch{
        return false;
    }
}