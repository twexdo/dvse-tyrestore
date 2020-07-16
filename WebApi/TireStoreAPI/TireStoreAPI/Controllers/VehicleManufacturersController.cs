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
    public class VehicleManufacturersController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public VehicleManufacturersController(tyresDBContext context)
        {
            _context = context;
        }

        //Copy
  [HttpGet,Route("GetVehicleManufacturers")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> GetVehicleManufacturers()
        {
            return await _context.VehicleManufacturers.ToListAsync();
        }

        // GET: api/VehicleManufacturers/5
        [HttpPost,Route ("GetVehicleManufacturersById")]
        public async Task<ActionResult<VehicleManufacturers>> GetVehicleManufacturersById([FromBody] int id)
        {
            var vehicleManufacturers = await _context.VehicleManufacturers.FindAsync(id);

            if (vehicleManufacturers == null)
            {
                return NotFound();
            }

            return vehicleManufacturers;
        }

    

        // DELETE: api/VehicleManufacturers/5
        [HttpPost,Route("DeleteVehicleManufacturersById")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> DeleteVehicleManufacturersById([FromBody] int id)
        {
            var vehicleManufacturers = await _context.VehicleManufacturers.FindAsync(id);
            if (vehicleManufacturers == null)
            {
                return NotFound();
            }

            _context.VehicleManufacturers.Remove(vehicleManufacturers);
            await _context.SaveChangesAsync();

            return await _context.VehicleManufacturers.ToListAsync();
        }

        // UPDATE: api/VehicleManufacturers/5
        [HttpPost, Route("UpdateVehicleManufacturer")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> UpdateVehicleManufacturer([FromBody] VehicleManufacturers vehicleManufacturer)
        {
            _context.Entry(vehicleManufacturer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {

                if (!VehicleManufacturersExists(vehicleManufacturer.Id))
                {

                    return NotFound();

                }
                else throw;
            
            }
            
            return await _context.VehicleManufacturers.ToListAsync();
        }

        // CREATE: api/VehicleManufacturers/5
        [HttpPost, Route("CreateVehicleManufacturer")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> CreateVehicleManufacturer([FromBody] VehicleManufacturers vehicleManufacturer)
        {
            vehicleManufacturer.Id = vehicleManufacturer.Id > 0 ? vehicleManufacturer.Id : _context.VehicleManufacturers.ToList().Last().Id + 1;

            _context.VehicleManufacturers.Add(vehicleManufacturer);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  vehicleManufacturers ON");

            await _context.SaveChangesAsync();


            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  vehicleManufacturers OFF");

            return await _context.VehicleManufacturers.ToListAsync();
        }

        private bool VehicleManufacturersExists(int id)
        {
            return _context.VehicleManufacturers.Any(e => e.Id == id);
        }
    }
}
