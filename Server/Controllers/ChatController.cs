using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NumeleProiectuluiTau.Controllers // Asigură-te că ești în același namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ChatController()
        {
            _httpClient = new HttpClient();
        }

        [HttpPost]
        public async Task<IActionResult> SendMessageToAI([FromBody] ChatMessageRequest request)
        {
            var apiKey = "AIza...."; // <-- Înlocuiește cu cheia ta de API Gemini
            var llmApiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={apiKey}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = request.Message }
                        }
                    }
                }
            };

            var jsonContent = new StringContent(
                Newtonsoft.Json.JsonConvert.SerializeObject(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(llmApiUrl, jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                return BadRequest("Eroare la comunicarea cu serviciul AI.");
            }

            var responseString = await response.Content.ReadAsStringAsync();
            dynamic llmResponse = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString);
            string aiMessage = llmResponse.candidates[0].content.parts[0].text;

            return Ok(new { response = aiMessage });
        }
    }

    // Aici adaugi definiția clasei care lipsea
    public class ChatMessageRequest
    {
        public string Message { get; set; }
    }
}