using System.Data.SqlClient;
using API_REST_SP.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_REST_SP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        public readonly string con;

        public UsuariosController(IConfiguration configuration)
        {
            con = configuration.GetConnectionString("conexion");
        }

        [HttpGet]
        [Route("Lista")]
        public IEnumerable<Usuario> Get()
        {
            List<Usuario> usuarios = new();

            using (SqlConnection connection = new(con))
            {
                connection.Open();
                using (SqlCommand cmd = new("ObtenerUsuarios", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Usuario u = new Usuario
                            {
                                IdUsuario = Convert.ToInt32(reader["Id"]),
                                Login = reader["Login"].ToString(),
                                Pass = reader["Pass"].ToString(),
                                FechaCreacion = Convert.ToDateTime(reader["FechaCreacion"])
                            };

                            usuarios.Add(u);
                        }
                    }
                }
            }
            return usuarios;
        }

        [HttpPost]
        [Route("Guardar")]
        public void Post([FromBody] Usuario u)
        {
            using (SqlConnection connection = new(con))
            {
                connection.Open();
                using (SqlCommand cmd = new("InsertarUsuario", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Login", u.Login);
                    cmd.Parameters.AddWithValue("@Pass", u.Pass);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        [HttpGet()]
        [Route("Obtener")]
        public IEnumerable<Usuario> GetId(string login, string pass)
        {
            List<Usuario> usuarios = new();

            using (SqlConnection connection = new(con))
            {
                connection.Open();
                using (SqlCommand cmd = new("ObtenerUsuario", connection))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("Login", System.Data.SqlDbType.VarChar).Value = login;
                    cmd.Parameters.Add("Pass", System.Data.SqlDbType.VarChar).Value = pass;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Usuario p = new Usuario
                            {
                                Login = reader["Login"].ToString(),
                                Pass = reader["Pass"].ToString()
                            };

                            usuarios.Add(p);
                        }
                    }
                }
            }
            return usuarios;
        }

    }
}
