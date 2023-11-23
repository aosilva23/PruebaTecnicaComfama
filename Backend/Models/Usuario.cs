namespace API_REST_SP.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string? Login { get; set; }
        public string? Pass { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
