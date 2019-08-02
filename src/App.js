import React, { Component } from 'react';
import styles from './App.css';
import scss from './App.scss';
export default class App extends Component {
    componentDidMount() {
        console.log(styles);
        console.log(scss);
    }
    render() {
        return (
            <div className={styles.common}>
                I am Thor!
                <span className={scss.red}>red</span>
            </div>
        )
    }
}