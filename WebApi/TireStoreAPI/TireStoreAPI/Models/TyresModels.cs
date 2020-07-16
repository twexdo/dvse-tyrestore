using System;
using System.Collections.Generic;

namespace TireStoreAPI.Models
{
    public partial class TyresModels
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public int TyreId { get; set; }

        public virtual VehicleModels Model { get; set; }
        public virtual TyresSizes Tyre { get; set; }
    }
}
