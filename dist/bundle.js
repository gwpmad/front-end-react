'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Intentionally showing different ways of creating React components.
 Features React components created with:
 * React.createClass
 * ES6 class syntax
 * Functional syntax (for components that don't require a state)
*/

// Simple ES6 class
var ToDoTitle = function (_React$Component) {
    _inherits(ToDoTitle, _React$Component);

    function ToDoTitle() {
        _classCallCheck(this, ToDoTitle);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ToDoTitle).apply(this, arguments));
    }

    _createClass(ToDoTitle, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'h1',
                null,
                'Hello ',
                this.props.name,
                ', this is a simple React app!'
            );
        }
    }]);

    return ToDoTitle;
}(React.Component);

// React.createClass (probably the most common but ES6 classes are the future)


var ToDoListForm = React.createClass({
    displayName: 'ToDoListForm',

    // the component's state will be an object. This function tells React how the object will be start.
    getInitialState: function getInitialState() {
        return {
            inputValue: ''
        };
    },
    handleSubmit: function handleSubmit(e) {
        // stop the default submit form event happening
        e.preventDefault();
        // fire the callback that was passed in via props (see ToDoListApp below) with the value of the input field
        this.props.onFormSubmit(this.state.inputValue);
        // set inputValue on the state back to empty (this will empty the box too, see comment in the render function)
        this.setState({ inputValue: '' });
    },
    onChange: function onChange(e) {
        // set the component's state to the typed-in value
        this.setState({
            inputValue: e.target.value
        });
    },
    render: function render() {
        // Note how the text input's value is tied to this.state.inputValue. This means the box will empty when inputValue does.
        return React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement('input', { type: 'text', onChange: this.onChange, value: this.state.inputValue }),
            React.createElement('input', { type: 'submit', placeholder: 'Enter your ToDo here' })
        );
    }
});

// Stateless, functional component - it is passed props as its argument.
var ToDoListItem = function ToDoListItem(props) {
    return React.createElement(
        'li',
        null,
        props.children
    );
};

// Stateless, functional component. Just an algorithm - data in, markup out. No 'brain' (it doesn't carry its own data).
var ToDoList = function ToDoList(props) {
    function createToDoListItem(text) {
        return React.createElement(
            ToDoListItem,
            null,
            text
        );
    }

    return React.createElement(
        'ul',
        null,
        props.toDos.map(createToDoListItem)
    );
};

// More complex ES6 class

var ToDoListApp = function (_React$Component2) {
    _inherits(ToDoListApp, _React$Component2);

    // constructor() is a bit like the initialize method in Ruby classes.
    function ToDoListApp(props) {
        _classCallCheck(this, ToDoListApp);

        // The line below is the equivalent of getInitialState (seen in ToDoListForm).
        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ToDoListApp).call(this, props));

        _this2.state = { toDos: [] };
        // Don't ask. Explanation here: https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
        _this2.updateItems = _this2.updateItems.bind(_this2);
        return _this2;
    }

    _createClass(ToDoListApp, [{
        key: 'updateItems',
        value: function updateItems(item) {
            this.setState({
                toDos: this.state.toDos.concat([item])
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(ToDoTitle, { name: this.props.friendName }),
                React.createElement('br', null),
                React.createElement(ToDoListForm, { onFormSubmit: this.updateItems }),
                React.createElement('br', null),
                React.createElement(ToDoList, { toDos: this.state.toDos })
            );
        }
    }]);

    return ToDoListApp;
}(React.Component);

ReactDOM.render(
// Passing in the friendName prop, which is then passed down again into ToDoTitle via ToDoListApp's render method
React.createElement(ToDoListApp, { friendName: 'Friend' }), document.getElementById('content'));
