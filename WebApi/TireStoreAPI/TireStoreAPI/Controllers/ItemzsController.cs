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
    public class ItemzsController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public ItemzsController(tyresDBContext context)
        {
            _context = context;
        }

        [HttpGet, Route("GetItemzs")]
        public async Task<ActionResult<IEnumerable<Itemz>>> GetItemzs()
        {
            return await _context.Itemz.ToListAsync();
        }

        // GET: api/Itemzs/5
        [HttpPost, Route("GetItemzsById")]
        public async Task<ActionResult<Itemz>> GetItemzsById([FromBody] int id)
        {
            var itemzs = await _context.Itemz.FindAsync(id);

            if (itemzs == null)
            {
                return NotFound();
            }

            return itemzs;
        }



        // DELETE: api/Itemzs/5
        [HttpPost, Route("DeleteItemzsById")]
        public async Task<ActionResult<IEnumerable<Itemz>>> DeleteItemzsById([FromBody] int id)
        {
            var itemzs = await _context.Itemz.FindAsync(id);
            if (itemzs == null)
            {
                return NotFound();
            }

            _context.Itemz.Remove(itemzs);
            await _context.SaveChangesAsync();

            return await _context.Itemz.ToListAsync();
        }

        // UPDATE: api/Itemzs/5
        [HttpPost, Route("UpdateItemz")]
        public async Task<ActionResult<IEnumerable<Itemz>>> UpdateItemz([FromBody] Itemz itemz)
        {
            _context.Entry(itemz).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!ItemzExists(itemz.Id))
                {

                    return NotFound();

                }
                else throw;

            }

            return await _context.Itemz.ToListAsync();
        }

        // CREATE: api/Itemzs/5
        [HttpPost, Route("CreateItemz")]
        public async Task<ActionResult<IEnumerable<Itemz>>> CreateItemz([FromBody] Itemz itemz)
        {
            itemz.Id = itemz.Id > 0 ? itemz.Id : _context.Itemz.ToList().Last().Id + 1;

            _context.Itemz.Add(itemz);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  itemzs ON");

            await _context.SaveChangesAsync();


            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  itemzs OFF");

            return await _context.Itemz.ToListAsync();
        }

        private bool ItemzExists(int id)
        {
            return _context.Itemz.Any(e => e.Id == id);
        }
    }
}
