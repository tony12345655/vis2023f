function _1(md){return(
md`# HW2 Strong baseline(2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data@1.json").json()
)}

function _new_data(){return(
[]
)}

function _4(new_data,data)
{
  const constellation = {0: "牡羊座", 1: "金牛座", 2: "雙子座", 3: "巨蟹座", 4: "獅子座", 5: "處女座", 6: "天秤座", 7: "天蠍座", 8: "射手座", 9: "摩羯座", 10: "水瓶座", 11: "雙魚座"}
  Object.values(constellation).forEach((item) => {
    new_data.push({constellation: item, gender: "male", count: 0})
    new_data.push({constellation: item, gender: "female", count: 0})
  })

  data.forEach((item) => {
    const index = item.Constellation * 2
    if (item.Gender == "男")
      new_data[index].count += 1
    else
      new_data[index + 1].count += 1
  })
  
  return new_data
}


function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _constellation(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _7(Plot,plot1,constellation,new_data){return(
Plot.plot({
  marginTop: plot1.mt,
  marginRight: plot1.mr,
  marginBottom: plot1.mb,
  marginLeft: plot1.ml,
  
  grid: true,
  y: {label: "count"},
  x: {label: "constellation", domain: constellation},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(new_data, {x: "constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _8(Plot,plot1,data,constellation){return(
Plot.plot({
  width:800,
	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,   
	y: {grid: true, label: "count"},
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),
    Plot.axisX({tickFormat: i => {return constellation[i]}}),
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data@1.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("new_data")).define("new_data", _new_data);
  main.variable(observer()).define(["new_data","data"], _4);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer("constellation")).define("constellation", _constellation);
  main.variable(observer()).define(["Plot","plot1","constellation","new_data"], _7);
  main.variable(observer()).define(["Plot","plot1","data","constellation"], _8);
  return main;
}
