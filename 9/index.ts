import express from 'express'
const app = express();

app.get('/bmi', (_req, res) =>{
    
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})