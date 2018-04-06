import React, { Component } from 'react';
import Card, { CardHeader, CardText, CardMedia, CardActions } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import GoIcon from 'material-ui/svg-icons/action/code';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import OhmBottomNav from './OhmBottomNav';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import OhmColorSelector from './OhmColorSelector';

const avatarIcon = <FontIcon className="material-icons">whatshot</FontIcon>;

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    paperBorder: {
        width: '100%',
        margin: 0,
        height: 'auto',
        display: 'inline-block',
       
    }
};
const fetch = window.fetch.bind(window);
const getTheme = () => {
    let overwrites = {};
    return getMuiTheme(baseTheme, overwrites);
}

const ohmServiceEndpoint = 'http://localhost:59734/api/OhmSvc/GetOhmByColorCombo';

class OhmAppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bandSelections: [],
            colorRings: [],
            value: 0
        }
        
        this.getColorValues.bind(this);
    }

    calculateOnClick(e) {
        var colorMap = this.state.colorRings;
        var bandMap = this.state.bands;
        let bandSelections = this.state.bandSelections;

        var bandASelection = colorMap[bandSelections[0].currentSelection];
        var bandBSelection = colorMap[bandSelections[1].currentSelection];
        var bandCSelection = colorMap[bandSelections[2].currentSelection];
        var bandDSelection = colorMap[bandSelections[3].currentSelection];

        // async/sync call to ohm service
        var fd = new FormData();
        fd.append('bandAColor', bandASelection);
        fd.append('bandBColor', bandBSelection);
        fd.append('bandCColor', bandCSelection);
        fd.append('bandDColor', bandDSelection);

        return fetch('http://localhost:59734/api/OhmSvc/GetOhmByColorCombo/', {
            method: 'POST',
            body: fd,
            mode: 'cors',
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer' // *client, no-referrer
        }).then((response) => response.json())
            .then((response) => this.setState({ value: response }))
            .catch((error) => console.log(error));
    }

    getColorValues = (values) => {
        this.setState(values);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getTheme()}>
                    <Paper style={styles.paperBorder} zDepth={3} rounded={false}>
                        <Card>
                            <CardHeader style={{ background: 'linear-gradient(to right,#B0BEC5,#EEEEEE)' }} title="Ohm Calculator" subtitle="Current Ohmz" >
                                <div style={{ fontWeight: 'bold'}}>{this.state.value}Ω</div>
                                </CardHeader>
                            <CardText>
                                <OhmColorSelector boundColorvalues={this.getColorValues} />
                            </CardText>
                            <CardActions style={{ textalign: 'right', background: 'linear-gradient(to right,#B0BEC5,#EEEEEE)' }}>
                                <RaisedButton style={{ left: '9px', position: 'relative' }} primary={true} icon={<GoIcon />} label="Calculate" labelPosition="after" onClick={this.calculateOnClick.bind(this)} />
                            </CardActions>
                        </Card>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}
export default OhmAppContainer;