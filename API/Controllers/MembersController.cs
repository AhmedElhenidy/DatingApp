using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController] 
    [Route("api/[controller]")] // localhost:5001/api/members
    // dotnet core is responsible for dpendency injection handling as AppDBContext is registered as a service in Program.cs
    public class MembersController(AppDBContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> getMembers()
        {
            var members = await context.Users.ToListAsync();
            return members;
        }

        [HttpGet("{id}")]// localhost:5001/api/members/bob-id
         public async Task<ActionResult<AppUser>> getMember(String id)
        {
            var member = await context.Users.FindAsync(id);
            if(member == null) return NotFound();
            return member;
        }

    }
}