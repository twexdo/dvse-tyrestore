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
    public class TyresController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public TyresController(tyresDBContext context)
        {
            _context = context;
        }

          
        [HttpGet,Route("GetTyres")]
        public async Task<ActionResult<IEnumerable<Tyres>>> GetTyres()
        {
            return await _context.Tyres.ToListAsync();
        }

        // GET: api/Tyres/5
        [HttpPost,Route ("GetTyresById")]
        public async Task<ActionResult<Tyres>> GetTyresById([FromBody] int id)
        {
            var tyres = await _context.Tyres.FindAsync(id);

            if (tyres == null)
            {
                return NotFound();
            }

            return tyres;
        }

        // PUT: api/Tyres/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTyres(int id, Tyres tyres)
        {
            if (id != tyres.Id)
            {
                return BadRequest();
            }

            _context.Entry(tyres).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TyresExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tyres
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Tyres>> PostTyres(Tyres tyres)
        {
            _context.Tyres.Add(tyres);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTyres", new { id = tyres.Id }, tyres);
        }

        // DELETE: api/Tyres/5
        [HttpPost,Route("DeleteTyresById")]
        public async Task<ActionResult<IEnumerable<Tyres>>> DeleteTyresById([FromBody] int id)
        {
            var tyres = await _context.Tyres.FindAsync(id);
            if (tyres == null)
            {
                return NotFound();
            }

            _context.Tyres.Remove(tyres);
            await _context.SaveChangesAsync();

            return await _context.Tyres.ToListAsync();
        }

        // UPDATE: api/Tyres/5
        [HttpPost, Route("UpdateTyre")]
        public async Task<ActionResult<IEnumerable<Tyres>>> UpdateTyre([FromBody] Tyres tyre)
        {
            _context.Entry(tyre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {

                if (!TyresExists(tyre.Id))
                {

                    return NotFound();

                }
                else throw;
            
            }
            
            return await _context.Tyres.ToListAsync();
        }

        // CREATE: api/Tyres/5
        [HttpPost, Route("CreateTyre")]
        public async Task<ActionResult<IEnumerable<Tyres>>> CreateTyre([FromBody] Tyres tyre)
        {
            tyre.Id = tyre.Id > 0 ? tyre.Id : _context.Tyres.ToList().Last().Id + 1;

            _context.Tyres.Add(tyre);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tyres ON");

            await _context.SaveChangesAsync();


            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tyres OFF");

            return await _context.Tyres.ToListAsync();
        }


        // ADDTOBASKET: api/Tyres/5
        [HttpPost, Route("AddTyreToBasket")]
        public async Task<ActionResult<IEnumerable<Tyres>>> AddTyreToBasket  ([FromBody] IEnumerable<Tyres> tyresList)
        {

            foreach (var tyre in tyresList) {

                if (!UpdateStock(tyre))
                    return BadRequest(ModelState);
            }
          
            await _context.SaveChangesAsync();


          

            return await _context.Tyres.ToListAsync();
        }



        private bool UpdateStock(Tyres tyres) {

            var updatedTyres = _context.Tyres.ToList().FirstOrDefault(x => x.Id == tyres.Id);

                if (updatedTyres.Stock >= tyres.Stock) {
                updatedTyres.Stock = updatedTyres.Stock - tyres.Stock;
                }
            return true;
        }



        private bool TyresExists(int id)
        {
            return _context.Tyres.Any(e => e.Id == id);
        }
    }
}
