import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, indexFinder, Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries, AccumulationAnnotation } from '@syncfusion/ej2-react-charts';
const SAMPLE_CSS = `
    #category:hover {
        cursor: pointer;
    }`;
let isparent = true;
const DrilldownChart = () => {
    const [titleContent, setTitleContent] = useState('Automobile Sales by Category');
    const [textContent, setTextContent] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isEnableSmartLabels, setIsEnableSmartLables] = useState(false);
    const [visibility, setVisibility] = useState('hidden');
    let data = [
        { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
        { x: 'Minivan', y: 23 }
    ];
    let suvs = [
        { x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
        { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }
    ];
    let cars = [
        { x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 }, { x: 'Tata', y: 10 },
        { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }
    ];
    let pickups = [
        { x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
        { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }
    ];
    let minivans = [
        { x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 }, { x: 'Jaguar', y: 9 },
        { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }
    ];
    let dataLabel = {
        visible: true, position: 'Inside', enableRotation: false, connectorStyle: { type: 'Curve', length: '5%' }, font: { fontWeight: '600', color: 'white' }
    };
    let title = 'Automobile Sales by Category';
    let pie = useRef(null);
    const onTextRender = (args) => {
        args.text = args.point.x + ' ' + args.point.y + '%';
    };
    const onChartMouseClick = (args) => {
        let index = indexFinder(args.target);
        if (isparent && document.getElementById('pie-chart_Series_' + index.series + '_Point_' + index.point)) {
            isparent = false;
            switch (index.point) {
                case 0:
                    pie.current.series[0].dataSource = suvs;
                    setTitleContent('Automobile Sales in the SUV Segment');
                    setTextContent('SUV');
                    break;
                case 1:
                    pie.current.series[0].dataSource = cars;
                    setTitleContent('Automobile Sales in the Car Segment');
                    setTextContent('Car');
                    break;
                case 2:
                    pie.current.series[0].dataSource = pickups;
                    setTitleContent('Automobile Sales in the Pickup Segment');
                    setTextContent('Pickup');
                    break;
                case 3:
                    pie.current.series[0].dataSource = minivans;
                    setTitleContent('Automobile Sales in the Minivan Segment');
                    setTextContent('Minivan');
                    break;
            }
            if (pie.current.theme === 'HighContrast' || pie.current.theme.indexOf('Dark') > -1) {
                pie.current.annotations = [{
                        content: '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>', region: 'Series', x: '50%', y: '50%'
                    }];
            }
            else {
                pie.current.annotations = [{
                        content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' + '<img src="./src/chart/images/back.png" id="imgback" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
                    }];
            }
            pie.current.series[0].innerRadius = '30%';
            pie.current.series[0].radius = Browser.isDevice ? '90%' : '80%';
            pie.current.series[0].explode = false;
            pie.current.series[0].animation.enable = false;
            pie.current.series[0].dataLabel.connectorStyle.length = '20px';
            pie.current.series[0].dataLabel.position = Browser.isDevice ? 'Inside' : 'Outside';
            pie.current.series[0].dataLabel.enableRotation = true;
            pie.current.series[0].dataLabel.font.color = '';
            setIsVisible(false);
            pie.current.visibleSeries[0].explodeIndex = null;
            setIsEnableSmartLables(true);
            pie.current.refresh();
            setVisibility('visible');
        }
        if (args.target.indexOf('back') > -1) {
            hide(document.getElementById(args.target));
        }
    };
    const onClick = (e) => {
        hide(e.target);
    };
    const hide = (target) => {
        pie.current.series[0].dataSource = data;
        pie.current.series[0].innerRadius = '0%';
        pie.current.series[0].animation.enable = false;
        isparent = true;
        pie.current.series[0].explode = false;
        pie.current.annotations = [];
        pie.current.annotationModule['annotations'] = [];
        pie.current.series[0].dataLabel = dataLabel;
        setTitleContent(title);
        setIsVisible(false);
        setIsEnableSmartLables(true);
        pie.current.refresh();
        target.style.visibility = 'hidden';
        setVisibility('hidden');
    };
    const onChartLoad = (args) => {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = null;
        selectedTheme = selectedTheme ? selectedTheme : 'Material3';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        if (selectedTheme === 'highcontrast' || selectedTheme.indexOf('dark') > -1) {
            args.accumulation.series[0].dataLabel.font.color = "white";
            if (args.accumulation.annotations[0] && !isparent) {
                args.accumulation.annotations[0].content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>';
            }
        }
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div id="link">
                    <a id="category" onClick={onClick.bind(this)} style={{ visibility: visibility, display: 'inline-block' }}>Sales by Category</a>
                    <p style={{ visibility: visibility, display: 'inline-block' }} id="symbol">&nbsp;&gt;&gt;&nbsp;</p>
                    <p id="text" style={{ visibility: visibility, display: 'inline-block' }}>{textContent}</p>
                </div>
                <AccumulationChartComponent id='pie-chart' ref={pie} title={titleContent} enableSmartLabels={isEnableSmartLabels} legendSettings={{ visible: isVisible }} enableBorderOnMouseMove={false} tooltip={{ enable: false, format: '${point.x} <br> ${point.y} %' }} chartMouseClick={onChartMouseClick.bind(this)} textRender={onTextRender.bind(this)} load={load.bind(this)} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AccumulationDataLabel, AccumulationTooltip, PieSeries, AccumulationAnnotation]}/>
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={data} xName='x' yName='y' dataLabel={dataLabel} radius='70%' explode={false}/>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
        </div>);
};
export default DrilldownChart;