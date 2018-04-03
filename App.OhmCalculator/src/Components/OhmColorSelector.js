import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card, { CardHeader,CardText, CardMedia, CardActions } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton'; 
import RaisedButton from 'material-ui/RaisedButton';
import GoIcon from 'material-ui/svg-icons/action/code';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { GridList, GridTile } from 'material-ui/GridList';
import { CircularProgress } from 'material-ui/CircularProgress';

const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        gridList: {
            display: 'flex',
            flexWrap: 'nowrap', 
            overflowX: 'auto',
        },
        titleStyle: {
            color: 'rgb(0, 188, 212)',
        }
};


const ohmServiceEndpoint = 'http://localhost:59734/api/OhmSvc/GetOhmByColorCombo';

const getTheme = () => {
    let overwrites = {};
    return getMuiTheme(baseTheme, overwrites);
}

class OhmColorSelector extends Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            value: null,
            bands: ['A', 'B', 'C', 'D'],
            colorRings: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet'],
            bandSelections: [{ currentSelection: 0 }, { currentSelection: 0 }, { currentSelection: 0 }, { currentSelection: 0 }]
        };
    }
    // Creates a gridlist to house all components
    generateGridListItems() {
        return (
            <GridList styles={styles.gridList} cols={4}>
                {this.generateSelects()}
            </GridList>
        );
    }

    // Set the state to match the selection color pick
    selectOnChangeEventHandler = (evt, index, value) => {
        
    }

    // Callout to .NET Core Webservice to perform the calculation
    // Server must be started prior to making this call
    calculateHandler() {
        var colorMap = this.state.colorRings;
        var bandMap = this.state.bands;

        var bandASelection = colorMap[bandSelections[0].currentSelection];
        var bandBSelection = colorMap[bandSelections[1].currentSelection];
        var bandCSelection = colorMap[bandSelections[2].currentSelection];
        var bandDSelection = colorMap[bandSelections[3].currentSelection];
        // async/sync call to ohm service
        return fetch(ohmServiceEndpoint, {
            body: {
                bandAColor: bandASelection,
                bandBColor: bandBSelection,
                bandCColor: bandCSelection,
                bandDColor: banDBSelection
            },
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => console.log('Success:', resp))
            .catch(error => console.error('Failure:', error));
    }

    // Wraps selectitems inside a GridTile component
    generateSelects() {
        var bandLabels = this.state.brands;
        var currentValue = this.state.bandValues;
        var colorPallete = this.state.colorRings; 
        
        
        return this.state.bands.map((b, i) =>
            <GridTile key={b} title={'Band' + b} titleBackground={colorPallete[this.state.bandSelections[i].currentSelection]}>
                <SelectField key={b + i} onChange={this.selectOnChangeEventHandler} id={'select-band-' + b} value={this.state.bandSelections[i].currentSelection} floatingLabelText={'Band' + b}>
                    {this.generateColors(b)}
                </SelectField>
             </GridTile>
        );
    }

    // Iterates through all colors making the selecitems for each list
    generateColors(b) {
        var colors = this.state.colorRings;
        var bands = this.state.bands;
           
        return colors.map((c, i) =>
        {   
            return <MenuItem id={b + '-' + c} key={c + i} primaryText={c} value={i}  />
        });
    }
    // Write it to the Dom
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getTheme()}>
                    <Card>
                        <CardHeader title="Ohm Calculator" subtitle="Code Challenge" />
                        <CardText>
                            {this.generateGridListItems()}
                        </CardText>
                        <CardActions>
                            <RaisedButton primary={true} icon={<GoIcon />} label="Calculate" labelPosition="after" onClick={this.calculateOhm} />
                        </CardActions>
                        
                    </Card>
                </MuiThemeProvider>
            </div>
        );
    }
}
export default OhmColorSelector;