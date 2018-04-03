using Newtonsoft.Json;
using Svc.OmhCalculator.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using System.Threading.Tasks;
using System.IO;


namespace Svc.OmhCalculator.HelperUtilities
{
    public class OhmCalculatorHelper : IOhmValueCalculator
    {
        private List<Band> allAvailableBands;

        public OhmCalculatorHelper()
        {
            allAvailableBands = GetBands();
        }
        
        public int CalculateOhmValue(string bandAColor, string bandBColor, string bandCColor, string bandDColor)
        {
            int ohm = int.Parse(GetBandValueFromColor(bandAColor) + GetBandValueFromColor(bandBColor));
            int multiplier = int.Parse(GetBandValueFromColor(bandCColor));
            return ohm * (int)Math.Round(Math.Pow(10, multiplier));
        }

        private string GetBandValueFromColor(string color)
        {
            int counter = 0;
            int significantFigures = allAvailableBands.FindIndex(0, counter, 
                x => x.Color.Equals(color, StringComparison.InvariantCultureIgnoreCase));
            return significantFigures.ToString();
        }

        private List<Band> GetBands()
        {   
            using (System.IO.StreamReader f = File.OpenText(@"C:\something.json"))
            {   
                return (List<Band>) new JsonSerializer().Deserialize(f, typeof(List<Band>));
            }
        }

        public class Band
        {
            public string Color { get; set; }
            public int Val { get; set; }
            public int Multiplier { get; set; }

            public Band(string passedColor, int passedVal, int passedMultiplier)
            {
                this.Color = passedColor;
                this.Val = passedVal;
                this.Multiplier = passedMultiplier;
            }
        }

        
        
    }
}
