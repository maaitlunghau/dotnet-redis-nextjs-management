using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using server.Data;
using server.Models;
using server.Repository;

namespace server.Service;

public class ProductService : IProductRepository
{
    private readonly DataContext _dbContext;
    private readonly IDistributedCache _cache;
    private const string PRODUCT_LIST_KEY = "products_all";

    public ProductService(DataContext dbContext, IDistributedCache cache)
    {
        _dbContext = dbContext;
        _cache = cache;
    }

    public async Task<ICollection<Product>> GetProductsAsync()
    {
        var cachedData = await _cache.GetStringAsync(PRODUCT_LIST_KEY);
        if (!string.IsNullOrEmpty(cachedData))
        {
            return JsonSerializer.Deserialize<ICollection<Product>>(cachedData)!;
        }

        var products = await _dbContext.Products.AsNoTracking().ToListAsync();

        if (products.Any())
        {
            var options = new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(10));

            await _cache.SetStringAsync(PRODUCT_LIST_KEY, JsonSerializer.Serialize(products), options);
        }

        return products;
    }

    public async Task<Product> GetProductAsync(int id)
    {
        string key = $"product_{id}";

        var cachedProduct = await _cache.GetStringAsync(key);
        if (!string.IsNullOrEmpty(cachedProduct))
        {
            return JsonSerializer.Deserialize<Product>(cachedProduct)!;
        }

        var pro = await _dbContext.Products.AsNoTracking().FirstOrDefaultAsync(p
            => p.Id == id
        );
        if (pro is not null)
        {
            var options = new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(10));

            await _cache.SetStringAsync(key, JsonSerializer.Serialize(pro), options);
        }

        return pro!;
    }

    public async Task<Product> CreateProductAsync(Product pro)
    {
        await _dbContext.Products.AddAsync(pro);
        await _dbContext.SaveChangesAsync();

        await _cache.RemoveAsync(PRODUCT_LIST_KEY);

        return pro;
    }

    public async Task<Product> UpdateProductAsync(Product pro)
    {
        _dbContext.Products.Update(pro);
        await _dbContext.SaveChangesAsync();

        await _cache.RemoveAsync($"product_{pro.Id}");
        await _cache.RemoveAsync(PRODUCT_LIST_KEY);

        return pro;
    }

    public async Task DeleteProductAsync(Product pro)
    {
        var existingPro = await GetProductAsync(pro.Id);
        if (existingPro is not null)
        {
            _dbContext.Products.Remove(existingPro);
            await _dbContext.SaveChangesAsync();

            await _cache.RemoveAsync($"product_{pro.Id}");
            await _cache.RemoveAsync(PRODUCT_LIST_KEY);
        }
    }
}
