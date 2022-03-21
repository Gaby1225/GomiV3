const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

module.exports = () => {
    const app = express();

    //VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    //MIDDLEWARE
    app.use(bodyParser.json());

    //SWAGGER
    const swaggerOptions = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "GOMI API",
                version: "1.0.0",
                description: "A API que vai nos garantir um 10 em LPIV"
            },
            servers: [{
                url: "http://localhost:8080"
            }]

        },
        apis: ["../api/routes/*.js"]
    };

    const specs = swaggerJsDoc(swaggerOptions);

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

    //ENDPOINTS
    consign({ cwd: 'api' })
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app);

    //ROTAS DE APIS
    //require('../api/routes/coletasDisponiveis')(app);

    return app;
}