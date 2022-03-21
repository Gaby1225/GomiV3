const Coletas = require("../routes/Coletas");

module.exports = app => {
    const coletasDB = app.data.Coletas;
    const controller = {};
    const {
        Coletas: ColetasMock
    } = coletasDB;
    const motorista = 'M0X';
    const cliente = 'C0X';

    controller.listaColetasDisponiveis = (req, res) => {

        res.status(200).json(ColetasMock.data.filter(coleta => coleta.status === '1').filter(coleta => coleta.MotoristaId === ''));

    };

    controller.descricaoColeta = (req, res) => {

        const {
            coletaId
        } = req.params;

        const coletaEncontrada = ColetasMock.data.findIndex(coleta => coleta.id === coletaId)

        if (coletaEncontrada === -1) {
            res.status(400).json({
                message: 'Coleta não encontrada',
                success: false
            });
        } else {
            res.status(200).json(ColetasMock.data[coletaEncontrada]);
        }
    };

    controller.listaColetas = (req, res) => {

        var message400 = '';
        if (req.query.motorista != undefined) {
            let motorista = req.query.motorista;
            message400 = 'Nenhuma Coleta Realizada';
            res.status(200).json(ColetasMock.data.filter(coleta => coleta.MotoristaId === motorista));
        } else if (req.query.cliente != undefined) {
            let cliente = req.query.cliente;
            message400 = 'Nenhuma Coleta Solicitada';
            res.status(200).json(ColetasMock.data.filter(coleta => coleta.ClienteId === cliente));
        } else {
            res.status(400).json({
                message: message400,
                success: false
            });
        }

    };

    controller.criarColeta = (req, res) => {
        ColetasMock.data.push({
            id: req.body.id, //futuramente será gerado automático
            nome: req.body.nome,
            tipo: req.body.tipo,
            peso: req.body.peso,
            status: '1',
            MotoristaId: '',
            ClienteId: cliente,
        });

        res.status(201).json(ColetasMock);
    };

    controller.removeColeta = (req, res) => {

        const {
            coletaId
        } = req.params;

        const coletaEncontrada = ColetasMock.data.findIndex(coleta => coleta.id === coletaId);

        if (coletaEncontrada === -1) {
            res.status(400).json({
                message: 'Coleta não encontrada',
                success: false
            });
        } else {
            ColetasMock.data.splice(coletaEncontrada, 1);
            res.status(200).json({
                message: 'Solicitação de coleta removida!',
                success: true,
                json: ColetasMock
            });
        }

    }

    controller.alterarColeta = (req, res) => {

        const {
            coletaId
        } = req.params;

        const coletaEncontrada = ColetasMock.data.findIndex(coleta => coleta.id === coletaId);

        if (coletaEncontrada === -1) {
            res.status(400).json({
                message: 'Coleta não encontrada',
                success: false
            });
        } else {
            const coletaAtualizada = {
                id: coletaId, //futuramente será gerado automático
                nome: req.body.nome,
                tipo: req.body.tipo,
                peso: req.body.peso,
                status: req.body.status,
                MotoristaId: req.body.motoristaId,
                ClienteId: req.body.clienteId, //Utilizar cliente que criou a coleta
            }
            ColetasMock.data.splice(coletaEncontrada, 1, coletaAtualizada);
            res.status(200).json({
                message: 'Alteração de coleta realizada!',
                success: true,
                json: ColetasMock
            });
        }

    }

    controller.confirmarColeta = (req, res) => {
        const {
            coletaId
        } = req.params;

        const coletaEncontrada = ColetasMock.data.findIndex(coleta => coleta.id === coletaId);
        if (coletaEncontrada === -1) {
            res.status(400).json({
                message: 'Coleta não encontrada',
                success: false
            });
        } else {
            var statusAtual = ColetasMock.data[coletaEncontrada].status;

            if (statusAtual === '1')
                statusAtual = '0';
            else
                statusAtual = '1';

            const coletaAtualizada = {
                id: coletaId, //futuramente será gerado automático
                nome: req.body.nome,
                tipo: req.body.tipo,
                peso: req.body.peso,
                status: statusAtual,
                MotoristaId: req.body.motoristaId,
                ClienteId: req.body.clienteId,
            }
            ColetasMock.data.splice(coletaEncontrada, 1, coletaAtualizada);
            res.status(200).json({
                message: 'Alteração de coleta realizada!',
                success: true,
                json: ColetasMock
            });
        }
    }

    controller.aceitarColeta = (req, res) => {
        const {
            coletaId
        } = req.params;

        const coletaEncontrada = ColetasMock.data.findIndex(coleta => coleta.id === coletaId);
        if (coletaEncontrada === -1) {
            res.status(400).json({
                message: 'Coleta não encontrada',
                success: false
            });
        } else {
            var motoristaAtual = ColetasMock.data[coletaEncontrada].MotoristaId;
            var message200 = '';

            if (motoristaAtual === '') {
                motoristaAtual = motorista;
                message200 = 'Coleta aceita!'
            } else {
                motoristaAtual = '';
                message200 = 'Coleta cancelada!'
            }

            const coletaAtualizada = {
                id: coletaId, //futuramente será gerado automático
                nome: req.body.nome,
                tipo: req.body.tipo,
                peso: req.body.peso,
                status: req.body.status,
                MotoristaId: motoristaAtual,
                ClienteId: req.body.clienteId,
            }
            ColetasMock.data.splice(coletaEncontrada, 1, coletaAtualizada);
            res.status(200).json({
                message: message200,
                success: true,
                json: ColetasMock
            });
        }
    }

    return controller;
}