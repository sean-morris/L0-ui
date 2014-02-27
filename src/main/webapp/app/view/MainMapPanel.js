/**
 * This Map Panel View is a generic interface to handle map based rendering 
 * (ie. map sources, tiles, zoom levels, overlays, markers, etc) 
 *
 */
Ext.define('CC.view.MainMapPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.MainMapPanel',

  requires: [
    'Ext.window.MessageBox',
  ],

  plain: true,
  gmapType: 'map',
  border: false,
  layout: 'absolute',
  height: screen.availHeight,
  width: screen.availWidth,
  id: 'main-panel',

  initComponent: function() {
    var me = this;

    me.callParent(arguments);
  },

  afterFirstLayout: function() {
    var center = this.center;
    this.callParent();

    if (center) {
        if (center.geoCodeAddr) {
            this.lookupCode(center.geoCodeAddr, center.marker);
        } else {
            this.createMap(center);
        }
    } else {
        Ext.Error.raise('center is required');
    }
  },

  createMap: function(center, marker) {
    var options = Ext.apply({}, this.mapOptions);

    options = Ext.applyIf(options, {
        zoom: 14,
        center: center,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.DEFAULT,
          position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    this.gmap = new google.maps.Map(this.body.dom, options);
    if (marker) {
        this.addMarker(Ext.applyIf(marker, {
            position: center
        }));
    }
    //this.addLinkGoogle();
    this.addLinkCustom();
//    this.addNodeD3();
//    this.gmap.setCenter(new google.maps.LatLng(37.6203,-122.07620000000001));
//    Ext.each(this.markers, this.addMarker, this);
    this.fireEvent('mapready', this, this.gmap);
  },
  addLinkCustom: function(){
     var me = this;
     var o = new google.maps.OverlayView();
     var p = o.getProjection();
     var context = {
               map: this.gmap,
               svgPlace : function(over){ return over.getPanes().overlayLayer },
               overlay: o,
               projection: function(over){ return over.getProjection() },
               latLngToPix: function(c, proj){ return proj.fromLatLngToDivPixel(c); },
               latLngObj: function(lat,lng){ return new google.maps.LatLng(lat, lng)} 
             }

      var overlay = new CC.view.MapOverLayView(context);
    
  },
  addLinkGoogle: function(){
      var line2_geoJson = {
        "type": "FeatureCollection",
            "features": [

        {
            "type": "Feature",
                "properties": {
                "Division": "IRT",
                    "Line": "7th Ave-Bway",
                    "route_id": "2"
            },
                "geometry": {
                "type": "LineString",
                    "coordinates": [
                    [-74.010074230999976, 40.714448123932996],
                    [-74.0093, 40.715437000933001],
                    [-74.00927, 40.715478000933011],
                    [-74.00725, 40.718032000933],
                    [-74.00723, 40.718063000932979],
                    [-74.007206, 40.718095000933005],
                    [-74.00719, 40.718127000932995],
                    [-74.00717, 40.718160000933025],
                    [-74.00715, 40.718193000932985],
                    [-74.00713, 40.718228000933017],
                    [-74.00712, 40.718262000932981],
                    [-74.0071, 40.718298000933011],
                    [-74.00709, 40.718334000932977],
                    [-74.00708, 40.718370000932993],
                    [-74.00707, 40.718408000933024],
                    [-74.007055, 40.718446000932985],
                    [-74.00705, 40.718484000932996],
                    [-74.00704, 40.718523000933018],
                    [-74.00703, 40.718563000933024],
                    [-74.00689, 40.719318000932994],
                    [-74.00628, 40.722854000933012],
                    [-74.00537, 40.728251000933057],
                    [-74.00526, 40.728935000933042],
                    [-74.00522, 40.729169000933076],
                    [-74.0052, 40.729283000933066],
                    [-74.00516, 40.729414000933083],
                    [-74.005112, 40.729532000933062],
                    [-74.00506, 40.729642000933083],
                    [-74.00493, 40.729881000933048],
                    [-74.00468, 40.730321000933067],
                    [-74.00291, 40.733422000933096],
                    [-74.00145, 40.7359730009331],
                    [-74.00134, 40.736162000933078],
                    [-74.00123, 40.736358000933087],
                    [-74.00109, 40.73658500093309],
                    [-74.00097, 40.7367610009331],
                    [-74.0002, 40.737826000933083],
                    [-73.99787, 40.741040000933118],
                    [-73.99566, 40.744081000933129],
                    [-73.99336, 40.747215000933124],
                    [-73.99106, 40.750373000933131],
                    [-73.98749, 40.755290000933194],
                    [-73.98601, 40.757342000933193],
                    [-73.98579, 40.757638000933191],
                    [-73.98571, 40.757758000933222],
                    [-73.98564, 40.757880000933206],
                    [-73.98557, 40.758014000933208],
                    [-73.98551, 40.758156000933191],
                    [-73.98542, 40.758375000933199],
                    [-73.98533, 40.758631000933178],
                    [-73.98506, 40.759405000933228],
                    [-73.98496, 40.75971400093318],
                    [-73.984841, 40.760017000933217],
                    [-73.98472, 40.760283000933221],
                    [-73.98458, 40.760592000933187],
                    [-73.98444, 40.760821000933234],
                    [-73.98429, 40.7610400009332],
                    [-73.98385, 40.761728000933225],
                    [-73.98336, 40.762486000933237],
                    [-73.98304, 40.762980000933197],
                    [-73.98279, 40.763412000933236],
                    [-73.98263, 40.76371400093322],
                    [-73.98246, 40.76402900093322],
                    [-73.98232, 40.764386000933229],
                    [-73.98216, 40.76482100093321],
                    [-73.98206, 40.765125000933246],
                    [-73.98198, 40.76546100093325],
                    [-73.98191, 40.765808000933227],
                    [-73.98175, 40.76680800093321],
                    [-73.9817, 40.767172000933257],
                    [-73.981689, 40.767324000933215],
                    [-73.98169, 40.767440000933263],
                    [-73.981697, 40.767561000933249],
                    [-73.98172, 40.76768100093323],
                    [-73.98174, 40.767778000933262],
                    [-73.98178, 40.767895000933251],
                    [-73.981929, 40.768247000933222],
                    [-73.98201, 40.768454000933275],
                    [-73.98205, 40.768582000933222],
                    [-73.98208, 40.768695000933235],
                    [-73.98209, 40.768794000933262],
                    [-73.9821, 40.769222000933269],
                    [-73.98221, 40.77344000093327],
                    [-73.98221, 40.774166000933256],
                    [-73.98209, 40.777496000933283],
                    [-73.98206, 40.777869000933315],
                    [-73.98201, 40.778211000933297],
                    [-73.98197, 40.778453000933304],
                    [-73.98191, 40.778822000933289],
                    [-73.98176, 40.779426000933313],
                    [-73.98131, 40.780996000933321],
                    [-73.98092, 40.782155000933308],
                    [-73.98085, 40.782374000933316],
                    [-73.98075, 40.78262200093333],
                    [-73.98066, 40.782794000933343],
                    [-73.98057, 40.78297000093329],
                    [-73.98047, 40.783149000933307],
                    [-73.98037, 40.783313000933333],
                    [-73.97992, 40.783934000933314],
                    [-73.97766, 40.786953000933316],
                    [-73.977107, 40.787601000933336],
                    [-73.976218, 40.788644000933324],
                    [-73.97594, 40.788957000933323],
                    [-73.972323, 40.793919000933386],
                    [-73.972321096999963, 40.793921822933392]
                ]
            }
        }
      ]}
    var overlay = new google.maps.OverlayView();
    overlay.onAdd = function() {
    
      var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
      var svg = layer.append("svg")
                      .attr({
                            "width": '100%',
                            "height": '100%'
      });
    
      overlay.draw = function() {
        var markerOverlay = this;
        var overlayProjection = markerOverlay.getProjection();
    
        // Turn the overlay projection into a d3 projection
        var googleMapProjection = function(coordinates) {
          var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
          var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
          return [pixelCoordinates.x, pixelCoordinates.y];
        }
    
        path2 = d3.geo.path().projection(googleMapProjection);
    
        svg.selectAll("path")
          .data(line2_geoJson.features)
          .attr("d", path2) // update existing paths
          .attr("stroke", "red")
          .style("fill-opacity", 0)
        .enter().append("svg:path");
      };
    
    };
    
    overlay.setMap(this.gmap);
    // 
    // 
    //       
    // /*
    // var enc = google.maps.geometry.encoding
    // var o =  new google.maps.Polyline({
    //             path: enc.decodePath("{urdFf_bhVyEtCwA~@"),
    //             map: this.gmap,
    //             strokeColor: 'blue',
    //             icons: [{
    //               icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
    //               fillColor: 'blue',
    //               offset: '60%'
    //             }],
    //             strokeOpacity: 0.9,
    //             strokeWeight: 7,
    //           })
    // return o;*/
  },

  addNodeD3: function(){
    var enc = google.maps.geometry.encoding
    var overlay = new google.maps.OverlayView();
    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayLayer).append("div")
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("class", "map-elements")
      overlay.draw = function(){
        var projection = this.getProjection();
        
        var marker = layer.selectAll("svg")
                      .data(enc.decodePath("m_sdF|ebhVaBdAkErC"))
                      .each(transform)
                      .enter().append("svg:svg")
                      .each(transform)
                      .attr("class", "marker")
                      .append("svg:circle")
                      .attr("cx", "10")
                      .attr("cy", "10")
                      .attr("r", "8")
                      .attr("fill", "white")
                      .attr("stroke", "blue")
                      .attr("stroke-width", "3")
                     
        function transform(d){
           d = new google.maps.LatLng(d.lat(), d.lng());
           d = projection.fromLatLngToDivPixel(d);
           return d3.select(this)
            .style("left", d.x + "px")
            .style("top", d.y + "px")
        }
      };
    };
    overlay.setMap(this.gmap);

  },
  addMarker: function(marker) {
    marker = Ext.apply({
        map: this.gmap
    }, marker);

    if (!marker.position) {
        marker.position = new google.maps.LatLng(marker.lat, marker.lng);
    }
    var o =  new google.maps.Marker(marker);
    Ext.Object.each(marker.listeners, function(name, fn){
        google.maps.event.addListener(o, name, fn);
    });
    return o;
  },

  lookupCode: function(addr, marker) {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({
        address: addr
    }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
  },

  onLookUpComplete: function(data, response, marker) {
    if (response != 'OK') {
      Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
      return;
    }
    this.createMap(data[0].geometry.location, marker);
  },

  afterComponentLayout: function(w, h) {
    this.callParent(arguments);
    this.redraw();
  },

  redraw: function() {
    var map = this.gmap;
    if (map) {
      google.maps.event.trigger(map, 'resize');
    }
  }

});