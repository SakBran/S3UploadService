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
    public class UploadController : ControllerBase
    {
        public UploadController()
        {
        }
        // GET: api/upload
        [HttpPost]
        public async Task<HttpResponseMessage> Postupload(String filename)
        {

            Dictionary<string, object> dict = new();
            try
            {
                var httpRequest = HttpContext.Request;
                var temp = HttpContext.Request.Query["file"];
                var directoryName = "";
                var _path = "";
                foreach (var file in httpRequest.Form.Files)
                {
                    HttpResponseMessage response = new(HttpStatusCode.Created);


                    var postedFile = httpRequest.Form.Files[0];
                    if (postedFile != null && postedFile.Length > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1000; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".PDF", ".pdf", ".jpg", ".gif", ".png", ".jpeg", ".svg" };
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
                            var filePath = Path.Combine("wwwroot", "img", filename);

                            using (var stream = System.IO.File.Create(filePath))
                            {
                                await file.CopyToAsync(stream);
                                directoryName = filename;
                                _path = filePath;
                            }

                            #region AWS S3 Case
                            try
                            {
                                var accessKey = "";
                                var secretKey = "";
                                var credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey);
                                var config = new AmazonS3Config
                                {
                                    RegionEndpoint = Amazon.RegionEndpoint.APSoutheast1 // Replace with your desired region
                                };
                                var s3Client = new Amazon.S3.AmazonS3Client(credentials, config);

                                using (var fileTransferUtility = new TransferUtility(s3Client))
                                {
                                    var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                                    {
                                        BucketName = "",
                                        FilePath = filePath, // Local path to the file you want to upload
                                        Key = "" + "/" + filename, // The key (name) for the object in S3
                                    };

                                    fileTransferUtility.Upload(fileTransferUtilityRequest);
                                }
                                #region ဒါကlocalမှာဖျက်တာ
                                System.IO.File.Delete(_path);
                                #endregion
                            }
                            catch (AmazonS3Exception s3Exception)
                            {
                                var errorLog = s3Exception;
                            }
                            #endregion
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
    }
}