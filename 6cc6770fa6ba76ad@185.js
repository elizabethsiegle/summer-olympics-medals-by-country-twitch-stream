// https://observablehq.com/@elizabethsiegle/summer-olympics-medals-by-country@185
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Summer-Olympic-medals-1976-to-2008.csv",new URL("./files/c4eda584ae83b59fe8f27452036d75fb2622778b3ea17f4c58d7c8a8cf5f4875c7f830ca9fe2abe3f0cc4b0d0cbca3de284cb2ee21e0ce7f6f78208ac0efd086",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Summer Olympics medals by country`
)});
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("Summer-Olympic-medals-1976-to-2008.csv").csv()
)});
  main.variable(observer("OlympicsFile")).define("OlympicsFile", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("Summer-Olympic-medals-1976-to-2008.csv")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("arrOfCountryCodesAndMedals")).define("arrOfCountryCodesAndMedals", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("Summer-Olympic-medals-1976-to-2008.csv").text(), function(data) {
  return {
    Country_Code : data.Country_Code,
    Medal : data.Medal,
  };
})
)});
  main.variable(observer("usaArr")).define("usaArr", function(){return(
[]
)});
  main.variable(observer()).define(["arrOfCountryCodesAndMedals","usaArr"], function(arrOfCountryCodesAndMedals,usaArr){return(
arrOfCountryCodesAndMedals.forEach((i) => {
  if(i.Country_Code == "USA") {
    console.log(`USA ${i}`);
    usaArr.push(i);
  }
})
)});
  main.variable(observer()).define(["usaArr"], function(usaArr){return(
usaArr
)});
  main.variable(observer()).define(["usaArr"], function(usaArr){return(
usaArr.length
)});
  main.variable(observer("countrycodes")).define("countrycodes", function(){return(
[]
)});
  main.variable(observer()).define(["arrOfCountryCodesAndMedals","countrycodes"], function(arrOfCountryCodesAndMedals,countrycodes){return(
arrOfCountryCodesAndMedals.forEach((cc) => {
  if (countrycodes.indexOf(cc.Country_Code) < 0 && cc.Country_Code.length > 0) {
    countrycodes.push(cc.Country_Code);
  }
})
)});
  main.variable(observer()).define(["countrycodes"], function(countrycodes){return(
countrycodes
)});
  main.variable(observer("map")).define("map", function(){return(
new Object()
)});
  main.variable(observer()).define(["arrOfCountryCodesAndMedals","map"], function(arrOfCountryCodesAndMedals,map){return(
arrOfCountryCodesAndMedals.forEach((i)=> {
  if(!map.hasOwnProperty(i.Country_Code)){map[i.Country_Code] = {gold:0,silver:0,bronze:0};}
  if(i.Medal === "Gold") {
    map[i.Country_Code].gold++;
  }
  else if(i.Medal === "Silver") {
    map[i.Country_Code].silver++;
  }
  else if(i.Medal === "Bronze") {
    map[i.Country_Code].bronze++;
  }
})
)});
  main.variable(observer()).define(["map"], function(map){return(
map
)});
  return main;
}
