using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public AuthService(UserManager<ApplicationUser> userManager, 
                       RoleManager<IdentityRole> roleManager, 
                       IConfiguration configuration, 
                       ApplicationDbContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _context = context;
    }

    public async Task<(int, string)> Registration(User newUser, string role)
    {
        var userExists = await _userManager.FindByEmailAsync(newUser.Email);
        if (userExists != null)
            return (0, "User already exists");

        ApplicationUser user = new ApplicationUser()
        {
            Email = newUser.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = newUser.Username
        };
        var result = await _userManager.CreateAsync(user, newUser.Password);
        if (!result.Succeeded)
            return (0, "User creation failed! Please check user details and try again");

        if (!await _roleManager.RoleExistsAsync(role))
            await _roleManager.CreateAsync(new IdentityRole(role));

        if (await _roleManager.RoleExistsAsync(role))
        {
            await _userManager.AddToRoleAsync(user, role);
        }

        return (1, "User created successfully!");
    }

    public async Task<(int, object)> Login(LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return (0, "Invalid email");

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
            return (0, "Invalid password");

        var userRoles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        var token = GenerateToken(authClaims);
        return (1, new { token });
    }

    private string GenerateToken(IEnumerable<Claim> claims){
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: claims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    }
}