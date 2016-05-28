import React from 'react';
import { render } from 'react-dom';
import { init } from 'd2/lib/d2';
import HeaderBar from './HeaderBar';

export function initHeaderBar(domElement, apiLocation, config = { noSchemas: true }) {
    const d2Config = {
        ...config,
        baseUrl: apiLocation,
    };

    // Mock d2 for offline header-bar
    let d2Context = {
        currentUser: { userSettings: {} },
        i18n: { getTranslation(v) { return v; } },
    };

    const HeaderBarWithContext = React.createClass({
        childContextTypes: {
            d2: React.PropTypes.object,
        },

        getChildContext() {
            return {
                d2: d2Context,
            };
        },

        render() {
            return (
                <HeaderBar />
            );
        },
    });

    init(d2Config)
        .then((d2) => {
            d2Context = d2;

            render(<HeaderBarWithContext />, domElement);
        }, () => {
            render(<HeaderBarWithContext />, domElement);
        });
}

export default initHeaderBar;