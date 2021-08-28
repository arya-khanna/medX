var nat = require('natural')
var fs = require('fs');

var Dictionary = fs.readFileSync( "dictionary.txt" ,  "utf8" ).split( "\r\n" );

var SpellChecker = new nat.Spellcheck ( Dictionary );

var TestWord_1 = "aryakhanna"
//console.log( SpellChecker.isCorrect( TestWord_1 ) )
var TestWord_2 = "hello"
//console.log( SpellChecker.isCorrect( TestWord_2 ) )

var TestWord_3 = "hallo"
//console.log( SpellChecker.getCorrections( TestWord_3 ) )		// make distances default set to 1

// need to get a better dictionary

// logic - display the first couple of spelling suggestions

// for determining the sense of a sentence, e.g. interrogative, declarative, exclammatory,

console.log(typeof(nat.Sentences()))
//var SentenceAnalyzer = nat.Sentences( 'Take twice daily' )

//console.log( SentenceAnalyzer.type() )
//