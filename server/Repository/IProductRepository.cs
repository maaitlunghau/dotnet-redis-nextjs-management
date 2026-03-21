using server.Models;

namespace server.Repository;

public interface IProductRepository
{
    public Task<ICollection<Product>> GetProductsAsync();
    public Task<Product> GetProductAsync(int id);
    public Task<Product> CreateProductAsync(Product pro);
    public Task<Product> UpdateProductAsync(Product pro);
    public Task DeleteProductAsync(Product pro);
}
