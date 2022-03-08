if(localStorage.getItem('user')) {
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<CreateUser />, document.getElementById('root'));
}