using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repository;

namespace server.Service;

public class ProductService : IProductRepository
{
    private readonly DataContext _dbContext;
    public ProductService(DataContext dbContext) => _dbContext = dbContext;

    public async Task<ICollection<Product>> GetProductsAsync()
    {
        return await _dbContext.Products.AsNoTracking().ToListAsync();
    }

    public async Task<Product> GetProductAsync(int id)
    {
        var pro = await _dbContext.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (pro is not null) return pro;

        return null!;
    }

    public async Task<Product> CreateProductAsync(Product pro)
    {
        await _dbContext.Products.AddAsync(pro);
        await _dbContext.SaveChangesAsync();

        return pro;
    }

    public async Task<Product> UpdateProductAsync(Product pro)
    {
        _dbContext.Products.Update(pro);
        await _dbContext.SaveChangesAsync();

        return pro;
    }

    public async Task DeleteProductAsync(Product pro)
    {
        var existingPro = await GetProductAsync(pro.Id);
        if (existingPro is not null)
        {
            _dbContext.Products.Remove(existingPro);
            await _dbContext.SaveChangesAsync();
        }
    }
}
