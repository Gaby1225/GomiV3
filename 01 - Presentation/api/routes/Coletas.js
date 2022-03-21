module.exports = app => {
    const controller = app.controllers.Coletas;
    app.route('/api/v1/Coletas')
        .get(controller.listaColetas)
        .post(controller.criarColeta);

    app.route('/api/v1/Coletas/disponivel')
        .get(controller.listaColetasDisponiveis);

    app.route('/api/v1/Coletas/:coletaId')
        .get(controller.descricaoColeta)
        .put(controller.alterarColeta)
        .delete(controller.removeColeta);

    app.route('/api/v1/Coletas/:coletaId/Confirmacao')
        .put(controller.confirmarColeta);

    app.route('/api/v1/Coletas/:coletaId/Motorista')
        .put(controller.aceitarColeta);
}