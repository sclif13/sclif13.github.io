(function () {
    var strGET = window.location.search.replace('?', '');
    strGET = strGET.split('&');
    var params = {};
    if (Array.isArray(strGET) && strGET.length > 0) {
        for (var i = 0; i < strGET.length; i++) {
            var p = strGET[i].split('=');
            params[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        }
    }
    if (params.p) {
        console.log(params.p);
        switch (params.p) {
            case "11":
                window.location.replace("/post/2012-04-02-%D0%BA%D0%BE%D1%81%D1%82%D1%8B%D0%BB%D1%8C-%E2%84%961-%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4-dbf-%D0%B2-xls/");
                break;
            case "15":
                window.location.replace("/post/2012-04-02-%D0%BA%D0%BE%D1%81%D1%82%D1%8B%D0%BB%D1%8C-%E2%84%961-1-%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4-dbf-%D0%B2-xls-%D0%B2-%D1%84%D0%BE%D0%BD%D0%BE%D0%B2%D0%BE%D0%BC-%D1%80%D0%B5%D0%B6%D0%B8%D0%BC%D0%B5/");
                break;
            case "19":
                window.location.replace("/post/2012-04-02-%D0%BE%D0%BE-%D1%82%D1%80%D1%8E%D0%BA%D0%B8/");
                break;
            case "31":
                window.location.replace("/post/2012-04-02-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%BE-netsshperl-cant-bind-socket-to-port-1023/");
                break;
            case "51":
                window.location.replace("/post/2012-07-14-%D0%BA%D0%BE%D1%81%D1%82%D1%8B%D0%BB%D1%8C-%E2%84%962-google-docs-%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F-%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2/");
                break;
            case "81":
                window.location.replace("/post/2013-03-07-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%BE-ussd-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81-%D0%B2-linux-c-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-huawei-e1550-%D0%BC%D0%B5%D0%B3%D0%B0%D1%84%D0%BE%D0%BD/");
                break;
            case "105":
                window.location.replace("/post/2013-06-24-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8-%D0%BD%D0%B0-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%BC-%D0%BD%D0%B0-perl/");
                break;
            case "122":
                window.location.replace("/post/2013-10-06-wifi-hotspot-%D0%BD%D0%B0-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%B5-netup-utm5-mikrotik/");
                break;
            case "138":
                window.location.replace("/post/2014-06-28-freeswitch-mod_xml_radius-netup-utm5/");
                break;
            case "544":
                window.location.replace("/post/2014-12-23-opensips-netup-utm5/");
                break;
            case "1259":
                window.location.replace("/post/2015-03-12-wireshark-%D0%B2-docker/");
                break;
            case "1264":
                window.location.replace("/post/2015-04-06-python-django-%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D0%B0-%D0%BF%D0%BE%D0%B2%D1%82%D0%BE%D1%80%D1%8F%D1%8E%D1%89%D0%B8%D1%85%D1%81%D1%8F-%D1%81%D0%BB%D1%8D%D1%88%D0%B5%D0%B9-%D0%B2-url/");
                break;
            case "1304":
                window.location.replace("/post/2015-09-13-docker-asterisk-webrtc/");
                break;
            default:
                break;
        }
    }
})();