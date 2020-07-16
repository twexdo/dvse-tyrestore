using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TireStoreAPI.Models;

namespace TireStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleModelsController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public VehicleModelsController(tyresDBContext context)
        {
            _context = context;
        }

        //Copy 
        [HttpGet, Route("GetVehicleModels")]
        public async Task<ActionResult<IEnumerable<VehicleModels>>> GetVehicleModels()
        {
            return await _context.VehicleModels.ToListAsync();
        }

        // GET: api/VehicleModels/5
        [HttpPost, Route("GetVehicleModelsById")]
        public async Task<ActionResult<VehicleModels>> GetVehicleModelsById([FromBody] int id)
        {
            var tehicleModels = await _context.VehicleModels.FindAsync(id);

            if (tehicleModels == null)
            {
                return NotFound();
            }

            return tehicleModels;
        }



        // DELETE: api/VehicleModels/5
        [HttpPost, Route("DeleteVehicleModelsById")]
        public async Task<ActionResult<IEnumerable<VehicleModels>>> DeleteVehicleModelsById([FromBody] int id)
        {
            var tehicleModels = await _context.VehicleModels.FindAsync(id);
            if (tehicleModels == null)
            {
                return NotFound();
            }

            _context.VehicleModels.Remove(tehicleModels);
            await _context.SaveChangesAsync();

            return await _context.VehicleModels.ToListAsync();
        }

        // UPDATE: api/VehicleModels/5
        [HttpPost, Route("UpdateVehicleModel")]
        public async Task<ActionResult<IEnumerable<VehicleModels>>> UpdateVehicleModel([FromBody] VehicleModels tehicleModel)
        {
            _context.Entry(tehicleModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!VehicleModelsExists(tehicleModel.Id))
                {

                    return NotFound();

                }
                else throw;

            }

            return await _context.VehicleModels.ToListAsync();
        }

        // CREATE: api/VehicleModels/5
        [HttpPost, Route("CreateVehicleModel")]
        public async Task<ActionResult<IEnumerable<VehicleModels>>> CreateVehicleModel([FromBody] VehicleModels tehicleModel)
        {
            tehicleModel.Id = tehicleModel.Id > 0 ? tehicleModel.Id : _context.VehicleModels.ToList().Last().Id + 1;

            _context.VehicleModels.Add(tehicleModel);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tehicleModels ON");

            await _context.SaveChangesAsync();


            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tehicleModels OFF");

            return await _context.VehicleModels.ToListAsync();
        }


        private bool VehicleModelsExists(int id)
        {
            return _context.VehicleModels.Any(e => e.Id == id);
        }
    }
}
