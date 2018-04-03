import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import OhmColorSelector  from './Components/OhmColorSelector';
import { Github } from 'react-color';

const title = 'Ohm Calc';


ReactDOM.render(
    <div>
        <OhmColorSelector />
    </div>, document.getElementById('app'));
