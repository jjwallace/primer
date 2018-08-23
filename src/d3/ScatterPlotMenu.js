import React, { Component } from 'react';
import './ScatterPlot.css';

import * as d3 from "d3";

class ScatterPlotMenu extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
        console.log(this.state)
    }

    componentDidMount() {

//        console.log('DO WE HAVE OUR PROPS?');
//        console.log(this.state)
//
//        let data = this.props.data.data;
//        let width = this.props.data.width;
//        let height = this.props.data.height;
//        let margin = this.props.data.margin;
//
//        let color = d3.scaleOrdinal(d3.schemeCategory10);
//
//        let menuBoxW = 380;
//        let menuBoxH = 260;
//
//        let buttonProps = {width: 32, height: 32, margin: 2 }
//
//        var menuBoxX = width - menuBoxW;
//        var menuBoxY = menuBoxY;
//
//        var svg = d3.select(".ScatterPlotGraph").append("svg")
//        .attr("width", width + margin.left + margin.right)
//        .attr("height", height + margin.top + margin.bottom)
//        .append("g")
//        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//        svg.append("rect")
//            .attr({ x: menuBoxX, y: menuBoxY, width: menuBoxW, height: menuBoxH, fill: 'white' })
//
//        //LEGEND - Break out to new component
//        var legend = svg.selectAll(".legend")
//        .data(color.domain())
//        .enter().append("g")
//        .attr("class", "legend")
//        .attr("transform", function(d, i) { return "translate(" + i * -60 + ",0)"; });
//
//        var rightAlign = width - 120;
//        var bottomAlign = 200;
//
//        legend.append("circle")
//            .attr("r", 5)
//            .attr("cx", rightAlign)
//            .attr("cy", bottomAlign)
//            .style("fill", color);
//
//        legend.append("text")
//            .attr("x", rightAlign + 8)
//            .attr("y", bottomAlign)
//            .attr("dy", ".35em")
//            .style("text-anchor", "start")
//            .text(function(d) { return d; });
//
//        var buttonSpacing = buttonProps.width + buttonProps.margin;
//        var buttons = svg.selectAll(".buttons")
//        .data([1,2,3,4,5,6, 'NEXT'])
//        .enter().append("g")
//        .attr("class", "buttons")
//        .attr("transform", function(d, i) { return "translate(" + (i * buttonSpacing) + ",0)"; });
//
//        var rightAlign = width - 320;
//        var bottomAlign = 50;
//
//        buttons.append("rect")
//            .attr("x", rightAlign)
//            .attr("y", bottomAlign)
//            .attr("width", buttonProps.width)
//            .attr("height", buttonProps.height)
//            .style("fill", '#ccc');
//
//        buttons.append("text")
//            .attr("x", rightAlign+buttonProps.width/2)
//            .attr("y", bottomAlign+buttonProps.height/2)
//            .attr("dy", ".35em")
//            .style("text-anchor", "middle")
//            .text(function(d) { return d; });

    }

    render() {


        return (
            <div className="ScatterPlotGraph">


            </div>
        );
    }
}

export default ScatterPlotMenu;
