using System.Data.SqlClient;
using API_REST_SP.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_REST_SP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonasController : ControllerBase
    {
        public readonly string con;

        public PersonasController(IConfiguration configuration)
        {
            con = configuration.GetConnectionString("conexion");
        }

        [HttpGet]
        [Route("Lista")]
        public IEnumerable<Persona> Get()
        {
            List<Persona> personas = new();

            using (SqlConnection connection = new(con))
            {
                connection.Open();
                using (SqlCommand cmd = new("ObtenerPersonas", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Persona p = new Persona
                            {
                                IdPersona = Convert.ToInt32(reader["Id"]),
                                Nombres = reader["Nombres"].ToString(),
                                Apellidos = reader["Apellidos"].ToString(),
                                NumIdentificacion = reader["NumIdentificacion"].ToString(),
                                Email = reader["Email"].ToString(),
                                TipoIdentificacion = reader["TipoIdentificacion"].ToString(),                                
                                FechaCreacion = Convert.ToDateTime(reader["FechaCreacion"]),
                                IdentificacionConTipo = reader["IdentificacionConTipo"].ToString(),
                                NombreCompleto = reader["NombreCompleto"].ToString()
                            };

                            personas.Add(p);
                        }
                    }
                }
            }
            return personas;
        }

        [HttpPost]
        [Route("Guardar")]
        public void Post([FromBody] Persona p)
        {
            using (SqlConnection connection = new(con))
            {
                connection.Open();
                using (SqlCommand cmd = new("InsertarPersona", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Nombres", p.Nombres);
                    cmd.Parameters.AddWithValue("@Apellidos", p.Apellidos);
                    cmd.Parameters.AddWithValue("@NumIdentificacion", p.NumIdentificacion);
                    cmd.Parameters.AddWithValue("@Email", p.Email);
                    cmd.Parameters.AddWithValue("@TipoIdentificacion", p.TipoIdentificacion);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
