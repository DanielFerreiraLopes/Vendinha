using Vendinha.Services;
using NHibernate;
using NHibernate.Cfg;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<ISessionFactory>((s) =>
{
    var config = new Configuration();
    config.Configure();
    return config.BuildSessionFactory();
});

builder.Services.AddMvcCore().AddJsonOptions(
    x =>
    {
        x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    }
);

builder.Services.AddTransient<ClienteService>();
builder.Services.AddTransient<DividaService>();

builder.Services.AddCors(
    b => b.AddDefaultPolicy(c => c.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()
    )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.UseDeveloperExceptionPage();

app.MapControllers();

app.Run();
