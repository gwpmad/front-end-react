/** Intentionally showing different ways of creating React components.
 Features React components created with:
 * React.createClass()
 * ES6 class syntax
 * Functional syntax (for components that don't require a state)
*/

/**
Here we are creating a new component that can be reused as many times as we want. Instead of (say) <div> or <h1>,
when we want to use this component we will use <ToDoTitle>.
The 'props' object (used in render()'s return statement) will be defined by the properties we drop in when we use the component,
e.g. <ToDoTitle name="George" /> 
*/
// Simple ES6 class
class ToDoTitle extends React.Component {
    // The render() function defines the actual rendered output of the class.
    render() {
        return <h1>Hello {this.props.name}, this is a simple React app!</h1>;
    }
}

// React.createClass() (probably the most common syntax but ES6 classes and functional components are the future)
const ToDoListForm = React.createClass({
    // The component's state will be an object literal. This function declares what it will start as (when the component is rendered).
    getInitialState: function() {
        return {
            inputValue: '',
        };
    },
    handleSubmit: function(e) {
        // Stop the default submit form event happening
        e.preventDefault();
        // Fire the callback that was passed in via props (see ToDoListApp below) with the value of the input field
        this.props.onFormSubmit(this.state.inputValue);
        // Set inputValue on the state back to empty (this will empty the box too, see comment in the render function)
        this.setState({inputValue: ''});
        // Focus back upon the form input. This uses the handy refs object (accessed via 'ref=textInput' in the component's render function)
        this.refs.textInput.focus();
    },
    onChange: function(e) {
        // set the component's state to the typed-in value
        this.setState({
            inputValue: e.target.value
        });
    },
    // Like in the ES6 class, a render() function is required. 
    render: function() {
        // Note how the text input's value is tied to this.state.inputValue. This means the box will empty when inputValue does.
        // Also note the setting of 'ref="textInput"' - this is used in handleSubmit above to refocus after form submission.
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.onChange} value={this.state.inputValue} ref="textInput" placeholder="Enter your to-do here"/>
                <input type="submit" />
            </form>
        );
    }
});

// Stateless, functional component - it is passed props as its argument. Essentially one big render() function.
const ToDoListItem = function(props) {
    return(
        // The children property is always present in props. It contains anything put between the opening and closing tags when the class is called.
        <li>{props.children}</li>
    );
}

// Stateless, functional component. Just an algorithm - data in, markup out. No 'brain' (it doesn't carry its own data).
const ToDoList = function(props) {
    /**
     Below we map the array of to-dos (which comes from ToDoListApp's state - see that class's constructor() function)
     into an array of <li> items instead!
     For instance, we might turn
        ['First to-do', 'Second to-do', 'Third to-do']
     into
        <li>First to-do</li>
        <li>Second to-do</li>
        <li>Third to-do</li>
    */
    function createToDoListItem(text) {
        return <ToDoListItem>{text}</ToDoListItem>;
    }
    return (
        <ul>
            {props.toDos.map(createToDoListItem)}
        </ul>
        );
}

// More complex ES6 class, which utilises three of the other React classes, bringing the app together.
class ToDoListApp extends React.Component {
    // constructor() is a bit like the initialize method in Ruby classes.
    constructor(props) {
        // Always required. Calls the constructor of the parent class, React.Component.
        super(props);
        // The line below is the ES6 class equivalent of getInitialState() (seen in ToDoListForm).
        this.state = { toDos: [] };
        // Don't ask. Explanation here: https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
        this.updateItems = this.updateItems.bind(this);
    }

    updateItems(item) {
        // setState() gives the state a new value. In this case, we add a new to-do to the toDos array.
        this.setState({
            toDos: this.state.toDos.concat([item]) // could also write the following instead, using ES6 Array spread operator: toDos: [...this.state.toDos, item]
        });
    }

    render () {
        return (
            <div>
                <ToDoTitle name={this.props.friendName} />
                <br />
                <ToDoListForm onFormSubmit={this.updateItems} />
                <ToDoList toDos={this.state.toDos} />
            </div>
        )
    }
}

// Finally we render the main component. The first argument is the class to render, and the second argument is the DOM target where we wish to render it.
ReactDOM.render(
    // Passing in the friendName prop, which is then passed down again into ToDoTitle via ToDoListApp's render method.
    <ToDoListApp friendName="[friend name here]" />,
    document.getElementById('content')
);
