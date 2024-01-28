using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using ServerLibrary.Repositories.Implementations;
using System.Text.Json.Serialization;
using TeamSync.Controllers;
using TeamSync.Data;
using TeamSync.Helpers;
using TeamSync.Repositories.Contracts;
using TeamSync.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TeamSyncDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TeamSyncDbContext") ??
    throw new InvalidOperationException("Connection string 'TeamSyncDbContext' not found.")));

// Add application part for controllers
builder.Services.AddControllers()
    .AddApplicationPart(typeof(CompanyController).Assembly)
    .AddControllersAsServices();
builder.Services.AddControllers()
    .AddApplicationPart(typeof(EmployeeController).Assembly)
    .AddControllersAsServices();
builder.Services.AddControllers()
    .AddApplicationPart(typeof(DepartmentController).Assembly)
    .AddControllersAsServices();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    options.JsonSerializerOptions.MaxDepth = 32;
});


builder.Services.AddScoped<CompanyService>();
builder.Services.AddScoped<EmployeeService>();
builder.Services.AddScoped<DepartmentService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
builder.Services.Configure<JwtSection>(builder.Configuration.GetSection("JwtSection"));
builder.Services.AddScoped<IUserAccount, UserAccountService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.Run();