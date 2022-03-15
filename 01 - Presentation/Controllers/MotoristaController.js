
[ApiController]
[Produces("application/json")]
[Route("api/[controller]")]

public class MotoristaController{

    private readonly IGenerateMethodsCrud<Motorista> _motoristaRepository;
    private readonly ILogger<MotoristaController> _logger;

    public MotoristaController(ILogger<MotoristaController> logger, IGenerateMethodsCrud<Motorista> motoristaRepository)
    {
        _logger = logger;
        _motoristaRepository = categoriasRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> Get()
    {

        var motorista = await _motoristaRepository.Get();
        return Ok(motorista);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Motorista>> Get(int id)
    {
        if (id > 0)
        {
            var motorista = await _motoristaRepository.Get(id);
            return Ok(motorista);
        }
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Motorista model)
    {
        if (model.Titulo != "")
        {
            var motorista = await _motoristaRepository.Create(model);
            return Ok(motorista);
        }
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Motorista m, int id)
    {
        m.Id = id;
        if (m.Titulo != "")
        {
            var motorista = await _motoristaRepository.Update(m);
            return Ok(motorista);
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var motorista = await _motoristaRepository.Delete(id);
        return Ok(motorista);
    }   
}