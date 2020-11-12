using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Webshop.Data;
using System.Diagnostics;
using System.Linq;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload() {
            try 
            {
                var file = Request.Form.Files[0];               
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileNameTypeCheck = fileName.Split(".").Last();
                    if(fileNameTypeCheck != "png"   && fileNameTypeCheck != "jpg")
                        return StatusCode(500, $"The type of the file waiting for upload is not supported");
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex) {
                return StatusCode(500, $"A fájlfeltöltéssel hiba volt:  {ex}");
            }
        }


    }
}
