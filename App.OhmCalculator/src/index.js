import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import OhmColorSelector from './Components/OhmColorSelector';
import OhmAppContainer from './Components/OhmAppContainer';
import { Github } from 'react-color';

ReactDOM.render(
    <div>
        <OhmAppContainer></OhmAppContainer>
    </div>, document.getElementById('app'));
