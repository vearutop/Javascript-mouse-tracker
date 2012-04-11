MouseObserverTest = TestCase("MouseObserverTest");

MouseObserverTest.prototype.setUp = function() {
    /*:DOC +=
     <div id="mouse-show-holder">
     <p>X: <span id="x-holder"></span></p>
     <p>Y: <span id="y-holder"></span></p>
     <p>Time passed (ms): <span id="ms-holder"></span></p>
     </div>
     */

    /* creating mouse move publisher */
    this.publisher = MousePublisher({debug:true})
        /* adding realtime coordinates demo */
        .addSubscriber(MouseShowSubscriber({
        xHolder:'#x-holder',
        yHolder:'#y-holder',
        msHolder:'#ms-holder'
    }));
};

MouseObserverTest.prototype.tearDown = function(){
    $('#mouse-show-holder').remove();
    this.publisher.stopListening();
};


MouseObserverTest.prototype.testPublisher = function() {
    this.publisher.setEvent({pageX: 100, pageY: 200});
    assertEquals('mouse x', $('#x-holder').html(), 100);
    assertEquals('mouse y', $('#y-holder').html(), 200);
};



