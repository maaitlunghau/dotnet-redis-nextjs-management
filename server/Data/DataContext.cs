// using server.Models;

// namespace server.Data
// {
//     public class DataContext : DbContext
//     {
//         public DataContext(DbContextOptions<DataContext> options) : base(options)
//         {
//         }

//         public DbSet<Product> Products { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             base.OnModelCreating(modelBuilder);

//             // Cấu hình thêm nếu cần (ví dụ: gán giá trị mặc định, quan hệ, v.v.)
//             modelBuilder.Entity<Product>(entity =>
//             {
//                 entity.HasKey(e => e.Id);

//                 // Đảm bảo CreatedAt luôn có giá trị mặc định là UTC NOW nếu không được set (tùy chọn)
//                 entity.Property(e => e.CreatedAt)
//                       .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

//                 // Ví dụ cấu hình enum hoặc các ràng buộc khác nếu có sau này
//             });
//         }
//     }
// }
