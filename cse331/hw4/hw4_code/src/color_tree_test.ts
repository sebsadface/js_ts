import * as assert from 'assert';
import { makeBst, lookup, makeColorTree } from './color_tree';
import { explode_array, nil, cons } from './list';
import { node, empty, ColorNode } from './color_node';
import { ColorList } from './color_list';

describe('color_tree', function() {

    // TODO: Uncomment given example tests and add more test cases

    it('make_bst', function() {
        // 0-1-many heuristic, base case test
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

        // 0-1-many heuristic, 1st base case test 1
        assert.deepEqual(lookup('Yellow', empty), empty);

        // 0-1-many heuristic, 1st base case test 2
        assert.deepEqual(lookup('Blue', empty), empty);

        // 0-1-many heuristic, 2nd base case test 1
        assert.deepEqual(lookup('Yellow', 
            node(['Yellow', '#FFFF00', false], empty, empty)), 
            node(['Yellow', '#FFFF00', false], empty, empty));

        // 0-1-many heuristic, 2nd base case test 2
        assert.deepEqual(lookup('Blue', 
            node(['Blue', '#0000FF', true], empty, empty)), 
            node(['Blue', '#0000FF', true], empty, empty));

        // 0-1-many heuristic, 1st 1 case, single recursive call 
        // in branch y < root.info[0] and found a mathcing color
        assert.deepEqual(lookup('darkorchid', 
            node(['gainsboro', '#DCDCDC', false], 
            node(['darkorchid', '#9932CC', true], empty, empty), empty)),
            node(['darkorchid', '#9932CC', true], empty, empty));

        // 0-1-many heuristic, 2nd 1 case, single recursive call 
        // in branch y < root.info[0] and found a mathcing color
        assert.deepEqual(lookup('Blue', 
            node(['chartreuse', '#7FFF00', false], 
            node(['Blue', '#0000FF', true], empty, empty), 
            node(['darkorchid', '#9932CC', true], empty, empty))),
            node(['Blue', '#0000FF', true], empty, empty));

        // 0-1-many heuristic, 1st 1 case, single recursive call
        // in branch y < root.info[0] and did not find a mathcing color
         assert.deepEqual(lookup('aqua', 
            node(['gainsboro', '#DCDCDC', false], 
            node(['darkorchid', '#9932CC', true], empty, empty), empty)),
            empty);
            

        // 0-1-many heuristic, 2nd 1 case, single recursive call
        // in branch y < root.info[0] and did not find a mathcing color
         assert.deepEqual(lookup('azure', 
            node(['chartreuse', '#7FFF00', false], 
            node(['Blue', '#0000FF', true], empty, empty), 
            node(['darkorchid', '#9932CC', true], empty, empty))),
            empty);


        // 0-1-many heuristic, 1st 1 case, single recursive call 
        // in branch y > root.info[0] and found a mathcing color
        assert.deepEqual(lookup('darkorchid',
            node(['chartreuse', '#7FFF00', false], 
            node(['Blue', '#0000FF', true], empty, empty), 
            node(['darkorchid', '#9932CC', true], empty, empty))),
            node(['darkorchid', '#9932CC', true], empty, empty));

        // 0-1-many heuristic, 2nd 1 case, single recursive call 
        // in branch y > root.info[0] and found a mathcing color
        assert.deepEqual(lookup('ivory',
            node(['cadetblue', '#5F9EA0', true],
            node(['aliceblue', '#F0F8FF', false], empty, empty),
            node(['ivory', '#FFFFF0', false], empty, empty))),
            node(['ivory', '#FFFFF0', false], empty, empty));

        // 0-1-many heuristic, 1st 1 case, single recursive call
        // in branch y > root.info[0] and did not find a mathcing color
         assert.deepEqual(lookup('white',
            node(['chartreuse', '#7FFF00', false], 
            node(['Blue', '#0000FF', true], empty, empty), 
            node(['darkorchid', '#9932CC', true], empty, empty))),
            empty);

        // 0-1-many heuristic, 2nd 1 case, single recursive call
        // in branch y > root.info[0] and did not find a mathcing color
        assert.deepEqual(lookup('yellow',
            node(['cadetblue', '#5F9EA0', true],
            node(['aliceblue', '#F0F8FF', false], empty, empty),
            node(['ivory', '#FFFFF0', false], empty, empty))),
            empty);
       
        



        const tree: ColorNode = node(['navy', '#000080', true],
                                node(['grey', '#808080', true],
                                node(['dimgray', '#696969', true],
                                node(['blue', '#0000FF', true], empty, empty),
                                node(['firebrick', '#B22222', true], empty, empty)),
                                node(['ivory', '#FFFFF0', false], empty, empty)),
                                node(['red', '#FF0000', true],
                                node(['purple', '#800080', true],empty, empty),
                                node(['tan', '#D2B48C', false],
                                node(['silver', '#C0C0C0', false], empty, empty),
                                node(['yellow', '#FFFF00', false], empty, empty))));



        // 0-1-many heuristic, 1st many case, >1 recursive call
        // in branch y < root.info[0] and found a mathcing color
        assert.deepEqual(lookup('dimgray', tree),
                        node(['dimgray', '#696969', true],
                        node(['blue', '#0000FF', true], empty, empty),
                        node(['firebrick', '#B22222', true], empty, empty)));

        // 0-1-many heuristic, 2nd many case, >1 recursive call
        // in branch y < root.info[0] and found a mathcing color
        assert.deepEqual(lookup('firebrick', tree),
                        node(['firebrick', '#B22222', true], empty, empty));

        // 0-1-many heuristic, 1st many case, >1 recursive call
        // in branch y < root.info[0] and did not find a mathcing color
        assert.deepEqual(lookup('aqua', tree), empty);
            

        // 0-1-many heuristic, 2nd many case, >1 recursive call
        // in branch y < root.info[0] and did not find a mathcing color
        assert.deepEqual(lookup('khaki', tree), empty);


        // 0-1-many heuristic, 1st many case, >1 recursive call
        // in branch y > root.info[0] and found a mathcing color
        assert.deepEqual(lookup('tan', tree),
                        node(['tan', '#D2B48C', false],
                        node(['silver', '#C0C0C0', false], empty, empty),
                        node(['yellow', '#FFFF00', false], empty, empty)));

        // 0-1-many heuristic, 2nd many case, >1 recursive call
        // in branch y > root.info[0] and found a mathcing color
        assert.deepEqual(lookup('silver', tree),
                        node(['silver', '#C0C0C0', false], empty, empty));

        // 0-1-many heuristic, 1st many case, >1 recursive call
        // in branch y > root.info[0] and did not find a mathcing color
        assert.deepEqual(lookup('yellowgreen', tree), empty);

        // 0-1-many heuristic, 2nd many case, >1 recursive call
        // in branch y > root.info[0] and did not find a mathcing color
        assert.deepEqual(lookup('seashell', tree), empty);
    });

    // TODO: copy some tests over here

    const colorlist: ColorList = makeColorTree();

    it('findMatchingNames', function() {
        assert.deepEqual(colorlist.findMatchingNames("doesnotexist"), nil);
        assert.deepEqual(colorlist.findMatchingNames("indigo"), cons("indigo", nil));
        assert.deepEqual(colorlist.findMatchingNames("azure"), cons("azure", nil));
        assert.deepEqual(colorlist.findMatchingNames("lavender"),
            cons("lavender", cons("lavenderblush", nil)));
        assert.deepEqual(colorlist.findMatchingNames("pink"),
            cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
    });

    it('getColorCss', function() {
        assert.deepEqual(colorlist.getColorCss("lavender"), ['#E6E6FA', '#101010']);
        assert.deepEqual(colorlist.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
    });
});