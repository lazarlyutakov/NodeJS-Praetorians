class Item {
    constructor(title, content) {
        this._title = title;
        this._content = content;
    }
    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get id() {
        return this._id;
    }

    static isValid(model) {
        return true;
        // return typeof model !== 'undefined' &&
        //     typeof model.text === 'string' &&
        //     model.text.length > 3;
    }

    static toViewModel(model) {
        const viewModel = new Item();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Item;
