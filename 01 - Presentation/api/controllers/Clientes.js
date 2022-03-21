const Clientes = require("../routes/Clientes");

module.exports = app => {
    const clientesDB = app.data.Clientes;
    const controller = {};
    const {
        Clientes: ClientesMock
    } = clientesDB;

    controller.criarCliente = (req, res) => {
        ClientesMock.data.push({
            id: req.body.id,
            email: req.body.email,
            senha: req.body.senha,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            cep: req.body.cep
        });

        res.status(201).json(ClientesMock);
    }

    controller.atualizarCliente = (req, res) => {

        const {
            clienteId
        } = req.params;

        const clienteEncontrado = ClientesMock.data.findIndex(cliente => cliente.id === clienteId);

        if (clienteEncontrado === -1) {
            res.status(400).json({
                message: 'Cliente não encontrado',
                success: false
            });
        } else {
            const clienteAtualizado = {
                id: clienteId,
                email: req.body.email,
                senha: req.body.senha,
                nome: req.body.nome,
                nascimento: req.body.nascimento,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                rua: req.body.rua,
                numero: req.body.numero,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
                cidade: req.body.cidade,
                cep: req.body.cep
            }
            ClientesMock.data.splice(clienteEncontrado, 1, clienteAtualizado);
            res.status(200).json({
                message: 'Alteração de cliente realizada!',
                success: true,
                json: ClientesMock
            })
        }
    }

    controller.removerCliente = (req, res) => {

        const {
            clienteId
        } = req.params;

        const clienteEncontrado = ClientesMock.data.findIndex(cliente => cliente.id === clienteId);

        if (clienteEncontrado === -1) {
            res.status(400).json({
                message: 'Cliente não encontrado',
                success: false
            });
        } else {
            ClientesMock.data.splice(clienteEncontrado, 1);
            res.status(200).json({
                message: 'Cliente removido!',
                success: true,
                json: ClientesMock
            })
        }

    }

    return controller;
}