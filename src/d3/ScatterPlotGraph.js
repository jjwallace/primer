import React, { Component } from 'react';
import './ScatterPlot.css';

import * as d3 from "d3";

import ScatterPlotMenu from './ScatterPlotMenu';

class ScatterPlotGraph extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
        console.log(this.state)
    }

//    componentWillMount() {
//        var svg = d3.select(".ScatterPlotGraph").append("svg")
//        
//        //LETS DRAW OUR DATA ON GRAPH
//        svg.selectAll(".dot")
//            .data(this.state.data)
//            .enter().append("circle")
//            .attr("class", "dot")
//            .style("fill", function(d) { return color(d.HDI); })
//            .attr("stroke", "white")
//            .transition()
//            .duration(function(d,i) { return i * 40 })
//            .attr("r", 5);
//
//            this.setState({ color: color.domain() })
//    }
    
    componentDidMount() {
        
        console.log('DO WE HAVE OUR PROPS?');
        console.log(this.props)

        let data = this.state.data;
        let width = this.state.width;
        let height = this.state.height;
        let margin = this.state.margin;

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

        console.log('DO WE HAVE OUR DATA?');
        console.log(data); 

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
            .attr("class", "dot")
            .attr("r", 0)
            .attr("cx", function(d) { return x(d.Incidence); })
            .attr("cy", function(d) { return y(d.mortal); })
            .style("fill", function(d) { return color(d.HDI); })
            .attr("stroke", "white")
            .transition()
            .duration(function(d,i) { return i * 40 })
            .attr("r", 5);
        
        let menuBoxW = 380;
        let menuBoxH = 260;
        var menuBoxX = width - menuBoxW;
        var menuBoxY = menuBoxY;
        svg.append("rect")
            .attr({ x: menuBoxX, y: menuBoxY, width: menuBoxW, height: menuBoxH, fill: 'white' })
        
        //LEGEND - Break out to new component
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
        
        this.setState({ legend: legend })
        
        this.setState({ color: color.domain() })
        
        console.log(this.state);
        
    }

    render() {
 
        return (
            <div className="ScatterPlotGraph">
                <ScatterPlotMenu data={this.state} />
            </div>
        );
    }
}

export default ScatterPlotGraph;
