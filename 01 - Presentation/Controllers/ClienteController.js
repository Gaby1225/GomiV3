
[ApiController]
[Produces("application/json")]
[Route("api/[controller]")]

import {Router} from "express";

const router = Router();


public class ClienteController{

    private readonly IGenerateMethodsCrud<Cliente> _clienteRepository;
    private readonly ILogger<ClienteController> _logger;

    public ClienteController(ILogger<ClienteController> logger, IGenerateMethodsCrud<Cliente> clienteRepository)
    {
        _logger = logger;
        _clienteRepository = clienteRepository;
    }

}


router.Get("/cliente/:id", (request, response) {}

[HttpGet("{id}")]
public async Task<ActionResult<Categoria>> Get(int id)
{
    if (id > 0)
    {
        var cliente = await _clienteRepository.Get(id);
        return Ok(cliente);
    }
    return Ok();
}


);


router.Get(

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> Get()
    {

        var motorista = await _motoristaRepository.Get();
        return Ok(motorista);
    }

);

router.Post(

    [HttpPost]
    public async Task<IActionResult> Post(Cliente model)
    {
        if (model.Titulo != "")
        {
            var cliente = await _clienteRepository.Create(model);
            return Ok(cliente);
        }
        return Ok();
    }

);

router.Put(

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Cliente m, int id)
    {
        m.Id = id;
        if (m.Titulo != "")
        {
            var cliente = await _clienteRepository.Update(m);
            return Ok(cliente);
        }
        return Ok();
    }

);

router.Delete(

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var cliente = await _clienteRepository.Delete(id);
        return Ok(cliente);
    } 

);

