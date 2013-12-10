$(document).ready(function(){
    var quest = [
        {
            _id: "aliens",
            complete: false,
            conversations: "Welcome to Disgusting Aliens planet! Locals are really disgusting, I heard they like cats... as main dish."},
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
    }
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
    //-------------------------------------------------------------------------
   /* function awesomeSky(){
        var start = null;
        function step(timestamp){
            var progress;
            var spritelength = 600;
            var spritenum = 4;
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
    } */
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
            debugger;
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
    function play(){
        $(this).text("Let's go!");
        $(".herosays").find("span").text("We've got a quest to deliver pure pink cosmethamphetamine to Doge planetary system." +
            " But after accident with an unexpected asteroid, we've lost the exact coordinates. " +
            "We'll have to land on each of the five planets to find our buyer. Are you ready?");
        $(this).one("click", toSpace);
    }
    function toSpace(){$(this).text("Land on");
        $(".herosays").find("span").text("Fly to one of these planets, land on and explore.");
        addclass($("div.toppanel"), "space");
        removeclass($(".sky"), "sky");
        addclass($("div.toppanel").find("li"), "showed");
    }
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
                        {planetY: parseInt($(this).css("top"), 10)}];
                }
            }
        }
        flyingToPlanet(coord);
        $(objectDom.bottompanel).find("li").eq(0).click(landOn);
    }
    function landOn(){
        $(this).removeClass("showed");
        $(objectDom.bottompanel).find("li").eq(1).addClass("showed");
        $(objectDom.bottompanel).find("li").eq(2).addClass("showed");
        $(objectDom.toppanel).removeClass("space").addClass(quest[index]._id).find("li").removeClass("showed");
        $("div.hero").addClass("showed");
        $(".herosays").find("span").text(quest[index].conversations);
        addclass($("div.enemy"), quest[index]._id + "char");
    }
    function backToShip(){
        addclass($(objectDom.bottompanel).find("li").eq(0), "showed");
        removeclass($(objectDom.bottompanel).find("li").eq(1), "showed");
        removeclass($(objectDom.bottompanel).find("li").eq(2), "showed");
        addclass($(objectDom.toppanel), "space");
        removeclass($(objectDom.toppanel), "aliens weird butt fairy man");
        removeclass($("div.hero"), "showed");
        removeclass($("div.enemy"), "alienschar weirdchar buttchar fairychar manchar ");
        addclass($(objectDom.toppanel).find("li"), "showed");
        $(".herosays").find("span").text(quest[5].conversations);
    }
    function addclass(element, classname){
       $(element).addClass(classname);
    }
    function removeclass(element, classname){
        $(element).removeClass(classname);
    }
    addclass($(objectDom.bottompanel).find("div"), "showed");
    addclass($(objectDom.bottompanel).find("div").eq(1), "herosays");
    addclass($(objectDom.bottompanel).find("li").eq(0), "showed");
    addclass($(objectDom.toppanel).children("div").eq(0), "sky");
    //awesomeSky();
    $(objectDom.bottompanel).find("li").eq(0).text("Play").one("click", play);
    $(objectDom.toppanel).find("li.planets").click(goToPlanet);
    //$(objectDom.bottompanel).find("li").eq(0).click(landOn);
    $(objectDom.bottompanel).find("li").eq(2).click(backToShip);
});
