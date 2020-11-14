const express = require("express");
const app = express(); 
const PORT = process.env.PORT || 3000;
const path = require("path"); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    `App Running on port ${PORT}`;
});