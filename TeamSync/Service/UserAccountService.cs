
using Azure.Core;
using Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TeamSync.Data;
using TeamSync.Data.Models;
using TeamSync.DTOs;
using TeamSync.Helpers;
using TeamSync.Repositories.Contracts;
using TeamSync.Responses;
using Constants = TeamSync.Helpers.Constants;
using Microsoft.AspNetCore.Http;

namespace ServerLibrary.Repositories.Implementations
{
   public class UserAccountService : IUserAccount
    {
        private readonly JwtSection _jwtConfig;
        private readonly TeamSyncDbContext _teamSyncDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccountService(IOptions<JwtSection> config, TeamSyncDbContext teamSyncDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _jwtConfig = config.Value;  // Here we're storing the JwtSection object
            _teamSyncDbContext = teamSyncDbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<GeneralResponse> CreateAsync(Register user)
        {
            if (user is null) return new GeneralResponse(false, "Model is empty");

            var checkUser = await FindUserByEmail(user.Email!);
            if (checkUser != null) return new GeneralResponse(false, "User registered already");

            //Save user
            var applicationUser = await AddToDatabase(new ApplicationUser()
            {
                Fullname = user.FullName,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password)

            });

            //check, create and assign role
            var checkAdminRole = await _teamSyncDbContext.SystemRoles.FirstOrDefaultAsync(_ => _.Name!.Equals(Constants.Admin));
            if (checkAdminRole is null)
            {
                var createAdminRole = await AddToDatabase(new SystemRole() { Name = Constants.Admin });
                await AddToDatabase(new UserRole() { RoleId = createAdminRole.Id, UserId = applicationUser.Id });
                return new GeneralResponse(true, "Account created!");


            }

            var checkUserRole = await _teamSyncDbContext.SystemRoles.FirstOrDefaultAsync(_ => _.Name!.Equals(Constants.User));

            SystemRole response = new();
            if (checkUserRole is null)
            {
                response = await AddToDatabase(new SystemRole() { Name = Constants.User });
                await AddToDatabase(new UserRole() { RoleId = response.Id, UserId=applicationUser.Id });
            }
            else
            {
                await AddToDatabase(new UserRole() { RoleId = checkUserRole.Id, UserId = applicationUser.Id });

            }

            return new GeneralResponse(true, "Account created");

        }

       

        public async Task<LoginResponse> SignInAsync(Login user)
        {

            if (user is null) return new LoginResponse(false, "Model is empty");
            
            var applicationUser = await FindUserByEmail(user.Email);
            if (applicationUser is null) return new LoginResponse(false, "User not found");

            //Veryfy password
            if (!BCrypt.Net.BCrypt.Verify(user.Password, applicationUser.Password))
                return new LoginResponse(false, "Email/Password not valid");

            var getUserRole = await FindUserRole(applicationUser.Id);
            if (getUserRole is null) return new LoginResponse(false, "User role not found");


            var getRoleName = await FindeRoleName(getUserRole.RoleId);
            if (getUserRole is null) return new LoginResponse(false, "User role not found");

            string jwtToken = GenerateToken(applicationUser, getRoleName!.Name!);

            string refreshToken = GenerateRefreshToken();

            //Save tokens in a cookie
            
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(7),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None
            };
            var context = _httpContextAccessor.HttpContext;
            context.Response.Cookies.Append("AccessToken", jwtToken, cookieOptions);
            context.Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);

            //Save the refresh token to database
            var findUser = await _teamSyncDbContext.RefreshTokenInfos.FirstOrDefaultAsync(_ => _.UserId == applicationUser.Id);
            if(findUser is not null)
            {
                findUser!.Token = refreshToken;
                await _teamSyncDbContext.SaveChangesAsync();
            }
            else
            {
                await AddToDatabase(new RefreshTokenInfo() { Token = refreshToken, UserId = applicationUser.Id });
            }

            return new LoginResponse(true, "Login successfully");

        }

        private string GenerateToken(ApplicationUser user, string role)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Key!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Fullname!),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, role!)

            };

            var token = new JwtSecurityToken(

                issuer: _jwtConfig.Issuer,
                audience: _jwtConfig.Audience,
                claims: userClaims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials : credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        private async Task<UserRole>FindUserRole(int userId) =>  await _teamSyncDbContext.UserRoles.FirstOrDefaultAsync(_ => _.UserId == userId);
        private async Task<SystemRole> FindeRoleName(int roleId) => await _teamSyncDbContext.SystemRoles.FirstOrDefaultAsync(_ => _.Id == roleId);

        private static string GenerateRefreshToken() => Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));


        private async Task<ApplicationUser> FindUserByEmail(string email) =>
            await _teamSyncDbContext.ApplicationUsers.FirstOrDefaultAsync(_ => _.Email!.ToLower()!.Equals(email!.ToLower()));

        private async Task<T> AddToDatabase<T>(T model)
        {

            var result = _teamSyncDbContext.Add(model!);
            await _teamSyncDbContext.SaveChangesAsync();
            return (T)result.Entity;
        }

        public async Task<LoginResponse> RefreshTokenAsync(RefreshToken token)
        {
            if (token is null) return new LoginResponse(false, "Model is empty");

            var findToken = await _teamSyncDbContext.RefreshTokenInfos.FirstOrDefaultAsync(_ => _.Token!.Equals(token.Token));
            if (findToken is null) return new LoginResponse(false, "Refresh token is required");

            //get user details
            var user = await _teamSyncDbContext.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == findToken.UserId);
            if (user is null) return new LoginResponse(false, "Refresh token could not be generated because user not found");

            var userRole = await FindUserRole(user.Id);
            var roleName = await FindeRoleName(userRole.RoleId);
            string jwtToken = GenerateToken(user, roleName.Name!);
            string refreshToken = GenerateRefreshToken();

            var updateRefreshToken = await _teamSyncDbContext.RefreshTokenInfos.FirstOrDefaultAsync(_ => _.UserId == user.Id);
            if (updateRefreshToken is null) return new LoginResponse(false, "Refresh token could not be generated because user has not signed in");

            updateRefreshToken.Token = refreshToken;
            await _teamSyncDbContext.SaveChangesAsync();
            

            //update tokens in cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Set to true in production when using HTTPS
                SameSite = SameSiteMode.Strict,
            };
            var context = _httpContextAccessor.HttpContext;
            context.Response.Cookies.Append("AccessToken", jwtToken, cookieOptions);
            context.Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);

            return new LoginResponse(true, "Token refreshed successfully");



        }
    }
}

