//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new TargetHitCanvas($content.find(".explanation")[0], checkioInput[0], checkioInput[1]);
            canvas.createCanvas();
            canvas.animateCanvas();


            this_e.setAnimationHeight($content.height() + 60);

        });

        function TargetHitCanvas(dom, figure, point)  {
            var format = Raphael.format;

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

            var maxN = Math.max(point[0], point[1]);
            for (var i = 0; i < figure.length; i++) {
                maxN = Math.max(figure[i][0], figure[i][1], maxN);
            }

            console.log(maxN);


            var cell = 300 / (maxN + 2);
            var kh = 5;
            var delay = 300;

            var fullSize = cell * (maxN + 2);

            var paper = Raphael(dom, fullSize, fullSize, 0, 0);

            var attrAxis = {"stroke": colorBlue4, "stroke-width": 3, "arrow-end": "classic-wide-long", "stroke-linecap": "square"};
            var attrLine = {"stroke": colorBlue4, "stroke-width": 2, "stroke-linecap": "square"};
            var attrHit = {"stroke": colorOrange4, "stroke-width": 3, "stroke-linecap": "square"};
            var attrInnerAxis = {"stroke": colorBlue1, "stroke-width": 1, "stroke-dasharray": "-", "stroke-linecap": "square"};
            var attrVert = {"stroke": colorBlue4, "fill": colorBlue4};

            this.createCanvas = function() {
                for (var i = 1; i < maxN + 2; i++){
                    paper.path(format("M{0},{1}V{2}",
                        i * cell,
                        fullSize,
                        cell / 2
                    )).attr(attrInnerAxis);
                    paper.path(format("M{0},{1}H{2}",
                        0,
                        fullSize - (cell * i),
                        fullSize - cell / 2
                    )).attr(attrInnerAxis);

                }
                paper.path(format("M0,{0}V0", fullSize)).attr(attrAxis);
                paper.path(format("M0,{0}H{0}", fullSize)).attr(attrAxis);
                for (i = 0; i < figure.length; i++) {
                    var vert = figure[i];
                    paper.circle(
                        cell * vert[0],
                        fullSize - (cell * vert[1]),
                        cell / 5
                    ).attr(attrVert);
                }
                paper.path(format("M{0},{1}L{2},{3}M{0},{3}L{2},{1}",
                    point[0] * cell - kh,
                    fullSize - (point[1] * cell - kh),
                    point[0] * cell + kh,
                    fullSize - (point[1] * cell + kh)

                )).attr(attrHit);
            };

            this.animateCanvas = function() {
                var i = 1;
                var l = figure.length;
                function anim() {
                    var vert;
                    if (i === l) {
                        vert = figure[0];
                    }
                    else if (i > l) {
                        return false;
                    }
                    else {
                        vert = figure[i];
                    }
                    var vert_prev = figure[i-1];
                    i++;
                    var p = paper.path(format("M{0},{1}L{0},{1}",
                        vert_prev[0] * cell,
                        fullSize - (vert_prev[1] * cell)
                    )).attr(attrLine);
                    p.animate({"path": format("M{0},{1}L{2},{3}",
                        vert_prev[0] * cell,
                        fullSize - (vert_prev[1] * cell),
                        vert[0] * cell,
                        fullSize - (vert[1] * cell)

                    )}, delay, callback=anim);
                }
                anim();
            }


        }
        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
