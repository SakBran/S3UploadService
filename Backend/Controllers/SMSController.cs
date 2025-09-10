using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SMSController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SendSMS(SMSCredentialsRequest data)

        {
            var Content = new SMSCredentials
            {
                Username = data.Username,
                Password = data.Password,
                Phone = data.Phone,
                Message = data.Message
            };
            var error = new ApiResponseForMyTel();
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    StringContent content = new StringContent(JsonSerializer.Serialize(Content), Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(data.apiUrl, content);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseContent = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("API Response: " + responseContent);

                        // Deserialize the response into the ApiResponse model
                        ApiResponseForMyTel? apiResponse = JsonSerializer.Deserialize<ApiResponseForMyTel>(responseContent);

                        if (apiResponse != null && apiResponse.Status == "OK")
                        {
                            error = null;
                            return Ok(apiResponse);
                        }
                        else
                        {
                            error = apiResponse;
                            return StatusCode(500, apiResponse);
                        }
                    }
                    else
                    {
                        Console.WriteLine("API Request failed with status code: " + response.StatusCode);
                        return StatusCode((int)response.StatusCode, "Failed to send SMS.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occurred: " + ex.Message);
                    return StatusCode(500, "An error occurred while sending SMS.");
                }
            }
        }
    }


}

public class SMSCredentialsRequest
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Phone { get; set; }
    public string? Message { get; set; }
    public string? apiUrl { get; set; }
}

public class SMSCredentials
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Phone { get; set; }
    public string? Message { get; set; }
}

public class ApiResponseForMyTel
{
    [JsonPropertyName("status")]
    public string? Status { get; set; }

    [JsonPropertyName("identifier")]
    public string? Identifier { get; set; }

    [JsonPropertyName("gateway")]
    public string? Gateway { get; set; }

    [JsonPropertyName("messageId")]
    public string? MessageId { get; set; }

    [JsonPropertyName("message_id")]
    public string? MessageIdAlt { get; set; }
}