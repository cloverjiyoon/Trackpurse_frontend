const calculator = require('./CalcButton');

test('check comma button', () => {
    calculator.commaClick = jest.fn();
    calculator.commaClick();
    expect(calculator.commaClick).toBeCalled();
})

test('check click operation', () => {
    calculator.signClick = jest.fn();
    calculator.signClick();
    expect(calculator.signClick).toBeCalled();
})

test('check reset button', () => {
    calculator.resetClick = jest.fn();
    calculator.resetClick();
    expect(calculator.resetClick).toBeCalled();
})

test('check click number', () => {
    calculator.handleClickButton = jest.fn();
    calculator.handleClickButton();
    expect(calculator.handleClickButton).toBeCalled();
})

test('check click operation', () => {
    calculator.signClick = jest.fn();
    calculator.signClick();
    expect(calculator.signClick).toBeCalled();
})

test('check equals button', () => {
    calculator.equalsClick = jest.fn();
    calculator.equalsClick();
    expect(calculator.equalsClick).toBeCalled();
})


test('check persent button', () => {
    calculator.percenClick = jest.fn();
    calculator.percenClick();
    expect(calculator.percenClick).toBeCalled();
})

test('check invert button', () => {
    calculator.invertClick = jest.fn();
    calculator.invertClick();
    expect(calculator.invertClick).toBeCalled();
})

test('check button click', () => {
    calculator.handleBtnClick = jest.fn();
    calculator.handleBtnClick();
    expect(calculator.handleBtnClick).toBeCalled();
})
