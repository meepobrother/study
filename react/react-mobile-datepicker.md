# install
```
npm install react-mobile-datepicker --save
```

# Import what you need
```javascript
import  React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-mobile-datepicker';
```

# Usage Example
```javascript
class App extends React.Component {
    state = {
        time: new Date(),
        isOpen: false,
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleSelect = (time) => {
        this.setState({ time, isOpen: false });
    }

    render() {
        return (
            <div className="App">
                <a
                    className="select-btn"
                    onClick={this.handleClick}>
                    select time
                </a>
                <p className="select-time ">
                    {this.state.time}
                </p>

                <DatePicker
                    date={this.state.time}
                    isOpen={this.state.isOpen}
                    onSelect={this.handleSelect} />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('react-box'));
```


