using System.ComponentModel.DataAnnotations;

namespace TeamSync.Data.Models
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
