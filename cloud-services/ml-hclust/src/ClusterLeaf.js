'use strict';

const Cluster = require('./Cluster');
const util = require('util');

function ClusterLeaf(index, value) {
    Cluster.call(this);
    this.index = index;
    this.value = value;
    this.distance = 0;
    this.children = [];
}

util.inherits(ClusterLeaf, Cluster);

module.exports = ClusterLeaf;
