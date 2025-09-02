using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
// using Amazon.S3;
// using Amazon.S3.Transfer;
using API.DBContext;
using Backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SkiaSharp;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        // private readonly IConfiguration _iconfiguration;
        private readonly IWebHostEnvironment _hostingEnvironment;
        // private readonly ApplicationDbContext _context;
        // private readonly SystemSetting _sys;

        public UploadController(
             // IConfiguration iconfiguration,
             IWebHostEnvironment hostingEnvironment
            // ,ApplicationDbContext context
            )
        {
            // _iconfiguration = iconfiguration;
            _hostingEnvironment = hostingEnvironment;
            // _context = context;
            // _sys = _context.SystemSetting.First();
        }
        // GET: api/upload
        [HttpPost("Postupload")]
        public async Task<HttpResponseMessage> Postupload(String filename)
        {

            Dictionary<string, object> dict = new();
            try
            {
                var httpRequest = HttpContext.Request;
                var temp = HttpContext.Request.Query["file"];
                foreach (var file in httpRequest.Form.Files)
                {
                    HttpResponseMessage response = new(HttpStatusCode.Created);


                    var postedFile = httpRequest.Form.Files[0];
                    if (postedFile != null && postedFile.Length > 0)
                    {

                        int MaxContentLength = 1024 * 500; // Size = 500 KB

                        IList<string> AllowedFileExtensions = new List<string> { ".webp", ".PDF", ".pdf", ".jpg", ".gif", ".png", ".jpeg", ".svg" };
                        var ext = postedFile.FileName[postedFile.FileName.LastIndexOf('.')..];
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return new HttpResponseMessage(HttpStatusCode.BadRequest);
                        }
                        else if (postedFile.Length > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return new HttpResponseMessage(HttpStatusCode.BadRequest);
                        }
                        else
                        {
                            var filePath = Path.Combine("wwwroot", "Image", filename);
                            await SaveAsWebpAsync(file, filePath);
                            dict.Add("success", filename);
                            return new HttpResponseMessage(HttpStatusCode.OK);
                        }
                    }

                }

                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            catch (Exception ex)
            {
                var res = string.Format(ex.Message.ToString());
                dict.Add("error", res);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                //return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        public async Task<string> SaveAsWebpAsync(IFormFile file, string filePath)
        {
            // 1. Make sure the directory exists.
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (ext == ".webp")
            {
                // Just save the file as-is, no conversion.
                var newWebpFilePath = filePath.Split(".")[0] + ".webp";
                await using var output = new FileStream(
                    newWebpFilePath,
                    FileMode.Create, FileAccess.Write, FileShare.None,
                    bufferSize: 81920, useAsync: true);
                await file.CopyToAsync(output);
                await output.FlushAsync();
                return newWebpFilePath;
            }

            // 2. Decode the upload into a bitmap.
            using var uploadStream = file.OpenReadStream();
            using var bitmap = SKBitmap.Decode(uploadStream);
            if (bitmap is null)
                throw new InvalidOperationException("Unsupported or corrupt image.");

            // 3. Re-encode as WebP.
            using var image = SKImage.FromBitmap(bitmap);
            using var encoded = image.Encode(SKEncodedImageFormat.Webp, quality: 100);
            if (encoded is null)
                throw new InvalidOperationException("WebP codec not available.");

            // 4. Persist to disk in one go.
            var webpFilePath = filePath.Split(".")[0] + ".webp";
            await using (var output = new FileStream(
                webpFilePath,
                FileMode.Create, FileAccess.Write, FileShare.None,
                bufferSize: (int)encoded.Size, useAsync: true))
            {
                encoded.SaveTo(output);
                await output.FlushAsync();
            }

            return webpFilePath;
        }

    }
}