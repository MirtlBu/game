$(document).ready(function(){
    var quest = [
        {
            _id: "aliens",
            complete: false,
            conversations: "Welcome to Disgusting Aliens planet! Locals are really disgusting, I heard they like cats... as a main dish."},
        {
            _id: "weird",
            complete: false,
            conversations: "This is Something Weird planet. I feel something weird..."},
        {
            _id: "butt",
            complete: false,
            conversations: "Buttwings planet. Sounds dangerous."},
        {
            _id: "fairy",
            complete: false,
            conversations: "Awwwww, Fairy people planet! They are so cute, look at them!"},
        {
            _id: "man",
            complete: false,
            conversations: "Yummy! I think Cookie Man lives on this planet."},
        {
            _id:"default",
            conversations: "Come on, we should do this quest! Choose the planet and let's go!"
        }
    ];
    var objectDom = {
        toppanel: ".toppanel",
        bottompanel: ".bottompanel"
    };
    var index;//not cool
    var yourhealth = 100;
    var enemyhealth = Math.floor((Math.random()*100)+50);
    function fightmode(){
        var yourhit = Math.floor((Math.random()*10)+5);
        var enemyhit = Math.floor((Math.random()*10)+5);
        yourhealth =  healthcalculator(enemyhit, yourhealth);
        enemyhealth = healthcalculator(yourhit, enemyhealth);
        if(yourhealth <= 5){
            return "You are lose!";
        }
        else if(enemyhealth <= 0){
            return "You are win!";
        }
        else{
            return fightmode();
        }
    }
    function healthcalculator(hit, health){
        return health - hit;
    }
    //-----------------------------Amimation--------------------------------------------
    function awesomeSky(){
        var start = null;
        function step(timestamp){
            var progress;
            var spritelength = 600;
            var spritenum = 6;
            var currentposition;
            var frame;
            var x_axis;
            if(start === null){
                start = timestamp;
            }
            progress = timestamp - start;
            currentposition = progress % (spritelength*spritenum);
            frame = Math.floor(currentposition/spritelength);
            x_axis = frame*spritelength + "px";
            $("div.sky").css("background-position", "-" + x_axis);
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    function flyingToPlanet(coord){
        var start = null;
        var animationTime = 2000;
        function helper(duration, min, max, direction){
            if(min > max){
                var temp = min;
                min = max;
                max = temp;
            }
            var dist = max - min;
            var point = dist*duration/animationTime;
            if(direction){
                return Math.min(min + point, max);
            }
            else{
                return Math.max(min, max - point);
            }
        }
        function step(timepenis){
            var duration;
            var x_axis;
            var y_axis;
            if(start === null){
                start = timepenis;
            }
            duration = timepenis - start;
            if(coord[0].shipX < coord[2].planetX){
                x_axis = helper(duration, coord[0].shipX, coord[2].planetX, true);
            }
            else{
                x_axis = helper(duration, coord[0].shipX, coord[2].planetX, false);
            }
            if(coord[1].shipY < coord[3].planetY){
                y_axis = helper(duration,coord[1].shipY, coord[3].planetY, true);
            }
            else{
                y_axis = helper(duration,coord[1].shipY, coord[3].planetY, false);
            }
            $("#spaceship").css({left: x_axis + "px", top: y_axis + "px"});
            if(duration < animationTime){
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
    //----------------------------------------------------------------------------------------
    function goToPlanet(){
        var _id  = $(this).attr("data-planet");
        var coord = [];
        for(var i = 0; i < quest.length; i++){
            if(quest[i]._id === _id){
                if(quest[i].complete == true){
                    return "We've been here, only monsters and nothing more."
                }
                else{
                    index = i;
                    coord = [
                        {shipX: parseInt($("#spaceship").css("left"),10)},
                        {shipY: parseInt($("#spaceship").css("top"),10)},
                        {planetX: parseInt($(this).css("left"), 10)},
                        {planetY: parseInt($(this).css("top"), 10) + 30}];
                }
            }
        }
        flyingToPlanet(coord);
        $(objectDom.bottompanel).find("li").eq(0).addClass("land_on");
    }
    function landOn(that){
        $(that).removeClass("onebutton").addClass("to_attack").text("ATTACK");
        $(that).next("li").addClass("to_ship").text("BACK TO THE SHIP");
        $(objectDom.toppanel).removeClass("space").addClass(quest[index]._id).find("li").addClass("hidden");
        $(objectDom.toppanel).find("div").eq(1).removeClass("hidden");
        $(objectDom.toppanel).find("div").eq(2).removeClass("hidden").addClass(quest[index]._id + "char");
        $(objectDom.bottompanel).find("span").text(quest[index].conversations);
    }
    function backToShip(that){
        $(that).text("BACK TO THE DECK").addClass("to_deck");
        $(that).prev("li").text("LAND ON!").addClass("land_on");
        $(objectDom.toppanel).removeClass("aliens weird butt fairy man").addClass("space");
        addclass($(objectDom.toppanel).find("div").eq(1), "hidden");
        $(objectDom.toppanel).find("div").eq(2).addClass("hidden").removeClass("alienschar weirdchar buttchar fairychar manchar");
        removeclass($(objectDom.toppanel).find("li"), "hidden");
        $(objectDom.bottompanel).find("span").text(quest[5].conversations);
    }
    function onLoad(){
        addclass($(objectDom.toppanel).find("div"), "hidden");
        addclass($(objectDom.bottompanel).find("div"), "hidden");
        removeclass($(objectDom.bottompanel).find("div").eq(2), "hidden");
        addclass($(objectDom.bottompanel).find("li").eq(1), "hidden");
        addclass($(objectDom.toppanel), "poster");
        $(objectDom.bottompanel).find("li").eq(0).addClass("to_deck").text("PLAY").css({left: -440, top: 60});
    }
    function backToDeck(that){
        that = $(objectDom.bottompanel).find("li").eq(0);
        $(that).removeAttr("style").removeClass("land_on back_to_space").addClass("onebutton next_talk").text("NEXT");
        addclass($(that).next("li"), "hidden");
        $(objectDom.toppanel).removeClass("poster space").addClass("deck");
        $(objectDom.toppanel).find("div").eq(0).removeClass("hidden").addClass("sky");
        addclass($(objectDom.toppanel).find("li"), "hidden");
        awesomeSky();
        removeclass($(objectDom.bottompanel).find("div"), "hidden");
        $(objectDom.bottompanel).find("div").eq(0).addClass("capitansays").removeClass("catsays");
        $(objectDom.bottompanel).find("div").eq(1).addClass("herosays").find("span").text("We've got a quest to deliver pure pink cosmethamphetamine to Doge planetary system." +
            " But after accident with an unexpected asteroid, we've lost the exact coordinates. " +
            "You'll fly on each of the five planets and find our buyer. Ok?");
    }
    function nextTalk(that){
        $(objectDom.bottompanel).find("div").eq(0).removeClass("capitansays").addClass("catsays");
        $(objectDom.bottompanel).find("span").text("It's dangerous to go alone. I'll take my gun. I'm ready.");
        $(that).text("LET'S GO!").addClass("back_to_space");
    }
    function toSpace(that){
        $(that).removeClass("onebutton").text("LAND ON!").addClass("land_on");
        $(that).next("li").removeClass("hidden").addClass("to_deck").text("BACK TO THE DECK");
        $(objectDom.bottompanel).find("span").text("I think I must fly to one of these planets, land on and explore it.");
        $(objectDom.toppanel).removeClass("deck").addClass("space");
        removeclass($(objectDom.toppanel).find("div").eq(0), "sky");
        removeclass($(objectDom.toppanel).find("li"), "hidden");
        $(objectDom.toppanel).find("li").click(goToPlanet);
    }
    function checkThisButton(){
        if($(this).hasClass("to_ship")){
            removeclass($(this), "to_ship");
            backToShip(this);
        }
        else if($(this).hasClass("to_deck")){
            removeclass($(this), "to_deck");
            backToDeck(this);
        }
        else if($(this).hasClass("back_to_space")){
            removeclass($(this), "back_to_space");
            toSpace(this);
        }
        else if($(this).hasClass("next_talk")){
            removeclass($(this), "next_talk");
            nextTalk(this);
        }
        else if($(this).hasClass("land_on")){
            removeclass($(this), "land_on");
            landOn(this);
        }
    }
    function addclass(element, classname){
        $(element).addClass(classname);
    }
    function removeclass(element, classname){
        $(element).removeClass(classname);
    }
    onLoad();
    $(objectDom.bottompanel).find("li").click(checkThisButton);
});
