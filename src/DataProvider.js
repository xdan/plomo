import FuzzySearch from "fuzzy-search";

const data = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
];

export class DataProvider {
    searcher = new FuzzySearch(data, [], {
        caseSensitive: false,
    });

    state = {
        gprs: true
    };

    loadData = (value) => {
        return new Promise((resolve) => {
            // GPRS
            const callback = () => {
                const result = this.searcher.search(value);
                resolve(result);
            };

            if (this.state.gprs) {
                setTimeout(callback, 500)
            } else {
                callback();
            }
        });
    };
}