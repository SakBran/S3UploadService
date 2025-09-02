using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddControllers();
        builder.Services.AddMemoryCache();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();



        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseDeveloperExceptionPage();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseSwagger();
            app.UseDeveloperExceptionPage();
            app.UseSwaggerUI();
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        #region Cors
        app.UseCors(
                      builder =>
                      {
                          builder.WithMethods("GET");
                          builder.WithMethods("PUT");
                          builder.WithMethods("POST");
                          builder.WithMethods("DELETE");
                          builder.WithMethods("*");
                          builder.WithHeaders("Authorization");
                          // builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                          //Code capacitor://localhost for ios device 
                          //http://localhost for android device
                          //An origin is the combination of the protocol, domain, 
                          //and port from which your Ionic app or the external resource is served. 
                          //For example, apps running in 
                          //Capacitor have capacitor://localhost (iOS) or http://localhost (Android) as their origin. 
                          builder.WithOrigins(
                          "https://vehicle.myanmartradenet.com",
                          "https://testingvehicle.myanmartradenet.com",
                          "https://www.mpu-ecommerce.com",
                          "https://www.mpuecomuat.com",
                          "capacitor://localhost",
                          "http://localhost:5173",
                          "http://localhost:5173/",
                          "http://localhost",
                          "http://localhost/",
                          "https://localhost",
                          "https://localhost/",
                          "http://localhost:*",
                          "http://localhost:8100",
                          "http://localhost:8100/",
                          "http://localhost:3000",
                          "http://localhost:3000/").AllowAnyMethod().AllowAnyHeader().AllowCredentials();

                      }
                  );
        #endregion

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor
            | ForwardedHeaders.XForwardedProto
        });
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.UseStaticFiles();
        app.Run();
    }
}