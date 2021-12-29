//Function to set up initial page with the dropdown list and metadata for first sample
function init(){
    let selector=d3.selectAll("#selDataset");
    //Build dropdown list
    d3.json("./static/js/samples.json").then((data)=>{
        console.log(data);
        let sampleNames=data.names;
        sampleNames.forEach(name => {
            selector.append("option")
            .property("value",name)
            .text(name)
        });
        //Data and charts for initial display
        buildMetaData(sampleNames[0]);
        buildCharts(sampleNames[0]);
    });   
}
init();

// Function to build metadata and charts when there is a change in value
function optionChanged(newSample){
    buildMetaData(newSample);
    buildCharts(newSample)
};

// Function to set up metadata
function buildMetaData(sample){
    // Extract relevant metadata for selected sample
    d3.json("./static/js/samples.json").then((data)=>{
        let metaData=data.metadata;
        let selectSample=metaData.filter(sampleObjs=>sampleObjs.id==sample);
        result=selectSample[0];
        let panel=d3.selectAll("#sample-metadata");
        panel.html("")
        Object.entries(result).forEach(([key,value])=>{
            panel.append("h6").text(key.toUpperCase()+" : "+value);
        });
    });
}
// Function to build charts
function buildCharts(sample){
    // Extract relevant metadata for selected sample
    d3.json("./static/js/samples.json").then(sdata=>{
        let samples=sdata.samples;
        let selectSample=samples.filter(sampleObj=>sampleObj.id==sample);
        let result=selectSample[0];
        let values=result.sample_values;
        let ids=result.otu_ids;
        let hoverText=result.otu_labels;
        let textArray=hoverText.map(text=>text.split(";"));
        // Formatting the hover text data to display all elements properly
        let string =textArray.map(text=> {
            str=`${text.slice(0,4)}`
            for (let i=4;i<text.length;i=i+4){
                if(text.length-i>=4){
                    str=`${str}<br>${text.slice(i,i+4)}`
                }else{
                    str=`${str}<br>${text.slice(i,)}`
                }           
            }
            return str
        })
        // Bar chart
        let barData=[{
            x:values.slice(0,11).reverse(),
            y:ids.slice(0,11).reverse().map(id=>"OTU "+id),
            type:'bar',
            orientation:'h',
            text:string.slice(0,11).reverse()
        }]
        let barLayout={
            title:"Top 10 Bacterial Cultures Found",
            yaxis:{title:"OTU ID"}, 
            height: 355,
            margin: { t: 40, b: 30 },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)'     
        }
        let barConfig={responsive:true}
        Plotly.newPlot("bar",barData,barLayout,barConfig)

        // Bubble chart
        let bubbleData=[{
            x:ids,
            y:values,
            mode:'markers',
            marker:{
                size:values,
                color:ids,
                colorscale:'Earth'
            },
            text:string,
            type:'scatter'
            
        }]
        let bubbleLayout={
            title:"Bacterials Cultures per Sample",
            xaxis:{title:"OTU ID"},
            hovermode:'closest',
            margin: { t: 40, r: 25, l: 25, b: 30 },
            paper_bgcolor:'whitesmoke',
            plot_bgcolor:'whitesmoke'
        }
        let bubbleConfig = {responsive: true}
            
        
        Plotly.newPlot("bubble",bubbleData,bubbleLayout,bubbleConfig)

        // Gauge
        let metaData=sdata.metadata;
        let selectSampleG=metaData.filter(sampleObjs=>sampleObjs.id==sample);
        wref=selectSampleG[0].wfreq;
        let gaugeData=[{
            domain: { x: [0, 1], y: [0, 1] },
            value: wref,
            title: {
                text:`<b>Belly Button Washing Frequency</b><br>Scrubs per Week`,
                font:{size:15}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge:{
                bar:{color:'black'},
                steps:[
                    {range:[0,2],color:'red'},
                    {range:[2,4],color:'orange'},
                    {range:[4,6],color:'yellow'},
                    {range:[6,8],color:'yellowgreen'},
                    {range:[8,10],color:'darkgreen'}

                ],
                axis:{range:[0,10]}
            }    
        }]
        let gaugeLayout = { 
            margin: { t: 40, b: 30,l:25,r:25 },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)' };

        let gaugeConfig={responsive:true}

        Plotly.newPlot('gauge', gaugeData, gaugeLayout,gaugeConfig);







    })
}