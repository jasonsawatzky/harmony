'use strict';

const Heap = require('heap');

function Cluster(value) {
    this.children = [];
    this.distance = -1;
    this.index = [];
    this.value = value;
}

/**
 * Creates an array of values where maximum distance smaller than the threshold
 * @param {number} threshold
 * @return {Array <Cluster>}
 */
Cluster.prototype.cut = function (threshold) {
    if (threshold < 0) throw new RangeError('Threshold too small');
    var root = new Cluster();
    root.children = this.children;
    root.distance = this.distance;
    root.index = this.index;
    var list = [root];
    var ans = [];
    while (list.length > 0) {
        var aux = list.shift();
        if (threshold >= aux.distance) {
            ans.push(aux);
        } else {
            list = list.concat(aux.children);
        }
    }
    return ans;
};

/**
 * Merge the leaves in the minimum way to have 'minGroups' number of clusters
 * @param {number} minGroups - Them minimum number of children the first level of the tree should have
 * @return {Cluster}
 */
Cluster.prototype.group = function (minGroups) {
    if (!Number.isInteger(minGroups) || minGroups < 1) throw new RangeError('Number of groups must be a positive integer');

    const heap = new Heap(function (a, b) {
        return b.distance - a.distance;
    });

    heap.push(this);

    while (heap.size() < minGroups) {
        var first = heap.pop();
        if (first.children.length === 0) {
            break;
        }
        first.children.forEach(child => heap.push(child));
    }

    var root = new Cluster();
    root.children = heap.toArray();
    root.distance = this.distance;

    return root;
};

/**
 * Traverses the tree depth-first and provide callback to be called on each individual node
 * @param {function} cb - The callback to be called on each node encounter
 * @type {Cluster}
 */
Cluster.prototype.traverse = function (cb) {
    function visit(root, callback) {
        callback(root);
        if (root.children) {
            for (var i = root.children.length - 1; i >= 0; i--) {
                visit(root.children[i], callback);
            }
        }
    }
    visit(this, cb);
};

/**
 * Traverses the tree depth-first, calling the test function on each node,
 * returning the first node on which it returns true
 * @param {function} test - The callback to be called on each node encounter
 * @type {Cluster}
 */
Cluster.prototype.find = function (test) {
    function visit(root, test) {
        if (root.children) {
            for (var i = root.children.length - 1; i >= 0; i--) {
                const found = visit(root.children[i], test);
                if (found) return found;
            }
        }
        const found = test(root);
        return found ? root : false
    }
    return visit(this, test);
};

/**
 * Traverses the tree depth-first, calling the test function on each node,
 * returning the path from the first node on which it returns true to the root,
 * as a list of nodes
 * @param {function} test - The callback to be called on each node encounter
 * @type {Cluster[]}
 */
Cluster.prototype.findPath = function (test) {
    async function visit(root, test) {
        if (root.children) {
            for (var i = root.children.length - 1; i >= 0; i--) {
                const found = await visit(root.children[i], test);
                if (found) {
                  found.push(root)
                  return found
                }
            }
        }
        const found = await test(root);

        return found ? [root] : false;
    }
    return visit(this, test);
};

module.exports = Cluster;
