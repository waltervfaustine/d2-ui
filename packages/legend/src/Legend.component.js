import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField/TextField';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Dialog from 'material-ui/Dialog/Dialog';
import { scaleLinear } from 'd3-scale';
import { precisionFixed } from 'd3-format';
import { config } from 'd2';
import { generateUid } from 'd2/uid';
import ColorScaleSelect from './ColorScaleSelect.component';
import LegendItems from './LegendItems.component';
import { legendItemStore } from './LegendItem.store';
import { Row } from '@dhis2/d2-ui-core';
import { Column } from '@dhis2/d2-ui-core';

config.i18n.strings.add('start_value');
config.i18n.strings.add('end_value');
config.i18n.strings.add('required');
config.i18n.strings.add('cancel');
config.i18n.strings.add('proceed');
config.i18n.strings.add('needs_to_be_bigger_than_start_value');
config.i18n.strings.add('are_you_sure');
config.i18n.strings.add('this_will_replace_the_current_legend_items');
config.i18n.strings.add('create_legend_items');

class Legend extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            startValue: 0,
            endValue: 100,
            warningDialogOpen: false,
            errorMessage: {},
            createLegendDisabled: false,
        };

        this.i18n = this.context.d2.i18n;
    }

    onStartValueChange = (event) => {
        this.setState({ startValue: event.target.value }, this.validateForm);
    };

    onEndValueChange = (event) => {
        this.setState({ endValue: event.target.value }, this.validateForm);
    };

    onColorScaleChange = (colorScheme) => {
        this.setState({ colorScheme });
    };

    createLegendItems = () => {
        const { startValue, endValue, colorScheme } = this.state;
        const scale = scaleLinear().domain([startValue, endValue]).rangeRound([0, colorScheme.length]);
        const step = (endValue - startValue) / colorScheme.length;
        const precision = precisionFixed(step); // https://github.com/d3/d3-format#precisionFixed

        const items = colorScheme.map((color, index) => {
            const legend = {};

            legend.id = generateUid();
            legend.startValue = scale.invert(index).toFixed(precision);
            legend.endValue = scale.invert(index + 1).toFixed(precision);
            legend.color = color;
            legend.name = `${legend.startValue} - ${legend.endValue}`;

            return legend;
        });

        this.props.onItemsChange(items);
    };

    deleteItem = (modelToDelete) => {
        const newItems = this.props.items.filter(model => model !== modelToDelete);
        this.props.onItemsChange(newItems);
    };

    updateItem = (existingItems) => {
        let updatedItems = existingItems;
        const currentItem = legendItemStore.getState() && legendItemStore.getState().model;

        // Only update if we got a valid model from getState
        if (currentItem) {
            updatedItems = [...existingItems];
            const idx = updatedItems.findIndex(item => item.id === currentItem.id);

            if (idx === -1) {
                // Add item if it's a new item
                updatedItems.push(currentItem);
            } else {
                // Replace old item with changed item
                updatedItems[idx] = currentItem;
            }
        }

        return this.props.onItemsChange(updatedItems);
    };

    // Check if end value is bigger than start value
    validateForm = () => {
        const { startValue, endValue } = this.state;

        // Check if start or end value is empty
        if (startValue === '' || endValue === '') {
            this.setState({
                errorMessage: {
                    startValue: startValue === '' ? this.i18n.getTranslation('required') : '',
                    endValue: endValue === '' ? this.i18n.getTranslation('required') : '',
                },
                createLegendDisabled: true,
            });
            return;
        }

        // Check if end value is less than start value
        if (Number(endValue) <= Number(startValue)) {
            this.setState({
                errorMessage: {
                    startValue: Number(startValue) >= Number(endValue) ? this.i18n.getTranslation('should_be_lower_than_end_value') : '',
                    endValue: Number(endValue) <= Number(startValue) ? this.i18n.getTranslation('should_be_higher_than_start_value') : '',
                },
                createLegendDisabled: true,
            });
            return;
        }

        // All OK
        this.setState({
            errorMessage: {
                startValue: '',
                endValue: '',
            },
            createLegendDisabled: false,
        });
    };

    // Display warning that current legend items will be deleted
    displayWarning = () => {
        this.setState({ warningDialogOpen: true });
    };

    handleCreateLegendsCancel = () => {
        this.setState({ warningDialogOpen: false });
    };

    handleCreateLegendsConfirm = () => {
        this.setState(
            { warningDialogOpen: false },
            () => this.createLegendItems(), // Callback for after state update
        );
    };

    render() {
        const actions = [
            <FlatButton
                label={this.i18n.getTranslation('cancel')}
                secondary
                onClick={this.handleCreateLegendsCancel}
            />,
            <FlatButton
                label={this.i18n.getTranslation('proceed')}
                primary
                onClick={this.handleCreateLegendsConfirm}
            />,
        ];

        const styles = {
            textField: {
                marginRight: 20,
                minWidth: '150px',
                flex: '1 1 auto',
            },
            errorStyle: {
                float: 'left',
            },
            button: {
                flex: '1 0 auto',
                minWidth: '150px',
                marginLeft: 20,
            },
            legendGenerator: {
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '40px',
            },
            colorScaleSelect: {
            },
        };

        return (
            <Column>
                <Row style={styles.legendGenerator}>
                    <TextField
                        type="number"
                        style={styles.textField}
                        floatingLabelText={this.i18n.getTranslation('start_value')}
                        value={this.state.startValue}
                        onChange={this.onStartValueChange}
                        errorText={this.state.errorMessage.startValue}
                        errorStyle={styles.errorStyle}
                    />
                    <TextField
                        type="number"
                        style={styles.textField}
                        floatingLabelText={this.i18n.getTranslation('end_value')}
                        value={this.state.endValue}
                        onChange={this.onEndValueChange}
                        errorText={this.state.errorMessage.endValue}
                        errorStyle={styles.errorStyle}
                    />
                    <ColorScaleSelect
                        style={styles.colorScaleSelect}
                        onChange={this.onColorScaleChange}
                    />
                    <RaisedButton
                        style={styles.button}
                        label={this.i18n.getTranslation('create_legend_items')}
                        onClick={this.displayWarning}
                        disabled={this.state.createLegendDisabled}
                    />
                </Row>
                <LegendItems
                    items={this.props.items}
                    updateItem={this.updateItem}
                    deleteItem={this.deleteItem}
                />
                <Dialog
                    title={this.i18n.getTranslation('are_you_sure')}
                    actions={actions}
                    modal={false}
                    open={this.state.warningDialogOpen}
                    onRequestClose={this.handleCreateLegendsCancel}
                    autoScrollBodyContent
                >
                    {this.i18n.getTranslation('this_will_replace_the_current_legend_items')}
                </Dialog>
            </Column>
        );
    }
}

Legend.propTypes = {
    items: PropTypes.array.isRequired,
};

Legend.contextTypes = {
    d2: PropTypes.object,
};

export default Legend;
