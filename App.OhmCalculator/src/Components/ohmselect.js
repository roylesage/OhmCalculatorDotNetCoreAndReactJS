import React from 'react';
import { AppBar } from 'material-ui';
class OhmColorSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            colorRings =['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violent']
        };
        render() {
            return (
                <AppBar />
            );
        }
    }
}
export default OhmColorSelector;
