using System;
using System.Collections.Generic;

namespace TireStoreAPI.Models
{
    public partial class Itemz
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdTire { get; set; }

        public virtual Tyres IdTireNavigation { get; set; }
        public virtual Users IdUserNavigation { get; set; }
    }
}
