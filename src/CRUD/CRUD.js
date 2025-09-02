exports.CreateOnly = function(){
    return 1;
}

exports.ReadOnly = function() {
    return 2;
}

exports.UpdateOnly = function() {
    return 4;
}

exports.DeleteOnly = function() {
    return 8;
}

exports.CRrights = function() {
    return 3;
}

exports.CUrights = function() {
    return 5;
}

exports.CDrights = function() {
    return 9;
}

exports.CRUrights = function() {
    return 7;
}

exports.CRDrights = function() {
    return 11;
}

exports.CUDrights = function() {
    return 13;
}

exports.CRUDrights = function() {
    return 15;
}

exports.ContainCreate = function(val) {
    return val === 7 || val === 5 || val === 3 || val === 1;
}

exports.ContainRead = function(val) {
    return val === 7 || val === 6 || val === 2;
}

exports.ContainUpdate = function(val) {
    return val === 7 || val === 4;
}

exports.ContainDelete = function(val) {
    return val === 8;
}

module.exports = exports