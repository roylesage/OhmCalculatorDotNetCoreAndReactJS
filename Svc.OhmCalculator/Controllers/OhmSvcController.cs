using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Svc.OmhCalculator.Interfaces;
using Svc.OmhCalculator.HelperUtilities;

namespace Svc.OhmCalculator.Controllers
{
    [Route("api/[controller]")]
    public class OmhSvcController : Controller
    {
        public OmhSvcController()
        {

        }


        [Route("GetOhmByColorCombo")]
        public int GetOhmByColorCombo(string bandAColor, string bandBColor, string bandCColor, string bandDColor)
        {
            OhmCalculatorHelper helper = new OhmCablculatorHelper();
            return helper.CalculateOhmValue(bandAColor, bandBColor, bandCColor, bandDColor);
        }

    }
}
