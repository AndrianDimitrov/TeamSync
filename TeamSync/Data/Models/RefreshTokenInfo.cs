namespace TeamSync.Data.Models
{
    public class RefreshTokenInfo:BaseEntity
    {
        public string? Token { get; set; } 
        public int UserId { get; set; }



    }
}
