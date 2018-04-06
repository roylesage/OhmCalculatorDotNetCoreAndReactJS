import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Colorize from 'material-ui/svg-icons/image/colorize'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;


class OhmBottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    render() {
        return (
            <div>
                <BottomNavigation selectedIndex={this.state.selectedIndex}> 
                    {this.props.children}
                </BottomNavigation>
            </div>
        );
    }
}
export default OhmBottomNav;