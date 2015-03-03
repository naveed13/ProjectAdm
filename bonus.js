
document.getElementById('string').addEventListener('click',function (){
  var requestResult;
  var str = document.getElementById("userString").value;
  /**
  * function findChar uses the type of higher order function where a function returns a
  * function.
  * What it is doing?
  * First: function findChar gets the index of all occurences of the character user wants to
  * replace and returns a function
  * Second: The anonymous function returned get the array from the function which returned it
  * and replaces the character with whatever user input to be replaced with and
  * returns another function
  * Third: The last function gets the new string and user input of character to be counted
  * and returns the counter.
  * Each function returned is able to access all the local and global variables for its use.
  */
  function findChar(){
    var character = document.getElementById("userRepChar").value;;
    var newCharacter = document.getElementById("userNewChar").value;;
    var characterToCount = document.getElementById("userCharCount").value;;
    var arr = [];
    var newStr='';
    var n =0;
    var string = str.split('');

    for (var i =0; i < string.length; i ++){
      if (string[i] == character) {
        arr.push(i);
      }
    }
    return function(){
        for (var i =0; i < arr.length; i ++){
          string[arr[i]] = newCharacter;
        }
        newStr = string.join(' ');
        requestResult = document.getElementById('replaced');
        requestResult.textContent = 'Replaced   : ' +character+" "+ newStr;

      return function(){
        for (var i =0; i < newStr.length; i ++){
          if (newStr[i] == characterToCount){
            n = n+1;
          }
        }
        requestResult = document.getElementById('counter');
        requestResult.textContent = 'Counting '+characterToCount+':  ' + n;
      };
    };
  };
    var change = findChar();
    var newChange = change();
    newChange();

  /**
  * We are using the type of higher order function which passes the function as a
  * parameter to another function.
  * It reverses the words of a string not characters.
  */
  function rev(str, action){
     console.log(str);
     action(str);
  }

  rev(str, function(){
    var newStr='';
    var string = str.split(' ');
     for (var i = string.length-1; i >= 0; i --) {
        newStr+=string[i]+' ';
      }
    requestResult = document.getElementById('reverse');
    requestResult.textContent = 'Reverse   : ' + newStr;
  });
});

document.getElementById('reloadBonus').addEventListener('click',function (){
  location.reload();
});
