using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Repository;

namespace server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
            => _productRepository = productRepository;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var products = await _productRepository.GetProductsAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    error = "Đã có lỗi xảy ra từ phía server.",
                    detail = ex.Message
                });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var product = await _productRepository.GetProductAsync(id);
                if (product is null) return NotFound();

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    error = "Đã có lỗi xảy ra từ phía server.",
                    detail = ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Product pro)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await _productRepository.CreateProductAsync(pro);
                return Ok(pro);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    error = "Đã có lỗi xảy ra từ phía server.",
                    detail = ex.Message
                });
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromBody] Product pro, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var existingPro = await _productRepository.GetProductAsync(id);
                if (existingPro is null) return NotFound();

                existingPro.Name = pro.Name;
                existingPro.Price = pro.Price;
                existingPro.Description = pro.Description;
                existingPro.Category = pro.Category;
                existingPro.StockQuantity = pro.StockQuantity;

                await _productRepository.UpdateProductAsync(existingPro);

                return Ok(existingPro);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    error = "Đã có lỗi xảy ra từ phía server.",
                    detail = ex.Message
                });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var existingPro = await _productRepository.GetProductAsync(id);
                if (existingPro is null) return NotFound();

                await _productRepository.DeleteProductAsync(existingPro);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    error = "Đã có lỗi xảy ra từ phía server.",
                    detail = ex.Message
                });
            }
        }
    }
}
