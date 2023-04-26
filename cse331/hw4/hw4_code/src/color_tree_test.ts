import * as assert from 'assert';
import { makeBst } from './color_tree';
import { explode_array, nil } from './list';
import { node, empty } from './color_node';

describe('color_tree', function() {

    // TODO: Uncomment given example tests and add more test cases

    it('make_bst', function() {

        // 0-1-many heuristic, base case test 1
        assert.deepEqual(makeBst(nil), empty);

        // 0-1-many heuristic, 1st 1 case, single recursive call
        assert.deepEqual(makeBst(explode_array([
            ['Blue', '#0000FF', true],
          ])), node(['Blue', '#0000FF', true], empty, empty));

        // 0-1-many heuristic, 2nd 1 case, single recursive call
        assert.deepEqual(makeBst(explode_array([
            ['chartreuse', '#7FFF00', false],
            ])), node(['chartreuse', '#7FFF00', false], empty, empty));

        // 0-1-many heuristic, 1st many case, >1 recursive call
        assert.deepEqual(makeBst(explode_array([
            ['darkorchid', '#9932CC', true], 
            ['gainsboro', '#DCDCDC', false],
            ])), 
            node(['gainsboro', '#DCDCDC', false], 
            node(['darkorchid', '#9932CC', true], empty, empty), 
            empty));

        // 0-1-many heuristic, 2nd many case, >1 recursive call
        assert.deepEqual(makeBst(explode_array([
            ['Blue', '#0000FF', true], 
            ['chartreuse', '#7FFF00', false], 
            ['darkorchid', '#9932CC', true],
            ])), 
            node(['chartreuse', '#7FFF00', false], 
            node(['Blue', '#0000FF', true], empty, empty), 
            node(['darkorchid', '#9932CC', true], empty, empty)));

        // 0-1-many heuristic, 3rd many case, >1 recursive call
        assert.deepEqual(makeBst(explode_array([
            ['Blue', '#0000FF', true], 
            ['chartreuse', '#7FFF00', false], 
            ['darkorchid', '#9932CC', true], 
            ['gainsboro', '#DCDCDC', false], 
            ['hotpink', '#FF69B4', true],
            ])), 
            node(['darkorchid', '#9932CC', true],
            node(['chartreuse', '#7FFF00', false],
            node(['Blue', '#0000FF', true], empty, empty), empty),
            node(['hotpink', '#FF69B4', true], 
            node(['gainsboro', '#DCDCDC', false], empty, empty), empty)));
    });

    it('lookup', function() {
        // assert.deepEqual(lookup('Yellow', 
        //     node(['Yellow', '#FFFF00', false], empty, empty)), 
        //     ['Yellow', '#FFFF00', false]);
    });

    // TODO: copy some tests over here
});