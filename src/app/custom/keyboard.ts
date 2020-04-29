import { IKeyboardLayouts, keyboardLayouts } from '@ngx-material-keyboard/core';

export const customMaterialKeyboard: IKeyboardLayouts = {
  ...keyboardLayouts,
  'Layout Numeric': {
    name: 'Numeric',
    keys: [[['1', '1'], ['2', '2'], ['3', '3'], ['Backspace', 'Backspace']],
    [['4', '4'], ['5', '5'], ['6', '6']],
    [['7', '7'], ['8', '8'], ['9', '9']],
    [['0', '0'], ['K', 'K']]],
    lang: ['numeric']
  }
};

export const customVirtualKeyboard = [
  [ '1', '2', '3', 'Backspace' ],
  [ '4', '5', '6' ],
  [ '7', '8', '9' ],
  [ '0', 'K' ]
];
