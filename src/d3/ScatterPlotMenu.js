import React, { Component } from 'react';
import './ScatterPlot.css';

import * as d3 from "d3";

class ScatterPlotMenu extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="ScatterPlotGraph">


            </div>
        );
    }
}

export default ScatterPlotMenu;
