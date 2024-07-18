const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {
    const url = "mongodb+srv://ameymali2:123Sdddd@cluster0.giegvgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Use localhost for local MongoDB
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("ameymali2");
        const coll = db.collection("student");
        const document = { name: req.body.name, choice: req.body.choice };
        const result = await coll.insertOne(document);
        res.status(200).send(result);
    } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).send({ message: "Internal Server Error", error });
    } finally {
        await client.close();
    }
});

app.listen(9000, () => {
    console.log("Ready @ 9000");
});
