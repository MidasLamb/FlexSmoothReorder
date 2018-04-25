'use strict'

class FlexSmoothReorder {

    static init(options){
        this.defaultOptions = {
            duration : 300
        };
        this.options = {};
        this.mutationObserverConfig = { attributes: true }
        Object.assign(this.options, this.defaultOptions);
        Object.assign(this.options, options)
        this.bindSmooth()
    }

    static bindSmooth() {
        var elements = document.getElementsByClassName("smooth-reorder")
        for (var i = 0; i < elements.length; i++){
            var children = elements[i].children;
            for (var j = 0; j < children.length; j++){
                this.addOrderSmoother(children[j]);
            }
        };
    }

    static addOrderSmoother(DOMe){
        var firstBound = DOMe.getBoundingClientRect();
        var animation = null;
        var mut = new MutationObserver((e) => {
            if (animation){
                animation.finish();
            }
            var temp = firstBound;
            firstBound = DOMe.getBoundingClientRect();
            animation = this.animateChange(DOMe, temp);
        });

        mut.observe(DOMe, this.mutationObserverConfig);
    }

    static animateChange(DOMe, firstBound){
        var lastBound = DOMe.getBoundingClientRect();
        var dx = firstBound.left - lastBound.left;
        var dy = firstBound.top - lastBound.top;

        return DOMe.animate([{
            transformOrigin: 'top left',
            transform: `
                translate(${dx}px, ${dy}px)
                `
        }, {
            transformOrigin: 'top left',
            transform: 'none'
        }], {
            duration: this.options.duration,
            easing: 'ease-in-out',
            fill: 'both'
        });

    }
}

FlexSmoothReorder.init();