import * as assert from 'assert';
import { solid, split, toJson, fromJson, replaceSq, retrieveSq,  } from './square';
import { nil, cons } from './list';


describe('square', function() {

  it('toJson', function() {
    assert.deepEqual(toJson(solid("white")), "white");
    assert.deepEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "red"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepEqual(fromJson("white"), solid("white"));
    assert.deepEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "red"]),
        split(s1, solid("green"), s1, solid("red")));

    assert.deepEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

  it('replaceSq', function() {
    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    const s2 = split(solid("blue"), solid("yellow"), solid("purple"), solid("white"));
    const s3 = split(solid("blue"), solid("yellow"), s2, solid("white"));
    const s4 = split(solid("blue"), s3, s2, solid("white"));
    

    assert.deepEqual(replaceSq(s1, cons("NE", nil), solid("yellow")), s2);
    assert.deepEqual(replaceSq(s2, cons("SW", nil), s2), s3);
    assert.deepEqual(replaceSq(s3, cons("NE", nil), s3), s4);
    assert.deepEqual(replaceSq(s4, cons("NE", cons("SW", nil)), solid("purple")),   
                                   split(solid("blue"), s2, s2, solid("white")));
    assert.deepEqual(replaceSq(s4, cons("SW", cons("NE", nil)), solid("orange")), 
                                   split(solid("blue"), s3, s1, solid("white")));
    assert.deepEqual(replaceSq(s4, cons("NE", cons("SW", cons("NE", nil))), solid("orange")), 
                                  split(solid("blue"), split(solid("blue"), solid("yellow"), 
                                                 s1, solid("white")), s2, solid("white")));
  });

  it('retrieveSq', function() {
    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    const s2 = split(solid("blue"), solid("yellow"), solid("purple"), s1);
    const s3 = split(s1, solid("yellow"), s2, solid("white"));
    const s4 = split(solid("blue"), s3, s2, s1);

    assert.deepEqual(retrieveSq(s1, cons("NE", nil)), solid("orange"));
    assert.deepEqual(retrieveSq(s2, cons("SE", nil)), s1);
    assert.deepEqual(retrieveSq(s3, cons("SW", nil)), s2);
    assert.deepEqual(retrieveSq(s4, cons("NE", cons("NW", nil))), s1);
    assert.deepEqual(retrieveSq(s4, cons("NE", cons("SW", nil))), s2);
    assert.deepEqual(retrieveSq(s4, cons("NE", cons("SW", cons("SE", nil)))), s1);
    assert.deepEqual(retrieveSq(s4, cons("NE", cons("SW", cons("SE", cons("NW", nil))))), solid("blue"));
    assert.deepEqual(retrieveSq(s4, cons("NE", cons("SW", cons("SE", cons("SW", nil))))), solid("purple"));
    
  });


});
