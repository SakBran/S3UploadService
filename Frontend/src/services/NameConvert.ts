const NameConvert = (strings: string) => {
  let character: any;
  let data = '';
  for (let i = 0; i <= strings.length; i++) {
    character = strings.charAt(i);
    if (!isNaN(character * 1)) {
      //console.log('character is numeric');
    } else {
      if (i === 0) {
        data = data + character.toUpperCase();
      } else {
        if (character === character.toUpperCase()) {
          // console.log('upper case true');
          data = data + ' ' + character;
        } else {
          data = data + character;
        }
      }
    }
  }
  return data;
};

export default NameConvert;
