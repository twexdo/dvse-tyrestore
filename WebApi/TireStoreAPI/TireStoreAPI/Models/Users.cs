using System;
using System.Collections.Generic;

namespace TireStoreAPI.Models
{
    public partial class Users
    {
        public Users()
        {
            Itemz = new HashSet<Itemz>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Itemz> Itemz { get; set; }
    }
}
