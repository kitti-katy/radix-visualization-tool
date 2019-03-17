import React, { Component } from 'react';

class Main extends Component {
    state = {
        radix: 3,
        base10Number: 28,
        convertedArr: [1, 0, 0, 1]
    }
    setConvertedArr = (n, radix) => {
        /*let converted = []
        while (n != 0) {
            converted.push(n % radix)
            n = Math.floor(n / radix)
        }
        converted = converted.reverse()
        this.setState({ convertedArr: converted })
        */
        this.setState({ convertedArr: n.toString(radix).split('') })
    }

    getArr = (n) => Array.apply('', Array(n))

    getContainerStyle = (n) => {
        let length = this.state.convertedArr.length
        return {
            padding: n == 1 ? 16 / length + 'px' : 0,
            margin: ((n + 1) * 9) / length + 'px',
            background: this.getbackground(n, length),
            flexDirection: n % 2 == 0 ? 'row' : 'column'
        }
    }
    getbackground = (n, length) => (
        'hsla(' +
        (360 / length) * n + ', '
        + (100 - (10 / length) * n) + '%, '
        + (100 - (70 / length) * n) + '%, '
        + (100 - (55 / length) * n) / 100 + ') ')

    getInnerSquares = (n, i, isEmpty) => {
        if (n <= 0)
            return ''
        let newInnerSquares = this.getArr(this.state.radix).map((s, newI) => this.getInnerSquares(n - 1, i + '' + newI, isEmpty))
        let style = this.getContainerStyle(n)
        style.visibility = isEmpty ? 'hidden' : 'visible'
        return <div className="squareContainer" style={style} key={i}> {newInnerSquares} </div>
    }

    getModularPart = (n) => {
        const { convertedArr, radix } = this.state
        let length = convertedArr.length
        let modularKey = 'modular' + n

        if (n >= length)
            return ''
        let fullItems = parseInt(convertedArr[n])
        let render = []
        // push full items
        this.getArr(fullItems).forEach((s, i) => render.push(this.getInnerSquares(length - n, modularKey + 'full' + i, false)))
        // push modular part
        let modularPart = this.getModularPart(n + 1)
        render.push(modularPart)

        //push hidden part
        let hiddenElementsArr = this.getArr(radix - fullItems - (modularPart == 0 ? 0 : 1))
        hiddenElementsArr.forEach((s, i) => render.push(this.getInnerSquares(length - n, modularKey + 'empty' + i, true)))

        let style = this.getContainerStyle(length - n + 1)
        let allEmpty = parseInt(convertedArr.slice(n).join('')) == 0
        style.visibility = allEmpty ? 'hidden' : 'visible'

        return <div className="squareContainer" style={style} key={modularKey}> {render.map(el => el)}</div>
    }

    getSquares = () => {
        return this.getModularPart(0)
    }

    setRadix = (e) => {
        let radix = parseInt(e.target.value)
        this.setState({ radix })
        this.setConvertedArr(this.state.base10Number, radix)
    }
    setBase10Number = (e) => {
        let base10Number = parseInt(e.target.value)
        this.setState({ base10Number })
        this.setConvertedArr(base10Number, this.state.radix)
    }

    render() {
        const { radix, base10Number, convertedArr } = this.state
        let convertedStr = convertedArr.join('')
        let squares = this.getSquares()
        let length = convertedArr.length

        return (
            <div >
                <h2>Radix visualization tool</h2>
                <table>
                    <tr> <td><label> Decimal number : </label> </td> <td> <input type="number" value={base10Number} onChange={this.setBase10Number} /> </td></tr>
                    <tr> <td><label> Base : </label> </td> <td> <input type="number" value={radix} onChange={this.setRadix} /> </td></tr>
                </table>

                <h3> {base10Number}<i className="base">10</i> = <b>{convertedStr}<i className="base">{radix}</i></b> </h3>
                <i style={{ background: this.getbackground(length + 1, length), padding: '5px', fontSize: '1.8em', border: '1px solid black', textShadow: '#0000002e 1px 1px' }}>
                    {convertedArr.map(
                        (n, i) => <b style={{ color: this.getbackground(length - i, length) }}> {n} </b>
                    )}
                </i>

                <div style={{ display: 'table', margin: 'auto' }}>
                    {squares}
                </div>

            </div>
        );
    }
}

export default Main;
