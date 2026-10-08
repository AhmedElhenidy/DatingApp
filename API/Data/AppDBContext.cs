using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// This is a primary constructor
public class AppDBContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
}
