using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Data;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (await context.Products.AnyAsync()) return;

        var products = new List<Product>
        {
            new Product
            {
                Name = "iPhone 15 Pro Max",
                Description = "Siêu phẩm Apple với chip A17 Pro",
                Price = 30000000,
                StockQuantity = 50,
                Category = "Mobile",
                CreatedAt = DateTime.Now
            },
            new Product
            {
                Name = "MacBook Pro M3",
                Description = "Laptop mạnh mẽ nhất dành cho coder",
                Price = 45000000,
                StockQuantity = 20,
                Category = "Laptop",
                CreatedAt = DateTime.Now
            },
            new Product
            {
                Name = "Sony WH-1000XM5",
                Description = "Tai nghe chống ồn đỉnh cao",
                Price = 8500000,
                StockQuantity = 100,
                Category = "Audio",
                CreatedAt = DateTime.Now
            },
            new Product
            {
                Name = "Samsung Galaxy S24 Ultra",
                Description = "Điện thoại AI hàng đầu của Samsung",
                Price = 28000000,
                StockQuantity = 40,
                Category = "Mobile",
                CreatedAt = DateTime.Now
            }
        };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();
    }
}
