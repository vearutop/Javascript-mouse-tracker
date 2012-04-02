function traitClass(base, trait) {
    for (var e in trait) {
        base.prototype[e] = trait[e];
    }
}

function extendClass(child, parent, extension){
    child.prototype = parent.prototype;
    traitClass(child, extension);
}

function makeClass(){
    return function(args){
        if ( this instanceof arguments.callee ) {
            if ( typeof this.init == "function" )
                this.init.apply( this, args.callee ? args : arguments );
        } else
            return new arguments.callee( arguments );
    };
}