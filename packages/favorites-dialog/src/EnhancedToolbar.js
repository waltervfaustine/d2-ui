import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import { filterData, searchData } from './actions';

const toolbarStyles = () => ({
    search: {
        flex: '0 0 auto',
    },
    spacer: {
        flex: '1 1 100%',
    },
});

let EnhancedToolbar = props => {
    const {
        classes,
        createdByValue,
        searchValue,
        searchData,
        filterData,
    } = props;

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
            <Tooltip title="Filter list">
                <Select
                    disableUnderline={true}
                    value={createdByValue}
                    onChange={filterData}
                >
                    <MenuItem value="all">Show all</MenuItem>
                    <MenuItem value="byme">Created by me</MenuItem>
                    <MenuItem value="byothers">Created by others</MenuItem>
                </Select>
            </Tooltip>
        </Toolbar>
    );
};

EnhancedToolbar = withStyles(toolbarStyles)(EnhancedToolbar);

const mapStateToProps = state => ({
    createdByValue: state.filtering.createdByValue,
    searchValue: state.filtering.searchValue,
});

const mapDispatchToProps = {
    searchData,
    filterData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedToolbar);
