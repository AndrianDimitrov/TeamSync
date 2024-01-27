using System.ComponentModel.DataAnnotations;


namespace TeamSync.DTOs
{
    public class Register: AccountBase
    { 
        [Required]
        [MinLength(5)]
        [MaxLength(100)]

        public string? FullName { get; set; }  



    }
}
