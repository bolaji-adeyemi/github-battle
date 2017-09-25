import React from 'react';
import PropTypes from 'prop-types';

var api = require('../utils/api');


// stateless compoenent
/*function SelectLanguage() {
 var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

 return(<ul className='languages'> {
 languages.map(function (lang) {
 return ( <li
 style={lang === this.props.selectedLanguage ? {color: '#d0021b'} : null}
 key={ lang }
 onClick={this.props.onSelect.bind(null, lang)}
 > { lang } </li>)
 }, this)
 } </ul>);

 }*/
function RepoGrid (props){
    return(
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return(
                    <li key={repo.name} className="popular-item">
                         <div className="popular-rank">#{index + 1} </div>
                        <ul className="space-list-items">
                           <li>
                               <img className="avatar" src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/>
                           </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
RepoGrid.PropTypes ={
    repos:PropTypes.array.isRequired
}
class SelectLanguage extends React.Component {

    render() {
        var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (<ul className='languages'> {
            languages.map(function (lang) {
                return ( <li
                    style={lang === this.props.selectedLanguage ? {color: '#d0021b'} : null}
                    key={ lang }
                    onClick={this.props.onSelect.bind(null, lang)}
                > { lang } </li>)
            }, this)
        } </ul>);
    }
}
;
SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}
class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            };l
        });
        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                });
            }.bind(this))
    };

    render() {
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage}
                                onSelect={this.updateLanguage}></SelectLanguage>
                {/*JSON.stringify(this.state.repos, null, 2)*/}
                {!this.state.repos
                    ? <p>LOADING</p>
                    :<RepoGrid repos={this.state.repos}/>               }

            </div>
        )
    }
}

module.exports = Popular;