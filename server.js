const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://benssocool:VmBBvf7OnXQou2LA@cluster0.rbfpjdr.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

// For some reason, just const mongoose = require('mongoose'); raises a warning (see https://stackoverflow.com/questions/72627639/unresolved-function-or-method-connect-mongoose)
const mongoose = require('mongoose').default;
mongoose.connect(uri)
    .then(() =>{
        console.log('mongoose connected');
    })
    .catch(() => {
        console.log('error');
})

const timeSchema = new mongoose.Schema({
    time:{
        type:String,
        required:true // Cannot be empty.
    },
    // name:{
    //     type:String,
    //     required:true // Cannot be empty.
    // }
})
const collection = new mongoose.model('time', timeSchema);

function saveTime(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateAndTime = date + ' ' + time

    let data = {
        time:dateAndTime
    }

    collection.insertMany([data]);
}



