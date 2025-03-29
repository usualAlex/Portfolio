
// BEST HIDE/SHOW TOGGLE - MULTIPLE ELEMENTS SAME CLASS
function toggle( selector ) {
  var nodes = document.querySelectorAll( selector ),
      node,
      styleProperty = function(a, b) {
        return window.getComputedStyle ? window.getComputedStyle(a).getPropertyValue(b) : a.currentStyle[b];
      };
  
  [].forEach.call(nodes, function( a, b ) {
    node = a;

    node.style.display = styleProperty(node, 'display') === 'block' ? 'none' : 'block';
  });
  
}

document.getElementById('hack').onclick = function(){
  toggle( '.box' );
};




