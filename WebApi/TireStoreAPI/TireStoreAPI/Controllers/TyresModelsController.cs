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
    public class TyresModelsModelsController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public TyresModelsModelsController(tyresDBContext context)
        {
            _context = context;
        }


        //Copy

        [HttpGet, Route("GetTyresModels")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> GetTyresModels()
        {
            return await _context.TyresModels.ToListAsync();
        }

        // GET: api/TyresModels/5
        [HttpPost, Route("GetTyresModelsById")]
        public async Task<ActionResult<TyresModels>> GetTyresModelsById([FromBody] int id)
        {
            var tyresModels = await _context.TyresModels.FindAsync(id);

            if (tyresModels == null)
            {
                return NotFound();
            }

            return tyresModels;
        }



        // DELETE: api/TyresModels/5
        [HttpPost, Route("DeleteTyresModelsById")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> DeleteTyresModelsById([FromBody] int id)
        {
            var tyresModels = await _context.TyresModels.FindAsync(id);
            if (tyresModels == null)
            {
                return NotFound();
            }

            _context.TyresModels.Remove(tyresModels);
            await _context.SaveChangesAsync();

            return await _context.TyresModels.ToListAsync();
        }

        // UPDATE: api/TyresModels/5
        [HttpPost, Route("UpdateTyresModel")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> UpdateTyresModel([FromBody] TyresModels tyresModel)
        {
            _context.Entry(tyresModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!TyresModelsExists(tyresModel.Id))
                {

                    return NotFound();

                }
                else throw;

            }

            return await _context.TyresModels.ToListAsync();
        }

        // CREATE: api/TyresModels/5
        [HttpPost, Route("CreateTyresModel")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> CreateTyresModel([FromBody] TyresModels tyresModel)
        {
            tyresModel.Id = tyresModel.Id > 0 ? tyresModel.Id : _context.TyresModels.ToList().Last().Id + 1;

            _context.TyresModels.Add(tyresModel);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tyresModels ON");

            await _context.SaveChangesAsync();


            _context.Database.ExecuteSqlCommand("SET  IDENTITY_INSERT  tyresModels OFF");

            return await _context.TyresModels.ToListAsync();
        }

        private bool TyresModelsExists(int id)
        {
            return _context.TyresModels.Any(e => e.Id == id);
        }
    }
}
