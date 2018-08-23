import React, { Component } from 'react';
import './ScatterPlot.css';

import data from './data.js';

import ScatterPlotGraph from './ScatterPlotGraph';

class ScatterPlot extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};// data: '', margin: '' 
    }

    getData() {    
        let data = window.NYTG.app.data.countries;
        console.log(data);
        return data;
    }
    
    componentWillMount() {
        //LETS GET DATA
        let data = this.getData();

        //LETS DEFINE OUR SVG SIZE
        let margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        //LETS SET STATE
        this.setState({data: data, width: width, height: height, margin: margin});

        let menu = {width: 380, height: 260}
        let buttonProps = {width: 32, height: 32, margin: 2 }
    }
    
    render() {
        return (
            <div className="ScatterPlot">
                <ScatterPlotGraph data={this.state} />
            </div>
        );
    }
}

export default ScatterPlot;
