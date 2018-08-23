import React, { Component } from 'react';
import './ScatterPlot.css';

import * as d3 from "d3";
import * as d3SelectionMulti from "d3-selection-multi";

import ScatterPlotMenu from './ScatterPlotMenu';

class ScatterPlotGraph extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
    }
    
    componentDidMount() {
        console.log('DO WE HAVE OUR PROPS?', this.props);

        let data = this.state.data;
        let width = this.state.width;
        let height = this.state.height;
        let margin = this.state.margin;
        
        let radius = 5; //DOT SIZE

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let x = d3.scaleLinear()
        .range([0, width]);

        let y = d3.scaleLinear()
        .range([height, 0]);
        
        //LETS DRAW SOME SVGs!
        var svg = d3.select(".ScatterPlotGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        console.log('DO WE HAVE OUR DATA?', data);

        data.forEach(function(d) {
            d.Incidence = +d.Incidence; //X
            d.Mortality = +d.Mortality; //Y

            //Calculate Mortality Rate
            d.mortal = (d.Mortality / d.Incidence) * 100;

        });
        
        x.domain(d3.extent(data, function(d) { return d.Incidence; })).nice();
        y.domain(d3.extent(data, function(d) { return d.mortal; })).nice();
        
        //LETS DRAW BOTTOM OF GRAPH
        svg.append("g")
            .attr("class", "axis")
            .style("stroke-dasharray", ("3, 3"))
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                  .tickSize(-height)
                  .ticks(5)
                 )
        
            svg.append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", height + 24)
                .style("text-anchor", "end")
                .text("Breast Cancer new cases per 100,000 women");

        //LETS DRAW SIDE OF GRAPH
        svg.append("g")
            .attr("class", "axis")
            .style("stroke-dasharray", ("3, 3"))
            .call(d3.axisLeft(y)
                  .tickSize(-width)
                 )
        
            svg.append("text")
                .attr("class", "label")
                .attr("x", 6)
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "start")
                .style("font-size", "14px")
                .style("font-weight", "bold")
                .text("Breast Cancer deaths");
                
            svg.append("text")
                .attr("class", "label")
                .attr("x", 6)
                .attr("y", 20)
                .attr("dy", ".71em")
                .style("text-anchor", "start")
                .text("per 100 cases");
        
        //LETS DRAW OUR DATA ON GRAPH
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", 
                function(d) { 
                    let myCSSClass = d.HDI.toLowerCase();
                    myCSSClass = myCSSClass.replace(" ", "-");
                    return ('dot dot-' + myCSSClass + 'city'+d.Name); 
                }
            )
            .attr("r", 0)
            .attr("cx", function(d) { return x(d.Incidence); })
            .attr("cy", function(d) { return y(d.mortal); })
            .style("fill", function(d) { return color(d.HDI); })
            .attr("stroke", "white")
            .transition()
            .duration(function(d,i) { return i * 40 })
            .attr("r", radius)
//            .on("mouseover", handleMouseOver)
//            .on("mouseout", handleMouseOut);
        
        //LETS HOVER OVER CIRCLES
        function handleMouseOver(d, i) {
            var self = d3.select(this)
            console.log('HOVER ', self);

            // NEEDS AMENDING
//            svg.append("text")
//                .attrs({
//                    id: "t" + d.cx + "-" + d.cy + "-" + i, 
//                    x: 30,
//                    y: 15
//                })
//                .text(d.Name);
        }

        function handleMouseOut(d, i) {
            d3.select(this)
                .attr({fill: "black",r: radius});
            d3.select("#t" + d.cx + "-" + d.cy + "-" + i).remove();
        }
        
        //LETS MAKE A MENU
        let menuBoxW = 380;
        let menuBoxH = 260;
        var menuBoxX = width - menuBoxW;
        var menuBoxY = menuBoxY;
        svg.append("rect")
            .attr({ x: menuBoxX, y: menuBoxY, width: menuBoxW, height: menuBoxH, fill: 'white' })
        
        //LEGEND
        var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(" + i * -60 + ",0)"; });

        var rightAlign = width - 120;
        var bottomAlign = 200;

        legend.append("circle")
            .attr("r", 5)
            .attr("cx", rightAlign)
            .attr("cy", bottomAlign)
            .style("fill", color);

        legend.append("text")
            .attr("x", rightAlign + 8)
            .attr("y", bottomAlign)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d) { return d; });
        
        //LETS MAKE BUTTONS
        let buttonProps = {width: 32, height: 32, margin: 2 }
        
        let buttonsData = [
            {label: 1, width: 32},
            {label: 2, width: 32},
            {label: 3, width: 32},
            {label: 4, width: 32},
            {label: 5, width: 32},
            {label: 6, width: 32},
            {label: 'NEXT', width: 64},
        ]
        
        var buttonSpacing = buttonProps.width + buttonProps.margin;
        var buttons = svg.selectAll(".buttons")
            .data(buttonsData)
            .enter().append("g")
            .attr("class", function(d, i) {"button" + i + " buttons"})
            .attr("transform", function(d, i) { return "translate(" + (i * buttonSpacing) + ",0)"; });

        var rightAlign = width - 320;
        var bottomAlign = 10;

        var selection = 0;
        
        buttons.append("rect")
            .attr("x", rightAlign)
            .attr("y", bottomAlign)
            .attr("width", function(d) { return d.width; })
            .attr("height", buttonProps.height)
            .style("fill", '#ccc')
            .style("stroke", (d,i) => i ? selection : 'black')
            .style("stroke-width:", '5')
            .on("click", btnClick);
        
        //CLICK THE BUTTONS
        function btnClick(d, i) {
            var self = d3.select(this);
            
            selection = i;
            
            console.log(selection);
            
            d3.select(this).style("fill", '#8888ff')
                .transition()
                .style("fill", '#ccc');
            
        }

        buttons.append("text")
            .attr("x", function(d) { return rightAlign + d.width / 2; })
            .attr("y", bottomAlign+buttonProps.height/2)
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.label; });
    }

    render() {
 
        return (
            <div className="ScatterPlotMenu">
                <p>TEST</p>
                <ScatterPlotMenu data={this.state} />
            </div>
        );
    }
}

export default ScatterPlotGraph;
