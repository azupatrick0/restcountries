class Slot {
  static async spin(_req, res) {
    const reel1 = ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'];
    const reel2 = ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'];
    const reel3 = ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'];

    const getReel1Value = reel1[Math.floor(Math.random() * 8)];
    const getReel2Value = reel2[Math.floor(Math.random() * 8)];
    const getReel3Value = reel3[Math.floor(Math.random() * 8)];

    const finalSpinValue = [getReel1Value, getReel2Value, getReel3Value];

    let won;

    const isTwoFruitsInARow = (observedValues, expectedValue) => {
      let count = 0;
      observedValues.map(eachValue => {
        if (eachValue === expectedValue) {
          count += 1;
        }
      });
      if (count === 2) {
        return true;
      }
    }

    const isThreeFruitsInARow = (observedValue, expectedValue) => {
      return observedValue === expectedValue;
    }

    if (finalSpinValue.every(observedValue => isThreeFruitsInARow(observedValue, 'cherry'))) {
      won = 50;
    } else if (finalSpinValue.every(observedValue => isThreeFruitsInARow(observedValue, 'apple'))) {
      won = 20;
    } else if (finalSpinValue.every(observedValue => isThreeFruitsInARow(observedValue, 'banana'))) {
      won = 15;
    } else if (finalSpinValue.every(observedValue => isThreeFruitsInARow(observedValue, 'lemon'))) {
      won = 3;
    } else if (isTwoFruitsInARow(finalSpinValue, 'cherry')) {
      won = 40;
    } else if (isTwoFruitsInARow(finalSpinValue, 'apple')) {
      won = 10;
    } else if (isTwoFruitsInARow(finalSpinValue, 'banana')) {
      won = 5;
    } else {
      won = 0;
    }

    return res.status(200).json({
      status: 200,
      data: {
        message: 'result of this spin returned successfully',
        result: finalSpinValue,
        won,
      }
    });
  }
}

export default Slot;
