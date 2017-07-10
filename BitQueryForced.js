(function() {
    var t, o = function(t, o) {
        return function() {
            return t.apply(o, arguments);
        };
    };
    (function() {
        function i() {
            this.updateLayoutSettings = o(this.updateLayoutSettings, this), this.radialTick = o(this.radialTick, this), 
            this.forceTick = o(this.forceTick, this);
            var i;
            i = new t().MARGIN, this.graph = new Graph(i), this.visTransform = new VisTransform(i, this.graph, this.layout_mode), 
            $("#slider_radius").data("ionRangeSlider").update({
                onFinish: function(t) {
                    return function(o) {
                        return t.updateLayoutSettings("radius", o.from);
                    };
                }(this)
            }), $("#slider_orbit_nr").data("ionRangeSlider").update({
                onFinish: function(t) {
                    return function(o) {
                        return t.updateLayoutSettings("orbit_nr", o.from);
                    };
                }(this)
            }), $("#slider_gravity").data("ionRangeSlider").update({
                onFinish: function(t) {
                    return function(o) {
                        return t.updateLayoutSettings("gravity", o.from);
                    };
                }(this)
            });
        }
        i.prototype.graph = null, i.prototype.visTransform = null, i.prototype.layout_mode = "radial", 
        i.prototype.force = null, i.prototype.charge = function(t) {
            return -Math.pow(t.radius, 2) / 2;
        }, i.prototype.network = function(t, o) {
            return this.visTransform.createVis(t, o), this.force = d3.layout.force().size([ this.visTransform.WIDTH, this.visTransform.HEIGHT ]), 
            this.setLayout(this.layout_mode), this.update();
        }, i.prototype.update = function() {
            var t;
            return this.visTransform.filterGraph(this.layout_mode), d3.selectAll(".lg_software").on("click.customize", function(t) {
                return function(o, i) {
                    return t.visTransform.switch_filter(i, "software"), t.graph.updateColors(), t.force.stop(), 
                    t.update();
                };
            }(this)), d3.selectAll(".lg_license").on("click.customize", function(t) {
                return function(o, i) {
                    return t.visTransform.switch_filter(i, "license"), t.graph.updateColors(), t.force.stop(), 
                    t.update();
                };
            }(this)), d3.selectAll(".lg_tviews").on("click.customize", function(t) {
                return function(o, i) {
                    return t.visTransform.switch_filter(i, "tviews"), t.graph.updateColors(), t.force.stop(), 
                    t.update();
                };
            }(this)), this.force.nodes(this.visTransform.curNodesData), this.graph.updateNodes(this.force), 
            "force" === this.layout_mode ? (this.force.links(this.visTransform.curLinksData), 
            this.graph.updateLinks()) : (this.force.links([]), this.graph.removeLinks()), t = $("#search").val(), 
            this.graph.updateSearch(t), this.force.start();
        }, i.prototype.setLayout = function(t) {
            switch (this.layout_mode = t, this.layout_mode) {
              case "radial":
                return this.force.on("tick", this.radialTick).charge(this.charge);

              case "force":
                return this.force.on("tick", this.forceTick).charge(this.visTransform.GRAVITY).linkDistance(50);
            }
        }, i.prototype.forceTick = function(t) {
            return this.graph.updatePositions();
        }, i.prototype.radialTick = function(t) {
            if (d3.select("#nodes").selectAll("circle.node").each(this.visTransform.moveToRadialLayout(t.alpha)), 
            this.graph.updatePositions(), t.alpha < .02) return this.force.stop(), this.graph.updateLinks();
        }, i.prototype.updateData = function(t) {
            return this.force.stop(), this.visTransform.setupData(t), this.setLayout(this.layout_mode), 
            this.update();
        }, i.prototype.updateLayout = function(t, o) {
            return this.activate_div_layout(t, o), this.force.stop(), this.setLayout(o), this.update();
        }, i.prototype.updateSticky = function(t, o) {
            return this.activate_div_layout(t, o), this.force.stop(), this.graph.sticky_mode = o, 
            this.update();
        }, i.prototype.updateSort = function(t, o) {
            return this.activate_div_layout(t, o), this.force.stop(), this.visTransform.sort_mode = o, 
            this.update();
        }, i.prototype.updatePalette = function(t) {
            return this.force.stop(), this.graph.updatePalette(t), this.update();
        }, i.prototype.updateClustering = function(t) {
            return this.force.stop(), this.graph.updateClustering(t), this.update();
        }, i.prototype.updateLayoutSettings = function(t, o) {
            switch (t.toString()) {
              case "radius":
                this.visTransform.RADIUS = parseInt(o);
                break;

              case "orbit_nr":
                this.visTransform.ORBIT_NR = parseInt(o);
                break;

              case "gravity":
                this.visTransform.GRAVITY = parseInt(o), this.force.charge(this.visTransform.GRAVITY);
            }
            return this.update();
        }, i.prototype.updateSearch = function(t) {
            return this.graph.updateSearch(t);
        }, i.prototype.updateSearchMode = function(t) {
            return this.graph.updateSearchMode(t);
        }, i.prototype.activate_div_layout = function(t, o) {
            return d3.selectAll("#" + t + " a").classed("active", !1), d3.select("#" + t + " #" + o).classed("active", !0);
        };
    })(), t = function() {
        function t() {
            var t, o;
            switch (o = window.screen.width, t = window.screen.height, !1) {
              case !(o >= 1920 && t >= 1080):
                this.num = 0, this.MARGIN = this.MARGIN_SET[0];
                break;

              case !(1680 <= o && 1050 <= t && t < 1080 || 1680 <= o && o < 1920 && 1050 <= t):
                this.num = 1, this.MARGIN = this.MARGIN_SET[1];
                break;

              case !(1440 <= o && 900 <= t && t < 1050 || 1440 <= o && o < 1680 && 900 <= t):
                this.num = 2, this.MARGIN = this.MARGIN_SET[2];
                break;

              case !(1366 <= o && 768 <= t && t < 900 || 1366 <= o && o < 1440 && 768 <= t):
                this.num = 3, this.MARGIN = this.MARGIN_SET[3];
                break;

              case !(o < 1366 || t < 768):
                this.num = 4, this.MARGIN = this.MARGIN_SET[4];
            }
            this.MARGIN.SEARCH_TOOLTIP.width = 280, this.MARGIN.TOOLTIP.width = 250, this.contidW = $("#container_main").width(), 
            this.leg_zoom = this.MARGIN.LEGEND.zoom, this.search_tool_zoom = this.MARGIN.SEARCH_TOOLTIP.zoom, 
            this.get_margin_control_legend(), this.get_margin_cluster_legend(), this.get_margin_software_legend(), 
            this.get_margin_license_legend(), this.get_margin_tviews_legend(), this.get_margin_layout_legend(), 
            this.get_margin_tooltip_search(), this.MARGIN;
        }
        return t.prototype.MARGIN_SET = {
            0: {
                VIS: {
                    top: 0,
                    left: 350,
                    scale: .75
                },
                LEGEND: {
                    max_height: 289,
                    zoom: 1
                },
                TOOLTIP: {
                    zoom: 1
                },
                SEARCH_TOOLTIP: {
                    top: 343,
                    max_height: 508,
                    zoom: 1
                }
            },
            1: {
                VIS: {
                    top: 0,
                    left: 370,
                    scale: .7
                },
                LEGEND: {
                    max_height: 253,
                    zoom: 1
                },
                TOOLTIP: {
                    zoom: 1
                },
                SEARCH_TOOLTIP: {
                    top: 292,
                    max_height: 378,
                    zoom: 1
                }
            },
            2: {
                VIS: {
                    top: -20,
                    left: 440,
                    scale: .55
                },
                LEGEND: {
                    max_height: 176,
                    zoom: .75
                },
                TOOLTIP: {
                    zoom: .8
                },
                SEARCH_TOOLTIP: {
                    top: 264,
                    max_height: 344,
                    zoom: .75
                }
            },
            3: {
                VIS: {
                    top: 0,
                    left: 400,
                    scale: .48
                },
                LEGEND: {
                    max_height: 149,
                    zoom: .75
                },
                TOOLTIP: {
                    zoom: .6
                },
                SEARCH_TOOLTIP: {
                    top: 264,
                    max_height: 310,
                    zoom: .75
                }
            },
            4: {
                VIS: {
                    top: 0,
                    left: 400,
                    scale: .45
                },
                LEGEND: {
                    max_height: 139,
                    zoom: .7
                },
                TOOLTIP: {
                    zoom: .6
                },
                SEARCH_TOOLTIP: {
                    top: 246,
                    max_height: 310,
                    zoom: .7
                }
            }
        }, t.prototype.MARGIN = null, t.prototype.get_margin_tooltip_search = function() {
            var t, o;
            switch (t = 0, o = 240 / this.search_tool_zoom, $.browser.mozilla && (this.MARGIN.SEARCH_TOOLTIP.zoom = 1, 
            t = 0, o = 240), this.num) {
              case 1:
                t = -90;
                break;

              case 0:
                t = -110;
            }
            return this.MARGIN.SEARCH_TOOLTIP.left = t, this.MARGIN.SEARCH_TOOLTIP.top = o;
        }, t.prototype.get_margin_control_legend = function() {
            var t;
            return t = {
                top: 48 / this.leg_zoom,
                width: 140,
                zoom: this.leg_zoom
            }, t.left = (this.contidW - 24 - 280) / this.leg_zoom - t.width, $.browser.mozilla && (this.MARGIN.LEGEND.zoom = 1, 
            t.left = 0, t.top = 230), 0 === this.num && (t.top = 48, t.left = (this.contidW - 24 - 170) / this.leg_zoom - t.width), 
            1 === this.num && (t.top = 48, t.left = (this.contidW - 24 - 250) / this.leg_zoom - t.width), 
            this.MARGIN.control_legend = t;
        }, t.prototype.get_margin_cluster_legend = function() {
            var t;
            return t = {
                top: 310,
                width: 335,
                zoom: this.leg_zoom
            }, t.left = (this.contidW - 24) / this.leg_zoom - t.width, $.browser.mozilla && (this.MARGIN.LEGEND.zoom = 1, 
            this.MARGIN.LEGEND.max_height = 164, t.left = this.contidW - 24 - t.width, t.top = 240), 
            1 === this.num && (t.top = 280, t.left = (this.contidW + 90) / this.leg_zoom - t.width), 
            0 === this.num && (t.top = 290, t.left = (this.contidW + 180) / this.leg_zoom - t.width), 
            this.MARGIN.cluster_legend = t;
        }, t.prototype.get_margin_software_legend = function() {
            var t;
            return t = {
                top: 48 / this.leg_zoom,
                width: 335,
                zoom: this.leg_zoom
            }, t.left = (this.contidW - 24) / this.leg_zoom - t.width, $.browser.mozilla && (this.MARGIN.LEGEND.zoom = 1, 
            t.left = this.contidW - 24 - t.width, t.top = 38), 1 === this.num && (t.top = 48, 
            t.left = (this.contidW + 90) / this.leg_zoom - t.width), 0 === this.num && (t.top = 48, 
            t.left = (this.contidW + 180) / this.leg_zoom - t.width), this.MARGIN.software_legend = t;
        }, t.prototype.get_margin_license_legend = function() {
            var t;
            return t = {
                top: 48 / this.leg_zoom,
                width: 335,
                zoom: this.leg_zoom
            }, t.left = (this.contidW - 24) / this.leg_zoom - t.width, $.browser.mozilla && (this.MARGIN.LEGEND.zoom = 1, 
            t.left = this.contidW - 24 - t.width, t.top = 38), 1 === this.num && (t.top = 48, 
            t.left = (this.contidW + 90) / this.leg_zoom - t.width), 0 === this.num && (t.top = 48, 
            t.left = (this.contidW + 180) / this.leg_zoom - t.width), this.MARGIN.license_legend = t;
        }, t.prototype.get_margin_tviews_legend = function() {
            var t;
            switch (t = {
                left: 0,
                top: 308 / this.leg_zoom,
                zoom: this.leg_zoom
            }, this.num) {
              case 4:
                t.top = 270 / this.leg_zoom;
                break;

              case 3:
                t.top = 280 / this.leg_zoom;
                break;

              case 1:
                t.left = -90, t.top = 380;
                break;

              case 0:
                t.left = -110, t.top = 440;
            }
            return this.MARGIN.tviews_legend = t;
        }, t.prototype.get_margin_layout_legend = function() {
            var t;
            switch (t = {
                top: 500 / this.leg_zoom,
                width: 370,
                zoom: this.leg_zoom
            }, t.left = (this.contidW - 24) / this.leg_zoom - t.width, this.num) {
              case 3:
                t.top = 450 / this.leg_zoom;
                break;

              case 4:
                t.top = 420 / this.leg_zoom;
                break;

              case 1:
                t.top = 640, t.left = (this.contidW + 90) / this.leg_zoom - t.width;
                break;

              case 0:
                t.top = 700, t.left = (this.contidW + 180) / this.leg_zoom - t.width;
            }
            return $.browser.mozilla && (t.top = 500, t.left = this.contidW - 24 - t.width), 
            this.MARGIN.layout_legend = t;
        }, t;
    }();
}).call(this);