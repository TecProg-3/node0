import e from "express";
import express,{Request,Response} from "express";

interface data{
    a:number;
    b:number
}

const server = express();
const port = 3000;

server.use(express.json());
server.use((err: any, req:Request, res:Response, next:Function) => {
    //console.error(err.stack)
    res.status(500).send('Error')
  })
  

server.post("/",(req:Request, res:Response) =>{
    
    try{
        const x:data = req.body;
        console.log(x);
        if(typeof x.a === "number" && typeof x.b === "number" ){
            console.log("x");
        }
    }catch(error: unknown){
        if(error instanceof SyntaxError){
            console.log(error.message);
        }
        console.log(typeof(error));
    }
    //console.log();
    res.end();
});

server.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`)
});