const React = require('react');
const PropTypes = require('prop-types');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
      const value = event.target.value;

      this.setState(() => ({ username:value }))
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }
    render() {
        const { username } = this.state;
        const { label } = this.props;
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    { label }
                </label>
                <input id='username'
                       placeholder='github username'
                       autoComplete="off"
                       type="text"
                       value={ username }
                       onChange={this.handleChange}
                />
                <button className="button"
                        type="submit"
                        disabled={ !username }
                >Submit</button>
            </form>
        )
    }
}
PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}
module.exports = PlayerInput;