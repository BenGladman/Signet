﻿var towserHubInit = function () {
    var term = towserTermInit();

    var hub = $.connection.towserHub;

    hub.client.write = function (data) {
        term.write(data);
    }

    hub.client.error = function (data) { console.error(data); }
    hub.client.stop = function () { console.info("Stopped"); }
    hub.client.dcs = function (data) { console.error("DCS " + data); }
    hub.client.osc = function (data) { console.info("OSC " + data); }
    hub.client.pm = function (data) { console.info("PM " + data); }
    hub.client.apc = function (data) { console.info("APC " + data); }

    $.connection.hub.start()
        .done(function () {
            hub.server.init();
            console.log('Now connected, connection id=' + $.connection.hub.id);
        })
        .fail(function () {
            console.log('Could not connect!');
        });

    // receive from terminal
    term.oninput = function (data) { hub.server.keyPress(data); }

    // stop terminal
    term.onstop = function () { $.connection.hub.stop(); }
}