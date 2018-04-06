using Newtonsoft.Json;
using Svc.OhmCalculator.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using System.Threading.Tasks;
using System.IO;


namespace Svc.OhmCalculator.HelperUtilities
{
    public class OhmCalculatorHelper : IOhmValueCalculator
    {
        private List<string> allAvailableBands;

        public OhmCalculatorHelper()
        {
            allAvailableBands = new List<string> {"Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet","Gray","White" };
        }
        
        public int CalculateOhmValue(string bandAColor, string bandBColor, string bandCColor, string bandDColor)
        {   
            try
            {
                int ohm, multiplier;
                ohm = Int32.Parse(GetBandValueFromColor(bandAColor) + GetBandValueFromColor(bandBColor));
                multiplier = Int32.Parse(GetBandValueFromColor(bandCColor));
                return ohm * (int)Math.Round(Math.Pow(10, multiplier));
            }
            catch(Exception e)
            {
                return 0;
            }
            
        }

        private string GetBandValueFromColor(string color)
        {   
            int significantFigures = allAvailableBands.FindIndex(0, 
                x => x.Equals(color, StringComparison.InvariantCultureIgnoreCase));
            return significantFigures.ToString();
        }
    }
}
