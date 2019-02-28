import { colors } from '../colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        height: '534px',
        width: '278px',
        position: 'relative',
    },
    subTitleContainer: {
        borderBottom: `1px solid ${colors.greyLight}`,
        height: '42px',
    },
    subTitleText: {
        position: 'relative',
        fontFamily: 'Roboto',
        color: colors.black,
        fontSize: '15px',
        fontWeight: '500',
        height: '20px',
        top: '12px',
        left: '8px',
    },
    list: {
        userSelect: 'none',
        listStyle: 'none',
        overflowY: 'scroll',
        height: '455px',
        paddingLeft: '0px',
        margin: '0px',
    },
    deselectButton: {
        margin: '0 auto',
        display: 'block',
    },
    listItem: {
        display: 'flex',
        margin: '2px',
    },
    unassignButton: {
        position: 'absolute',
        left: '-48px',
        top: '291px'
    }
};