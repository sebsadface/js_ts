import * as assert from 'assert';
import { explode, compact } from './char_list';
import { next_latin_char, prev_latin_char,
         pig_latin_encode, pig_latin_decode, cipher_decode, cipher_encode, crazy_caps_decode,crazy_caps_encode } from './latin_ops';
import { nil, List } from './list';


describe('char_list_ops', function() {

  // For the following 2 functions, there are a finite number of cases 
  // but the number exceeds our reasonable case limit of 20, so just some
  // were selected.
  
  it('next_latin_char', function() {
    assert.equal(next_latin_char("a".charCodeAt(0)), "e".charCodeAt(0));
    assert.equal(next_latin_char("e".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(next_latin_char("i".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(next_latin_char("o".charCodeAt(0)), "u".charCodeAt(0));
    assert.equal(next_latin_char("u".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(next_latin_char("j".charCodeAt(0)), "g".charCodeAt(0));
    assert.equal(next_latin_char("g".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(next_latin_char("d".charCodeAt(0)), "t".charCodeAt(0));
    assert.equal(next_latin_char("t".charCodeAt(0)), "b".charCodeAt(0));
    assert.equal(next_latin_char("c".charCodeAt(0)), "k".charCodeAt(0));
    assert.equal(next_latin_char("k".charCodeAt(0)), "s".charCodeAt(0));
    assert.equal(next_latin_char("f".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(next_latin_char("v".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(next_latin_char("w".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(next_latin_char("h".charCodeAt(0)), "l".charCodeAt(0));
    assert.equal(next_latin_char("l".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(next_latin_char("r".charCodeAt(0)), "h".charCodeAt(0));
    assert.equal(next_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(next_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(next_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('prev_next_char', function() {
    assert.equal(prev_latin_char("a".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(prev_latin_char("e".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(prev_latin_char("i".charCodeAt(0)), "e".charCodeAt(0));
    assert.equal(prev_latin_char("u".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(prev_latin_char("y".charCodeAt(0)), "u".charCodeAt(0));
    assert.equal(prev_latin_char("b".charCodeAt(0)), "t".charCodeAt(0));
    assert.equal(prev_latin_char("p".charCodeAt(0)), "b".charCodeAt(0));
    assert.equal(prev_latin_char("j".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(prev_latin_char("g".charCodeAt(0)), "j".charCodeAt(0));
    assert.equal(prev_latin_char("k".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(prev_latin_char("s".charCodeAt(0)), "k".charCodeAt(0));
    assert.equal(prev_latin_char("z".charCodeAt(0)), "s".charCodeAt(0));
    assert.equal(prev_latin_char("f".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(prev_latin_char("v".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(prev_latin_char("w".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(prev_latin_char("l".charCodeAt(0)), "h".charCodeAt(0));
    assert.equal(prev_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(prev_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(prev_latin_char("q".charCodeAt(0)), "x".charCodeAt(0));
    assert.equal(prev_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

    it('cipher_encode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("a");
     const l3: List<number> = explode("z");
     const l4: List<number> = explode("ok");
     const l5: List<number> = explode("washington");
     const l6: List<number> = explode("hello world");

    // 0-1-many heuristic, base case
    assert.deepEqual(cipher_encode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(cipher_encode(l2)), "e");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(cipher_encode(l3)), "c");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(cipher_encode(l4)), "us");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(cipher_encode(l5)), "fezlomdbum");

    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(cipher_encode(l6)), "lirru fuhrt");

  });

  it('cipher_decode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("e");
     const l3: List<number> = explode("c");
     const l4: List<number> = explode("us");
     const l5: List<number> = explode("fezlomdbum");
     const l6: List<number> = explode("lirru fuhrt");

    // 0-1-many heuristic, base case
    assert.deepEqual(cipher_decode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(compact(cipher_decode(l2)), "a");

    // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(compact(cipher_decode(l3)), "z");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(cipher_decode(l4)), "ok");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(cipher_decode(l5)), "washington");

     // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(cipher_decode(l6)), "hello world");

  });

  it('crazy_caps_encode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("b");
     const l3: List<number> = explode("Q");
     const l4: List<number> = explode("yo");
     const l5: List<number> = explode("mE");
     const l6: List<number> = explode("egg");
     const l7: List<number> = explode("CaterpillAr");
     const l8: List<number> = explode("jellyfish");
     const l9: List<number> = explode("rabbit");
     const l10: List<number> = explode("KAngaroo");
     const l11: List<number> = explode("flamingo");

    // 0-1-many heuristic, base case
    assert.deepEqual(crazy_caps_encode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call 
    // calling helper function's base case
    assert.deepEqual(compact(crazy_caps_encode(l2)), "B");

    // 0-1-many heuristic, 2st 1 case, single recursive call 
    // calling helper function's base case
    assert.deepEqual(compact(crazy_caps_encode(l3)), "Q");

    // 0-1-many heuristic, 3st 1 case, helper function single recursive call 
    assert.deepEqual(compact(crazy_caps_encode(l4)), "Yo");

    // 0-1-many heuristic, 4th 1 case, helper function single recursive call 
    assert.deepEqual(compact(crazy_caps_encode(l5)), "ME");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l6)), "EgG");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l7)), "CaTeRpIlLAR");

    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l8)), "JeLlYfIsH");

    // 0-1-many heuristic, 4th many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l9)), "RaBbIt");

    // 0-1-many heuristic, 5th many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l10)), "KANgArOo");

    // 0-1-many heuristic, 6th many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_encode(l11)), "FlAmInGo");

  });

  it('crazy_caps_decode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("B");
     const l3: List<number> = explode("q");
     const l4: List<number> = explode("Yo");
     const l5: List<number> = explode("ME");
     const l6: List<number> = explode("EgG");
     const l7: List<number> = explode("CaTeRpIlLAR");
     const l8: List<number> = explode("JeLlYfIsH");
     const l9: List<number> = explode("RaBbIt");
     const l10: List<number> = explode("KANgArOo");
     const l11: List<number> = explode("FlAmInGo");

    // 0-1-many heuristic, base case
    assert.deepEqual(crazy_caps_decode(l1), nil);

    // 0-1-many heuristic, 1st 1 case, single recursive call 
    // calling helper function's base case
    assert.deepEqual(compact(crazy_caps_decode(l2)), "b");

    // 0-1-many heuristic, 2st 1 case, single recursive call 
    // calling helper function's base case
    assert.deepEqual(compact(crazy_caps_decode(l3)), "q");

    // 0-1-many heuristic, 3st 1 case, helper function single recursive call 
    assert.deepEqual(compact(crazy_caps_decode(l4)), "yo");

    // 0-1-many heuristic, 4th 1 case, helper function single recursive call 
    assert.deepEqual(compact(crazy_caps_decode(l5)), "mE");

    // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l6)), "egg");

    // 0-1-many heuristic, 2nd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l7)), "caterpillAr");

    // 0-1-many heuristic, 3rd many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l8)), "jellyfish");

    // 0-1-many heuristic, 4th many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l9)), "rabbit");

    // 0-1-many heuristic, 5th many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l10)), "kAngaroo");

    // 0-1-many heuristic, 6th many case, >1 recursive call
    assert.deepEqual(compact(crazy_caps_decode(l11)), "flamingo");

  });

  it('pig_latin_decode', function() {
     const l1: List<number> = explode("aystray");
     const l2: List<number> = explode("away");
     const l3: List<number> = explode("s");
     const l4: List<number> = explode("universityway");
     const l5: List<number> = explode("ingstray");
     const l6: List<number> = explode("equippedway");

    // test case when input is the last case.
    assert.deepEqual(compact(pig_latin_decode(l1)), "stray");

    // test case when input is a single vowel.
    assert.deepEqual(compact(pig_latin_decode(l2)), "a");

    // test case when input is a single consonant.
    assert.deepEqual(compact(pig_latin_decode(l3)), "s");

    // test case when input starts with a vowel.
    assert.deepEqual(compact(pig_latin_decode(l4)), "university");

    // test case when input starts with a consonant cluster. 
    assert.deepEqual(compact(pig_latin_decode(l5)), "ngstri");

    // test case when input ends with "qu".
    assert.deepEqual(compact(pig_latin_decode(l6)), "dwequippe");
  });

    it('pig_latin_encode', function() {
     const l1: List<number> =  nil;
     const l2: List<number> = explode("a");
     const l3: List<number> = explode("s");
     const l4: List<number> = explode("university");
     const l5: List<number> = explode("string");
     const l6: List<number> = explode("equipped");

    // test case when input is an empty list.
    assert.deepEqual(pig_latin_encode(l1), nil);

    // test case when input is a single vowel.
    assert.deepEqual(compact(pig_latin_encode(l2)), "away");

    // test case when input is a single consonant.
    assert.deepEqual(compact(pig_latin_encode(l3)), "s");

    // test case when input starts with a vowel.
    assert.deepEqual(compact(pig_latin_encode(l4)), "universityway");

    // test case when input starts with a consonant cluster. 
    assert.deepEqual(compact(pig_latin_encode(l5)), "ingstray");

    // test case when input ends with "qu".
    assert.deepEqual(compact(pig_latin_encode(l6)), "equippedway");
  });

});
