import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";

import { filterData, searchData } from "./actions";

const toolbarStyles = () => ({
    search: {
        flex: "0 0 auto"
    },
    spacer: {
        flex: "1 1 100%"
    },
    filter: {
        flex: "0 0 auto"
    }
});

class EnhancedToolbar extends Component {
    state = {
        filterTooltipOpen: false
    };

    showFilterTooltip = () => {
        this.setState({ filterTooltipOpen: true });
    };
    hideFilterTooltip = () => {
        this.setState({ filterTooltipOpen: false });
    };

    render() {
        const {
            classes,
            createdByValue,
            searchValue,
            searchData,
            filterData
        } = this.props;

        return (
            <Toolbar>
                <TextField
                    type="search"
                    label="Search by name"
                    className={classes.search}
                    value={searchValue}
                    onChange={searchData}
                />
                <div className={classes.spacer} />
                <Tooltip
                    className={classes.filter}
                    title="Filter list"
                    open={this.state.filterTooltipOpen}
                >
                    <Select
                        disableUnderline
                        value={createdByValue}
                        onChange={filterData}
                        onMouseEnter={this.showFilterTooltip}
                        onMouseLeave={this.hideFilterTooltip}
                        MenuProps={{
                            onEnter: this.hideFilterTooltip
                        }}
                    >
                        <MenuItem value="all">Show all</MenuItem>
                        <MenuItem value="byme">Created by me</MenuItem>
                        <MenuItem value="byothers">Created by others</MenuItem>
                    </Select>
                </Tooltip>
            </Toolbar>
        );
    }
}

const mapStateToProps = state => ({
    createdByValue: state.filtering.createdByValue,
    searchValue: state.filtering.searchValue
});

const mapDispatchToProps = {
    searchData,
    filterData
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(toolbarStyles)(EnhancedToolbar));
