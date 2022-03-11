import React from 'react';
import './App.css';
import './Visualizer.css';
import Button from '@mui/material/Button';

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            barC: [], // blue, red, green
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray = () => {
        let list = [];
        let color = [];

        let barCount = Math.floor((window.innerWidth-150)/10)
        let maxHeight = Math.floor((window.innerHeight-150))

        for (let i = 0; i < barCount; i++) {
            list.push(this.randomNumber(5, maxHeight))
            color.push("blue")
        }
        this.setState({
            array: list,
            barC: color,
        });
    }

    

    bubbleSort = async () => {
        let list = this.state.array;
        let colors = this.state.barC;
        let j=0;
        let swaps = 0;
        let n = list.length
        for (let i = 0; i < n - 1; i++) {
            swaps=0;
            for (j = 0; j < n-i-1; j++) {
                colors[j] = "red";
                colors[j+1] = "red";
                this.setState({
                    barC: colors,
                })
                if (list[j] > list[j+1]) {
                    let tmp = list[j];
                    list[j] = list[j+1];
                    list[j+1] = tmp;
                    // await this.delay(1);
                    // this.setState({
                    //     array: list,
                    // })
                    swaps++;
                }
                await this.delay(1);
                colors[j] = "blue";
                colors[j+1] = "blue";
                this.setState({
                    barC: colors,
                })
            }
            if (swaps===0)
                break;
            
            colors[j] = "green";
            this.setState({
                barC: colors,
            })
            
        }
        if (swaps===0) {
            for (let k=0; k<j+1; k++) {
                colors[k] = "green";
            }
        }
        colors[j-1] = "green";
        this.setState({
            array: list,
            barC: colors,
        })
    }

    selectionSort = async () => {
        let list = this.state.array;
        let colors = this.state.barC;
        let i=0;

        let n = list.length;
        for (i = 0; i < n - 1; i++) {
            for (let j = i+1; j < n; j++) {
                colors[i] = "red";
                colors[j] = "red";
                this.setState({
                    barC: colors,
                })
                if (list[i] > list[j]) {
                    let tmp = list[j];
                    list[j] = list[i];
                    list[i] = tmp;
                    // await this.delay(1000);
                    // this.setState({
                    //     array: list,
                    // })
                }
                await this.delay(1);
                colors[j] = "blue";
                this.setState({
                    barC: colors,
                })
            }
            colors[i] = "green";
            this.setState({
                barC: colors,
            })
        }
        colors[i] = "green";
        this.setState({
            array: list,
            barC: colors,
        })
    }

    mergeSort = (list) => {
        // let list = this.state.array;
        // let n = list.length;

        if (list.length < 2) {
            return list
        }
        const middle = Math.floor(list.length / 2)
        let a_l = list.slice(0, middle)
        let a_r = list.slice(middle, list.length)
        let sorted_l = this.mergeSort(a_l)
        let sorted_r = this.mergeSort(a_r)
        this.setState({
            array: this._mergeArrays(sorted_l, sorted_r),
        })
        console.log(this.state.array)
    }

    _mergeArrays = (a, b) => {
        const c = []
        if (a===undefined) a=[]
        if (b===undefined) b=[]

        while (a.length && b.length) {
            c.push(a[0] > b[0] ? b.shift() : a.shift())
        }

        //if we still have values, let's add them at the end of `c`
        while (a.length) {
            c.push(a.shift())
        }
        while (b.length) {
            c.push(b.shift())
        }

        return c
    }

    randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

    render() {
        return (
            <div className='container'>
                <Button variant="contained" onClick={() => this.resetArray()}>Play Again</Button>
                <Button variant="outlined" onClick={() => this.bubbleSort()}>Bubble Sort</Button>
                <Button variant="outlined" onClick={() => this.selectionSort()}>Selection Sort</Button>
                <Button variant="outlined" onClick={() => this.mergeSort(this.state.array)}>Merge Sort</Button>
                <br />
                {
                    this.state.array.map((ele, key) => (
                        <div className={`bar ${this.state.barC[key]}`} style={{height: `${ele}px`}}>
                            
                        </div>
                    ))
                }
                
            </div>
        )
    }

    delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
} 