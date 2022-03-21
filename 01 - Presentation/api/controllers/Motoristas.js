const Motoristas = require("../routes/Motoristas");

module.exports = app => {
    const motoristasDB = app.data.Motoristas;
    const controller = {};
    const {
        Motoristas: MotoristasMock
    } = motoristasDB;

    controller.criarMotorista = (req, res) => {
        MotoristasMock.data.push({
            id: req.body.id,
            email: req.body.email,
            senha: req.body.senha,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            tipoVeiculo: req.body.tipoVeiculo,
            cnh: req.body.cnh,
            expiracao: req.body.expiracao,
            categoria: req.body.categoria,
            carga: req.body.carga
        });

        res.status(201).json(MotoristasMock);
    }

    controller.atualizarMotorista = (req, res) => {

        const {
            motoristaId
        } = req.params;

        const motoristaEncontrado = MotoristasMock.data.findIndex(motorista => motorista.id === motoristaId);

        if (motoristaEncontrado === -1) {
            res.status(400).json({
                message: 'Motorista não encontrado',
                success: false
            });
        } else {
            const motoristaAtualizado = {
                id: motoristaId,
                email: req.body.email,
                senha: req.body.senha,
                nome: req.body.nome,
                nascimento: req.body.nascimento,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                tipoVeiculo: req.body.tipoVeiculo,
                cnh: req.body.cnh,
                expiracao: req.body.expiracao,
                categoria: req.body.categoria,
                carga: req.body.carga
            }
            MotoristasMock.data.splice(motoristaEncontrado, 1, motoristaAtualizado);
            res.status(200).json({
                message: 'Alteração de motorista realizada!',
                success: true,
                json: MotoristasMock
            })
        }
    }

    controller.removerMotorista = (req, res) => {

        const {
            motoristaId
        } = req.params;

        const motoristaEncontrado = MotoristasMock.data.findIndex(motorista => motorista.id === motoristaId);

        if (motoristaEncontrado === -1) {
            res.status(400).json({
                message: 'Motorista não encontrado',
                success: false
            });
        } else {
            MotoristasMock.data.splice(motoristaEncontrado, 1);
            res.status(200).json({
                message: 'Motorista removido!',
                success: true,
                json: MotoristasMock
            })
        }

    }

    return controller;
}