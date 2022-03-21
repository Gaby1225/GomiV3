module.exports = app => {
    const controller = app.controllers.Motoristas;

    app.route('/api/v1/Motoristas')
        .post(controller.criarMotorista);

    app.route('/api/v1/Motoristas/:motoristaId')
        .put(controller.atualizarMotorista)
        .delete(controller.removerMotorista);
}