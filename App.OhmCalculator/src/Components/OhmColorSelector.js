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
import { fade } from 'material-ui/utils/colorManipulator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { GridList, GridTile } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            height: 'none',
        },
        gridList: {
            display: 'flex',
            flexWrap: 'nowrap', 
            overflowX: 'auto',
        },
        titleStyle: {
            color: 'rgb(0, 188, 212)',
        },
    valueDisplay: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '30px',

        }
};


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
            colorRings: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet','Gray','White'],
            bandSelections: [{ currentSelection: 0 }, { currentSelection: 0 }, { currentSelection: 0 }, { currentSelection: 0 }]
        };
        this.props.boundColorvalues.bind(this);
    }

    // Creates a gridlist to house all components
    generateGridListItems() {
        return (
            <GridList styles={styles.gridList} cols={4}>
                {this.generateSelects()}
            </GridList>
        );
    }

    // Set 
    selectOnChangeEventHandler(selectIndex, evt, key, value) {
        var newArr = this.state.bandSelections.concat();
        newArr[selectIndex].currentSelection = value;
        this.setState({ bandSelections: newArr});
        // communicate back to parent
        this.props.boundColorvalues(this.state);
    }


    // Wraps selectitems inside a GridTile component
    generateSelects() {
        var bandLabels = this.state.brands;
        var colorPallete = this.state.colorRings; 
        
        return this.state.bands.map((b, i) =>
            <GridTile key={b} title={'Band' + b} titleBackground={colorPallete[this.state.bandSelections[i] && this.state.bandSelections[i].currentSelection] ? colorPallete[this.state.bandSelections[i].currentSelection] : 'Black'}>
                <SelectField key={b + i} onChange={this.selectOnChangeEventHandler.bind(this, i)} id={'select-band-' + b} value={this.state.bandSelections[i] && this.state.bandSelections[i].currentSelection ? this.state.bandSelections[i].currentSelection : 0 } floatingLabelText={'Band' + b}>
                    {this.generateColors(b)}
                </SelectField>
                <div style={styles.valueDisplay}>
                    {i == 2 ? 'x' + Math.pow(10, this.state.bandSelections[i].currentSelection) : (i != 3) ? this.state.bandSelections[i].currentSelection : '±%' }
                </div>
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
                {this.generateGridListItems()}
            </div>
        );
    }
}
export default OhmColorSelector;