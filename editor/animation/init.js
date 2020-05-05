//Dont change it

requirejs(['ext_editor_io', 'jquery_190', 'raphael_210', 'snap.svg_030'],
    function (extIO, $, Raphael, Snap) {
        function SVG(dom) {
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var pad = 10;



            var unit = 35;
            var size = unit * 10 + 2 * pad;

            var R = unit / 6;

            var paper = Raphael(dom, size, size);

            var aAxis = {"stroke": colorBlue4, "stroke-width": 2, "arrow-end": "classic"};
            var aLine = {"stroke": colorBlue4, "stroke-width": 3, "fill": colorBlue1};
            var aVertex = {"stroke-width": 0, "fill": colorBlue4};
            var aPoint = {"stroke": colorOrange4, "fill": colorOrange1, "stroke-width": 2};


            this.draw = function(polygon, point) {
                paper.path([["M", pad, size - pad], ["V", pad]]).attr(aAxis);
                paper.path([["M", pad, size - pad], ["H", size - pad]]).attr(aAxis);

                var polygonPath = [];
                for (var i = 0; i <= polygon.length; i++) {
                    var j = i % polygon.length;
                    paper.circle(pad + polygon[j][0] * unit,
                        size - pad - polygon[j][1] * unit, R).attr(aVertex);
                    polygonPath.push([
                        "L",
                        pad + polygon[j][0] * unit,
                        size - pad - polygon[j][1] * unit]
                    );
                }
                polygonPath[0][0] = "M";
                polygonPath.push(["Z"]);
                console.log(polygonPath);
                paper.path(polygonPath).attr(aLine).toBack();
                paper.circle(pad + point[0] * unit,
                        size - pad - point[1] * unit, R).attr(aPoint);
            }
        }
        var io = new extIO({
            functions: {
                js: 'isInside',
                python: 'is_inside'
            },
            animationTemplateName: 'animation',
            animation: function($expl, data){
                var checkioInput = data.in;
                if (!checkioInput){
                    return;
                }
                var svg = new SVG($expl[0]);
                svg.draw(checkioInput[0], checkioInput[1]);
            },
        });
        io.start();
    }
);

// requirejs(['ext_editor_1', 'jquery_190', 'raphael_210', 'snap.svg_030'],
//     function (ext, $, Raphael, Snap) {

//         var cur_slide = {};

//         ext.set_start_game(function (this_e) {
//         });

//         ext.set_process_in(function (this_e, data) {
//             cur_slide = {};
//             cur_slide["in"] = data[0];
//             this_e.addAnimationSlide(cur_slide);
//         });

//         ext.set_process_out(function (this_e, data) {
//             cur_slide["out"] = data[0];
//         });

//         ext.set_process_ext(function (this_e, data) {
//             cur_slide.ext = data;
//         });

//         ext.set_process_err(function (this_e, data) {
//             cur_slide['error'] = data[0];
//             this_e.addAnimationSlide(cur_slide);
//             cur_slide = {};
//         });

//         ext.set_animate_success_slide(function (this_e, options) {
//             var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
//             this_e.setAnimationHeight(115);
//         });

//         ext.set_animate_slide(function (this_e, data, options) {
//             var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
//             if (!data) {
//                 console.log("data is undefined");
//                 return false;
//             }

//             //YOUR FUNCTION NAME
//             var fname = 'is_inside';

//             var checkioInput = data.in || [
//                 [
//                     [1, 1],
//                     [1, 3],
//                     [3, 3],
//                     [3, 1]
//                 ],
//                 [2, 2],
//             ];
//             var checkioInputStr = fname + '(' + JSON.stringify(checkioInput).replace(/\[/g, "(").replace(/]/g, ")").replace("(((", "((").replace(")))", "))") + ')';

//             var failError = function (dError) {
//                 $content.find('.call').html(checkioInputStr);
//                 $content.find('.output').html(dError.replace(/\n/g, ","));

//                 $content.find('.output').addClass('error');
//                 $content.find('.call').addClass('error');
//                 $content.find('.answer').remove();
//                 $content.find('.explanation').remove();
//                 this_e.setAnimationHeight($content.height() + 60);
//             };

//             if (data.error) {
//                 failError(data.error);
//                 return false;
//             }

//             if (data.ext && data.ext.inspector_fail) {
//                 failError(data.ext.inspector_result_addon);
//                 return false;
//             }

//             $content.find('.call').html(checkioInputStr);
//             $content.find('.output').html('Working...');

//             var svg = new SVG($content.find(".explanation")[0]);
//             svg.draw(checkioInput[0], checkioInput[1]);


//             if (data.ext) {
//                 var rightResult = data.ext["answer"];
//                 var userResult = data.out;
//                 var result = data.ext["result"];
//                 var result_addon = data.ext["result_addon"];

//                 //if you need additional info from tests (if exists)
//                 var explanation = data.ext["explanation"];
//                 $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));
//                 if (!result) {
//                     $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
//                     $content.find('.answer').addClass('error');
//                     $content.find('.output').addClass('error');
//                     $content.find('.call').addClass('error');
//                 }
//                 else {
//                     $content.find('.answer').remove();
//                 }
//             }
//             else {
//                 $content.find('.answer').remove();
//             }


//             //Your code here about test explanation animation
//             //$content.find(".explanation").html("Something text for example");
//             //
//             //
//             //
//             //
//             //


//             this_e.setAnimationHeight($content.height() + 60);

//         });

//         //This is for Tryit (but not necessary)
// //        var $tryit;
// //        ext.set_console_process_ret(function (this_e, ret) {
// //            $tryit.find(".checkio-result").html("Result<br>" + ret);
// //        });
// //
// //        ext.set_generate_animation_panel(function (this_e) {
// //            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
// //            $tryit.find('.bn-check').click(function (e) {
// //                e.preventDefault();
// //                this_e.sendToConsoleCheckiO("something");
// //            });
// //        });

//         function SVG(dom) {
//             var colorOrange4 = "#F0801A";
//             var colorOrange3 = "#FA8F00";
//             var colorOrange2 = "#FAA600";
//             var colorOrange1 = "#FABA00";

//             var colorBlue4 = "#294270";
//             var colorBlue3 = "#006CA9";
//             var colorBlue2 = "#65A1CF";
//             var colorBlue1 = "#8FC7ED";

//             var colorGrey4 = "#737370";
//             var colorGrey3 = "#9D9E9E";
//             var colorGrey2 = "#C5C6C6";
//             var colorGrey1 = "#EBEDED";

//             var colorWhite = "#FFFFFF";

//             var pad = 10;



//             var unit = 35;
//             var size = unit * 10 + 2 * pad;

//             var R = unit / 6;

//             var paper = Raphael(dom, size, size);

//             var aAxis = {"stroke": colorBlue4, "stroke-width": 2, "arrow-end": "classic"};
//             var aLine = {"stroke": colorBlue4, "stroke-width": 3, "fill": colorBlue1};
//             var aVertex = {"stroke-width": 0, "fill": colorBlue4};
//             var aPoint = {"stroke": colorOrange4, "fill": colorOrange1, "stroke-width": 2};


//             this.draw = function(polygon, point) {
//                 paper.path([["M", pad, size - pad], ["V", pad]]).attr(aAxis);
//                 paper.path([["M", pad, size - pad], ["H", size - pad]]).attr(aAxis);

//                 var polygonPath = [];
//                 for (var i = 0; i <= polygon.length; i++) {
//                     var j = i % polygon.length;
//                     paper.circle(pad + polygon[j][0] * unit,
//                         size - pad - polygon[j][1] * unit, R).attr(aVertex);
//                     polygonPath.push([
//                         "L",
//                         pad + polygon[j][0] * unit,
//                         size - pad - polygon[j][1] * unit]
//                     );
//                 }
//                 polygonPath[0][0] = "M";
//                 polygonPath.push(["Z"]);
//                 console.log(polygonPath);
//                 paper.path(polygonPath).attr(aLine).toBack();
//                 paper.circle(pad + point[0] * unit,
//                         size - pad - point[1] * unit, R).attr(aPoint);
//             }
//         }

//         //Your Additional functions or objects inside scope
//         //
//         //
//         //


//     }
// );
