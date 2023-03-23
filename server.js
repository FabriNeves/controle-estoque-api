import app from './src/app.js'


const porta = process.env.PORT || 3000;



app.listen(porta,() => {
    // http://localhost:3000/
    console.log(`Servidor escutando em http://localhost:${porta}/`);
})
