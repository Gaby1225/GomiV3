module.exports = app => {
    const controller = app.controllers.Clientes;

    app.route('/api/v1/Clientes')
        .post(controller.criarCliente);

    app.route('/api/v1/Clientes/:clienteId')
        .put(controller.atualizarCliente)
        .delete(controller.removerCliente);
}