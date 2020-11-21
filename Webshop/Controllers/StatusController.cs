using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public StatusController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        [HttpGet]
        public async Task<IEnumerable<StatusDto>> Get()
        {
            var res = await _context.Status.ToListAsync();
            if (res == null) return null;
            var mapppelt = _mapper.Map<List<StatusDto>>(res);
            return mapppelt;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<StatusDto>> Get(int id)
        {
            var res = await _context.Status.FirstOrDefaultAsync(s => s.StatusId == id);
            if (res == null) return NotFound("The status you want to get is not exist.");
            var mapppelt = _mapper.Map<StatusDto>(res);
            return mapppelt;
        }
    }
}
