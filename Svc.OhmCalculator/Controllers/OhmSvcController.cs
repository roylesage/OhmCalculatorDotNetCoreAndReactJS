using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Svc.OhmCalculator.Interfaces;
using Svc.OhmCalculator.HelperUtilities;
using Microsoft.AspNetCore.Cors;
 

namespace Svc.OhmCalculator.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllAccess")]
    public class OhmSvcController : Controller
    {
        public OhmSvcController()
        {

        }


        [Route("GetOhmByColorCombo")]
        public int GetOhmByColorCombo(string bandAColor, string bandBColor, string bandCColor, string bandDColor)
        {
            OhmCalculatorHelper helper = new OhmCalculatorHelper();
            return helper.CalculateOhmValue(bandAColor, bandBColor, bandCColor, bandDColor);
        }

    }
}
