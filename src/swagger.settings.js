import  path  from "path";
//settings swaager
const swwagerSpects={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Node Mongoose API",
            version:"1.0.0"
        },
        servers:[
            //{url:"http://localhost:4000/"}
        ] 
    },
    apis:[`${path.join(__dirname,"./routes/*.js")}`]
};
export default swwagerSpects;