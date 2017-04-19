let dialogIndex = 0;
const addClass = function (el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
};
const getDialogContainer = function(){
    var container = document.querySelector('body>#el-dialog-container');
    if( !container ){
        container = document.createElement('div');
        container.id = 'el-dialog-container';
        // addClass(container,'el-dialog-container');
        document.querySelector('body').appendChild(container);
    }
    return container;
};
const getDialogRoot = function(index){
    let container = getDialogContainer();
    let wrap = document.createElement('div');
    addClass(wrap,`el-dialog-wrap-${index}`);
    let obj = document.createElement('div');
    wrap.appendChild(obj)
    container.appendChild(wrap);
    return obj;
};
const clearDialogRoot = function (index) {
    var obj = document.querySelector(`body>#el-dialog-container>.el-dialog-wrap-${index}`);
    obj.remove();
};
const dialog = {
    get:getDialogRoot,
    clear:clearDialogRoot,
    index(){
        dialogIndex++;
        return dialogIndex;
    }
};
export default dialog;