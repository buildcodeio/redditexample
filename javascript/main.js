
var DOMHandler = (function() {

    var containerEl = document.querySelector('.js-results');
    function _generateResultCard( data ) {
        var card = document.createElement('div');
        card.className = "ui card";

        var content = document.createElement('div');
        content.className = "content";

        var header = document.createElement('div');
        header.className = "header";
        header.innerHTML = data.title;

        var meta = document.createElement('div');
        meta.className = "meta";
        meta.innerHTML = data.subreddit;

        var desc = document.createElement('div');
        desc.className = "description";

        var anch = document.createElement('a');
        anch.setAttribute('href', 'http://www.reddit.com'+data.permalink);
        anch.setAttribute('target', '_blank');
        anch.innerHTML = "Open in Reddit";

        desc.appendChild( anch );


        content.appendChild(header);
        content.appendChild(meta);
        content.appendChild(desc);

        card.appendChild( content );

        return card;
    }

    function _showJSONResp( data ) {
        var results = JSON.parse( data.currentTarget.response );

        console.log( results );
        containerEl.innerHTML = '';

        results.data.children.forEach(function(item) {
            containerEl.appendChild( _generateResultCard(item.data) );
        });
    }

    return {
        display: _showJSONResp
    }
})();

var RedditAPI = (function() {

    var API_BASE = 'https://api.reddit.com/';

    function _makeSearchQuery( whatToSearchFor ) {
        var url = API_BASE + 'search?q=' + whatToSearchFor;

        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', DOMHandler.display);
        xhr.open( 'GET', url );
        xhr.send();
    }

    return {
        search: _makeSearchQuery
    }
})();

var SearchInput = (function() {

    var searchEl = document.querySelector('.js-search');
    searchEl.addEventListener('keypress', _onKeyPressed);

    function _onKeyPressed( e ) {
        if ( e.which === 13 ) {
            RedditAPI.search( e.target.value );
        }
    }

})();
