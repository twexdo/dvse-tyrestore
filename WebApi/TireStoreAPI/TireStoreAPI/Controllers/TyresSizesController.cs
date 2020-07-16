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
    public class TyresSizesSizesController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public TyresSizesSizesController(tyresDBContext context)
        {
            _context = context;
        }

        //Copy
        [HttpGet, Route("GetTyresSizes")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> GetTyresSizes()
        {
            return await _context.TyresSizes.ToListAsync();
        }

        // GET: api/TyresSizes/5
        [HttpPost, Route("GetTyresSizesById")]
        public async Task<ActionResult<TyresSizes>> GetTyresSizesById([FromBody] int id)
        {
            var tyresSizes = await _context.TyresSizes.FindAsync(id);

            if (tyresSizes == null)
            {
                return NotFound();
            }

            return tyresSizes;
        }



        // DELETE: api/TyresSizes/5
        [HttpPost, Route("DeleteTyresSizesById")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> DeleteTyresSizesById([FromBody] int id)
        {
            var tyresSizes = await _context.TyresSizes.FindAsync(id);
            if (tyresSizes == null)
            {
                return NotFound();
            }

            _context.TyresSizes.Remove(tyresSizes);
            await _context.SaveChangesAsync();

            return await _context.TyresSizes.ToListAsync();
        }

        // UPDATE: api/TyresSizes/5
        [HttpPost, Route("UpdateTyre")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> UpdateTyre([FromBody] TyresSizes tyre)
        {
            _context.Entry(tyre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!TyresSizesExists(tyre.Id))
                {

                    return NotFound();

                }
                else throw;

            }

            return await _context.TyresSizes.ToListAsync();
        }

        // CREATE: api/TyresSizes/5
        [HttpPost, Route("CreateTyre")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> CreateTyre([FromBody] TyresSizes tyre)
        {
            tyre.Id = tyre.Id > 0 ? tyre.Id : _context.TyresSizes.ToList().Last().Id + 1;

            _context.TyresSizes.Add(tyre);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tyresSizes ON");

            await _context.SaveChangesAsync();


            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tyresSizes OFF");

            return await _context.TyresSizes.ToListAsync();
        }


        private bool TyresSizesExists(int id)
        {
            return _context.TyresSizes.Any(e => e.Id == id);
        }
    }
}
