const app = require("./app")
const port=process.env.PORT;    
app.listen(port, () =>{
    console.log(`app running to the port ${port}`);
})
