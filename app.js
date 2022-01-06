const fs = require('fs');
//const ora = require('ora');
//const chalk = require('chalk');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;



    /*client.on('ready', () => {
        console.log('Client is ready!');
        connectionReady();
    });

    client.on('auth_failure', () => {
        console.log('** Error de autentificacion vuelve a generar el QRCODE **');
    })*/


    const listenMessage = () => {
        client.on('message', (msg) => {
            const { from, to, body } = msg;

            sendMessage('584120173854@c.us', 'Escriba postre o nada');
            switch (body) {
                case 'postre':  
                sendMessage('584120173854@c.us', 'Vamos al cuarto');                  
                break;
                case 'nada':  
                sendMessage('584120173854@c.us', 'Vamos solo a dormir');                  
                break;            
                default:
                break;
            }
            console.log(from, to, body)
            
    
        });
    }  
    
    
    const sendMessage = (to, message) => {
        client.sendMessage(to, message);
    }

const withSession = () => {

  /*  const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`);
   
    spinner.start();*/
    sessionData = require(SESSION_FILE_PATH);
    client = new Client({
        session: sessionData
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        
        listenMessage();
     
       // spinner.stop();

        // sendMessage();
        // sendMedia();

       // connectionReady();

    });

    client.on('auth_failure', () => {
        //spinner.stop();
        console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
    })
      
    client.initialize();
}

const withOutSession = () => {
    console.log('No tenemos session guardada');
    client = new Client();
    client.on('qr', qr => {
        var codeqr = qrcode.generate(qr, { small: true });
        console.log('AQUI ' + qr)
    });   
    
    client.on('authenticated', (session) => {
        // Guardamos credenciales de de session para usar luego
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
}


(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();





/*const client = new Client();

client.on('qr', (qr) => {
    console.log(qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();*/


