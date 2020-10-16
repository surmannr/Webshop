using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Webshop.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DummyController : ControllerBase
    {

        private DummySettings options;

        public DummyController(IOptions<DummySettings> options)
        {
            this.options = options.Value;
        }


        // GET: api/<DummyController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DummyController>/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return id % 2 == 0 ? options.DefaultString : options.DefaultInt.ToString();
        }

        // POST api/<DummyController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DummyController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DummyController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
