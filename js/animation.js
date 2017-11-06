function $(_id) {
    return document.getElementById(_id);
}

function getAttrValue(obj,attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    return window.getComputedStyle(obj,null)[attr];
}

function animation(obj,json,time,fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for(var attr in json) {
            var current = parseInt(getAttrValue(obj,attr));
            if(attr == "opacity") {
                current = parseInt(getAttrValue(obj,attr) * 100) || 0;
            }
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (attr == "opacity") {
                if("opacity" in obj.style) {
                    obj.style.opacity = (current + step) /100;
                }
                else {
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                }
            }else if (attr == "zIndex") {
                current = json[attr];
                obj.style.zIndex = json[attr];
            } else  {
                obj.style[attr]  = current + step + "px";
            }
            if (current != json[attr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fun) {
                fun();
            }
        }
    },time);
}