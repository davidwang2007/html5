/**
 * Created by David on 14-1-11.
 * @author D.W.
 * @date 2014-1-11 14:04:39
 * @api startLoadingAnimation,stopLoadingAnimation,setLoadingMsg
 * @description show the loading animation, you can specify the tip text as you want
 * @email davidwang2006@outlook.com
 */
;(function(){
    'use strict';
    var win = this;
    var doc = win.document;
    doc.addEventListener('DOMContentLoaded',function(){
        doc.addEventListener('readystatechange',function(){
            if(doc.readyState == 'complete'){
                console.debug(formatLog('plugin installed'));
                console.debug(formatLog('You can call startLoadingAnimation,stopLoadingAnimation,setLoadingMsg '+(win.jQuery ? 'with jQuery' : 'directly')+'.'));
            }
        },false);
    },false);


    var _export = {
        startLoadingAnimation: showAnimation,
        stopLoadingAnimation: stopAnimation,
        setLoadingMsg: function(msg){
            var _ele = doc.getElementById('loading-animation');
            if(!_ele){
                console.warn(formatLog('Before you set animation msg, you should start the animation'));
                return;
            }
            _ele.querySelector('.info span').textContent = msg;
        }
    };

    if(win.jQuery){
        win.jQuery.extend(_export);
    }else{
        _extend(win,_export);
    }

    function showAnimation(){
        if(doc.getElementById('loading-animation')){
            console.warn('animation running... Dot need call again.....');
            return;
        }
        var _container = createAnimation();
        var _frag = document.createDocumentFragment();
        _frag.appendChild(_container);
        doc.body.appendChild(_frag);
    }

    function stopAnimation(){
        var _ele = doc.getElementById('loading-animation');
        if(!_ele || _ele.classList.contains('move')){
            console.warn(formatLog('You has already called stop the animation...'));
            return;
        }
        _ele.classList.add('move');
        win.setTimeout(function(){
            _ele.parentNode.removeChild(_ele);
        },2000);
    }


    function createAnimation(){
        var _container = doc.createElement('div');
        _container.id = 'loading-animation';
        //circle container
        var _circleContainer = doc.createElement('div');
        _circleContainer.className = 'rotating-circles';
        var _c0 = doc.createElement('div');
        var _c1 = doc.createElement('div');
        _c0.className = 'circle0';
        _c1.className = 'circle1';
        _circleContainer.appendChild(_c0);
        _circleContainer.appendChild(_c1);
        //info container
        var _info = doc.createElement('div');
        _info.className = 'info';
        var _span = doc.createElement('span');
        _span.textContent = '正在加载';
        _info.appendChild(_span);

        _container.appendChild(_circleContainer);
        _container.appendChild(_info);


        return _container;
    }

    function formatLog(msg){
        return 'animation plugin log --> '+msg;
    }

    function _extend(a,b){
        Object.keys(b).forEach(function(key){
            a[key] = b[key];
        });
        return a;
    }
}).call(this);
