using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class SystemSetting
    {
        public SystemSetting()
        {
            Id = Guid.NewGuid().ToString();
            CurrencyCode = "104";
        }
        [Key]
        public string Id { get; set; }
        public string? MpuUrl { get; set; }
        public string? AyaEnquiryURl { get; set; }
        public string? MerchantId { get; set; }
        public string? SecretKey { get; set; }
        public string? AppSecret { get; set; }
        public string CurrencyCode { get; set; }
        public decimal IMAmount { get; set; }
        public decimal MOCAmount { get; set; }
        public decimal OnlineFees { get; set; }
        public int RegistrationYear { get; set; }
        public string? smsApiUrl { get; set; }
        public string? smsUsername { get; set; }
        public string? smsPassword { get; set; }
        public string? S3accessKey { get; set; }
        public string? S3secretKey { get; set; }
        public string? BucketName { get; set; }
        public string? S3Path { get; set; }
        public int ExtensionPeriodInDays { get; set; }
    }
}