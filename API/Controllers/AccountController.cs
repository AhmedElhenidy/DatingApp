
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(AppDBContext context,ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]//ap/acount/register
        public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
        {
            if(await EmialExists(registerDTO.Email)) return BadRequest("Email is taken, try different one");
            // using keyword is used to ensure that this object would be removed after being used and no need to wait for garpage collector
            using var hmac = new HMACSHA512(); 

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user.ToDto(tokenService);
        }

        [HttpPost("login")]//ap/acount/login
        public async Task<ActionResult<UserDto>> login(LoginDTO loginDTO)
        {
            var user = await context.Users.SingleOrDefaultAsync(x=> x.Email == loginDTO.Email);
            if(user==null) return Unauthorized("Invalid Email");
            // using keyword is used to ensure that this object would be removed after being used and no need to wait for garpage collector
            using var hmac = new HMACSHA512(user.PasswordSalt); 
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            
            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return user.ToDto(tokenService);
        }

        private async Task<bool> EmialExists(string email)
        {
            return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }
        
    }
}