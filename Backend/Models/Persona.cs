namespace API_REST_SP.Models
{
    public class Persona
    {
        public int IdPersona { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? NumIdentificacion { get; set; }
        public string? Email { get; set; }
        public string? TipoIdentificacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? IdentificacionConTipo { get; set; }
        public string? NombreCompleto { get; set; }
    }
}
