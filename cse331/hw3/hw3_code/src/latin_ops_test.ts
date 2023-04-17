import * as assert from 'assert';
import { explode, compact } from './char_list';
import { next_latin_char, prev_latin_char, count_consonants,
         pig_latin_encode, pig_latin_decode } from './latin_ops';
import { nil } from './list';


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
    // TODO: add tests
  });

  it('cipher_decode', function() {
    // TODO: add tests
  });

  it('crazy_caps_encode', function() {
    // TODO: add tests
  });

  it('crazy_caps_decode', function() {
    // TODO: add tests
  });

  it('count_consonants', function() {
    // base case: nil
    assert.strictEqual(count_consonants(nil), undefined);
    // base case: 1st char is vowel, no recursive calls
    assert.strictEqual(count_consonants(explode("e")), 0);
    assert.strictEqual(count_consonants(explode("astray")), 0);
    // base case: no vowels or cosonants
    assert.strictEqual(count_consonants(explode("")), undefined);
    assert.strictEqual(count_consonants(explode("_")), undefined);

    // 1 recursive call:
    assert.strictEqual(count_consonants(explode("say")), 1);
    assert.strictEqual(count_consonants(explode("l_")), undefined);

    // multiple recursive calls:
    assert.strictEqual(count_consonants(explode("stingray")), 2);
    assert.strictEqual(count_consonants(explode("stray")), 3);
    assert.strictEqual(count_consonants(explode("str")), undefined);
    assert.strictEqual(count_consonants(explode("st_a")), undefined);
  });

  it('pig_latin_encode', function() {
    // NOTE: these are tests for the incomplete code provided.
    // TODO: If you do Problem 6, you should replace these with your own tests.

    assert.strictEqual(compact(pig_latin_encode(explode("astray"))), "astray");
    assert.strictEqual(compact(pig_latin_encode(explode("enough"))), "enough");

    assert.strictEqual(compact(pig_latin_encode(explode("ram"))), "amray");
    assert.strictEqual(compact(pig_latin_encode(explode("that"))), "atthay");
    assert.strictEqual(compact(pig_latin_encode(explode("stray"))), "aystray");
  });

  it('pig_latin_decode', function() {
    // NOTE: these are tests for the incomplete code provided.
    // TODO: If you do Problem 6, you should replace these with your own tests.

    // first branch (m < 4)
    assert.strictEqual(compact(pig_latin_decode(explode("at"))), "at");
    assert.strictEqual(compact(pig_latin_decode(explode("say"))), "say");

    // second branch (doesn't end in consonant, a, y)
    assert.strictEqual(compact(pig_latin_decode(explode("once"))), "once");
    assert.strictEqual(compact(pig_latin_decode(explode("aaay"))), "aaay");

    // third branch (non-consonant, consonant, a, y)
    assert.strictEqual(compact(pig_latin_decode(explode("osay"))), "so");
    assert.strictEqual(compact(pig_latin_decode(explode("onacomay"))), "monaco");

    // fourth branch (m = 4)
    assert.strictEqual(compact(pig_latin_decode(explode("ssay"))), "ssay");
    assert.strictEqual(compact(pig_latin_decode(explode("stay"))), "stay");

    // fifth branch (non-consonant, consonant, consonant, a, y)
    assert.strictEqual(compact(pig_latin_decode(explode("ethay"))), "the");
    assert.strictEqual(compact(pig_latin_decode(explode("ilesmay"))), "smile");

    // sixth branch (the rest)
    assert.strictEqual(compact(pig_latin_decode(explode("sssay"))), "sssay");
    assert.strictEqual(compact(pig_latin_decode(explode("astray"))), "astray");
  });

});
