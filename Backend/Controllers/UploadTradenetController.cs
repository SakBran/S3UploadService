using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadTradenetController : ControllerBase
    {
        public UploadTradenetController()
        {
        }
        [HttpPost]
        public async Task<HttpResponseMessage> Postupload(String filename)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                Microsoft.AspNetCore.Http.HttpRequest httpRequest = HttpContext.Request;
                Microsoft.Extensions.Primitives.StringValues temp = HttpContext.Request.Query["file"];

                foreach (Microsoft.AspNetCore.Http.IFormFile file in httpRequest.Form.Files)
                {
                    AmazonS3Client s3Client = new AmazonS3Client(
                        //S3accessKey
                        "AKIAXOGA72CD2GT3UB53",
                        //S3secretKey
                        "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",
                        new AmazonS3Config
                        {
                            RegionEndpoint = Amazon.RegionEndpoint.APSoutheast1 // Replace with your desired region
                        }
                    );

                    Microsoft.AspNetCore.Http.IFormFile postedFile = httpRequest.Form.Files[0];
                    if (postedFile != null && postedFile.Length > 0)
                    {
                        IList<string> AllowedFileExtensions = new List<string> { ".PDF", ".pdf", ".jpg", ".gif", ".png", ".jpeg", ".svg" };
                        string ext = postedFile.FileName[postedFile.FileName.LastIndexOf('.')..];
                        string extension = ext.ToLower();

                        if (!AllowedFileExtensions.Contains(extension))
                        {
                            string message = "Please Upload an image of type .jpg, .gif, .png.";
                            dict.Add("error", message);
                            return new HttpResponseMessage(HttpStatusCode.BadRequest);
                        }
                        else
                        {
                            using (MemoryStream stream = new MemoryStream())
                            {
                                await file.CopyToAsync(stream);
                                stream.Seek(0, SeekOrigin.Begin);

                                TransferUtilityUploadRequest fileTransferUtilityRequest = new TransferUtilityUploadRequest
                                {
                                    InputStream = stream,
                                    //BucketName
                                    BucketName = "tn2-blob.myanmartradenet.com",
                                    //S3 Path
                                    Key = "prod/" + filename
                                };

                                using (TransferUtility fileTransferUtility = new TransferUtility(s3Client))
                                {
                                    fileTransferUtility.Upload(fileTransferUtilityRequest);
                                }
                            }

                            dict.Add("success", filename);
                            return new HttpResponseMessage(HttpStatusCode.OK);
                        }
                    }
                }
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            catch (AmazonS3Exception s3Exception)
            {
                dict.Add("error", s3Exception.Message);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
            catch (Exception ex)
            {
                dict.Add("error", ex.Message);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}