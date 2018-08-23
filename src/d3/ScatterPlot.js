import React, { Component } from 'react';
import './ScatterPlot.css';

import * as d3 from "d3";

import data from './data.js';

class ScatterPlot extends Component {
    
    constructor(props) {
        super(props);
        //this.state = {  };
    }

    getData() {    
        let data = window.NYTG.app.data.countries;
        console.log(data);
        return data;
    }
    
    componentDidMount() {
        console.log(this.getData());
        
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        
        var svg = d3.select(".ScatterPlot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("circle")
            .attr("class", "dot")
            .attr("r", 7)
            .attr("cx", 303)
            .attr("cy", 30)
            .style("fill", 'red')
        
        console.log(svg)
        
    }
    
    render() {
        return (
            <div className="ScatterPlot">
               
            
            </div>
        );
    }
}

export default ScatterPlot;
