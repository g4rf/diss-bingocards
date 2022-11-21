var Diss = {
    generate: function() {
        let headline = $("input.headline").val();
        let subline = $("input.subline").val();
        let description = $("textarea.description").val().replace("\n", "<br />");
        let tiles = $("textarea.tiles").val().split("\n");
        let quantity = $("input.quantity").val();
                
        $("card").not(".template").remove();
        
        for(let i = 0; i < quantity; i++) {
            let card = $("card.template").clone().removeClass("hidden template")
                    .appendTo("cards");
            
            if(i % 2) {
                card.css("page-break-after", "always");
            }
            
            $("headline", card).append(headline);
            $("subline", card).append(subline);
            $("description", card).append(description);
            
            let random = Diss.randomArrayElements(tiles, 16);
            jQuery.each(random, function(index, value) {
                let tile = $("<tile>");
                tile.append(value);
                $("tiles", card).append(tile);
            });
        }
    },
    
    /**
     * Returns an array with random elements from arr.
     * @param {Array} arr
     * @param {Number} n
     * @returns {Array}
     */
    randomArrayElements: function(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len) return arr;
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
};

// event bindings
$("button.generate").on("click", Diss.generate);
$("button.print").on("click", function() {
    window.print();
});

// start
Diss.generate();